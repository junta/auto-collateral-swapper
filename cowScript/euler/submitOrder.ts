import { ethers } from "ethers";
import {
  OrderBookApi,
  OrderQuoteSideKindSell,
  OrderSigningUtils,
  SigningScheme,
  SupportedChainId,
  UnsignedOrder,
} from "@cowprotocol/cow-sdk";
import "dotenv/config";
import { MetadataApi, latest } from "@cowprotocol/app-data";
import { ourContract, signer, usdc, usdcVault, usdt } from "./constants";

const contractABI = require("./CollateralSwitchEuler.json");

const ownerAddress = "0xCC6052347377630ba1042FE618F848EE8b52db09";

const usdtVault = "0x85aaFcAda1Fe47C384c0F6F7C3E815Da4b69eF31";

const amount = ethers.utils.parseUnits("0.1", 6);

const chainId = SupportedChainId.ARBITRUM_ONE;
const orderBookApi = new OrderBookApi({
  chainId,
});

async function submitCowOrder() {
  try {
    const buyToken = usdt;
    let sellAmount = amount.toString();

    const { appDataHex, appDataContent } = await generateHookData();

    const quoteRequest = {
      sellToken: usdc,
      buyToken,
      from: ownerAddress,
      receiver: ownerAddress,
      sellAmountBeforeFee: sellAmount,
      kind: OrderQuoteSideKindSell.SELL,
      appData: appDataContent,
      appDataHash: appDataHex,
    };

    const { quote } = await orderBookApi.getQuote(quoteRequest);

    const feeAmount = "0";

    const order: UnsignedOrder = {
      ...quote,
      sellAmount,
      feeAmount,
      receiver: ownerAddress,
      appData: appDataHex,
    };

    const orderSigningResult = await OrderSigningUtils.signOrder(
      order,
      chainId,
      signer
    );

    console.log("orderSigningResult: ", orderSigningResult);

    const orderUid = await orderBookApi.sendOrder({
      ...quote,
      ...orderSigningResult,
      sellAmount,
      feeAmount,
      signingScheme:
        orderSigningResult.signingScheme as unknown as SigningScheme,
    });
    console.log("orderId: ", orderUid);

    // const orderresult = await orderBookApi.getOrder(orderUid);
    // console.log("orderresult: ", orderresult);

    console.log("waiting for the order is filled.");
    await getTrade(orderUid);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getTrade(orderUid: string) {
  let trades;

  while (!trades || trades.length === 0) {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // wait for 5 seconds
    trades = await orderBookApi.getTrades({ orderUid });
  }
  console.log(
    "Check your transaction: ",
    `https://arbitrum.blockscout.com/tx/${trades[0].txHash}`
  );
}

async function generateHookData() {
  const appCode = "Euler Collateral Swapper";
  const environment = "prod";

  const metadataApi = new MetadataApi();

  const preCallData = await supplyCallData();
  const postCallData = await withdrawCallData();

  const appDataDoc = await metadataApi.generateAppDataDoc({
    appCode,
    environment,
    metadata: {
      hooks: {
        pre: [
          {
            callData: preCallData,
            gasLimit: "1000000",
            target: ourContract,
          },
        ],
        post: [
          {
            callData: postCallData,
            gasLimit: "1000000",
            target: ourContract,
          },
        ],
      },
    },
  });
  const { appDataHex, appDataContent } = await metadataApi.appDataToCid(
    appDataDoc
  );
  console.log(appDataDoc);
  console.log(appDataHex);
  console.log(appDataContent);
  return { appDataHex, appDataContent };
}

async function supplyCallData() {
  const iface = new ethers.utils.Interface(contractABI);
  const callData = iface.encodeFunctionData("deposit", [
    usdtVault,
    usdt,
    amount,
    ownerAddress,
  ]);

  console.log("Encoded call data for supply function:", callData);
  return callData;
}

async function withdrawCallData() {
  const iface = new ethers.utils.Interface(contractABI);

  const callData = iface.encodeFunctionData("withdraw", [
    usdcVault,
    usdcVault,
    amount,
    ownerAddress,
  ]);

  console.log("Encoded call data for withdraw function:", callData);
  return callData;
}

submitCowOrder();
