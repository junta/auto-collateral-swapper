import { Brevis, ErrCode, ProofRequest, Prover, ReceiptData, Field } from 'brevis-sdk-typescript';
import { ethers } from 'ethers';
import dotenv from 'dotenv';
import brevisRequestABI from '../abi/brevis';
dotenv.config();

async function main() {
    console.log("Initializing Prover and Brevis instances...");
    const prover = new Prover('localhost:33247');
    const brevis = new Brevis('appsdkv3.brevis.network:443');

    const proofReq = new ProofRequest();
    console.log("ProofRequest initialized.");

    const transactionHashes = [
        "0xb1e69ed785cfa1139bb39f92607b0e7ee3a751c422b17f540182efe38af10c70",
        "0xb0dd094fdc2d3607dc00d0e71456e70e60ead8b17506ea53f9da34b10ae73c95",
        "0x6f8c61268313f66560328fb2980e0df6853034c4481eaf6fa37fa196f343e7ce",
        "0xafad81ba55f167fd81d2199a790f5cb7b4b3c658ed852598bb42cb2c0b0d2dae",
        "0x40066ef9820a1f2940e1e0ffa6abed205fbaa48c2eaabdc4ca69b4b8a8c00143",
        "0xd48855dc81f12cfbf36ccb9f076130305a0e38b2af07bba05667e2bf8138dc80",
        "0xc4db76848b5cfd41c4cd5f507eb6122b25e819f62984c8a21f6235f26e4c4fa9",
        "0x54f03d919c9d65308a8cfbeec1e28b28a5c762cb3f1de6c0c61dc1730f42e209"
    ]
    console.log("Transaction hashes:", transactionHashes);

    const brevis_partner_key = process.argv[2] ?? "";
    const callbackAddress = process.env.CALLBACK_ADDRESS ?? "";
    console.log("Brevis partner key:", brevis_partner_key);
    console.log("Callback address:", callbackAddress);

    transactionHashes.forEach((hash, index) => {
        console.log(`Adding receipt for transaction hash ${index + 1}: ${hash}`);
        proofReq.addReceipt(
            new ReceiptData({
                tx_hash: hash,
                fields: [
                    new Field({
                        log_pos: 0,
                        is_topic: false,
                        field_index: 2, // variableBorrowRate
                        // value: ethers.utils.hexlify(ethers.BigNumber.from("36726913224163956241400951").add(index * 1000)),
                    })
                ],
            }),
            index,
        );
    });

    console.log("Send prove request for 8 transaction hashes");

    const proofRes = await prover.prove(proofReq);
    console.log("Proof response received:", proofRes);

    // error handling
    if (proofRes.has_err) {
        const err = proofRes.err;
        console.error('Error occurred:', err);
        switch (err.code) {
            case ErrCode.ERROR_INVALID_INPUT:
                console.error('Invalid receipt/storage/transaction input:', err.msg);
                break;

            case ErrCode.ERROR_INVALID_CUSTOM_INPUT:
                console.error('Invalid custom input:', err.msg);
                break;

            case ErrCode.ERROR_FAILED_TO_PROVE:
                console.error('Failed to prove:', err.msg);
                break;
        }
        return;
    }
    console.log('Proof:', proofRes.proof);

    try {
        console.log("Submitting proof to Brevis...");
        const brevisRes = await brevis.submit(proofReq, proofRes, 1, 11155111, 0, brevis_partner_key, callbackAddress);
        console.log('Brevis response:', brevisRes);
        payFees(brevisRes.fee, brevisRes.queryKey);
        console.log("Waiting for Brevis to process the query...");
        await brevis.wait(brevisRes.queryKey, 11155111);
        console.log("Brevis processing completed.");
    } catch (err) {
        console.error("Error during Brevis submission or waiting:", err);
    }
}

// INFO: Right now the fees is set to 0 by brevis
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
async function payFees(fee: string, id: any) {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
    const address = signer.address;
    const nonce = await provider.getTransactionCount(address);
    const brevisRequest = new ethers.Contract('0xa082F86d9d1660C29cf3f962A31d7D20E367154F', brevisRequestABI, signer);
    const balance = await provider.getBalance(signer.address);
    console.log(`Current Balance: ${ethers.utils.formatEther(balance)} ETH`);
    const requiredFee = ethers.utils.parseEther(fee);
    if (balance.lt(requiredFee)) {
        throw new Error('Insufficient balance to pay the fees.');
    }
    const callback = {
        target: process.env.CALLBACK_ADDRESS,
        gas: 400000,
    };
    const tx = await brevisRequest.sendRequest(id.query_hash, id.nonce, address, callback, 0, { value: requiredFee });
    console.log('Transaction sent:', tx.hash);
        const receipt = await tx.wait();
        console.log('Transaction receipt:', receipt);
    }

main();
