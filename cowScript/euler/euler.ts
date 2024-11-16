import { ethers } from "ethers";
import "dotenv/config";
import { ownerAddress } from "../aaveV3/constants";

const contractABI = require("./EVault.json");

const provider = new ethers.providers.JsonRpcProvider(
  "https://arbitrum.llamarpc.com"
);
export const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

const usdcVault = "0x6a47f0Dee6d11B8F43559792ca6ac20fbBE9c572";
const usdtVault = "0x85aaFcAda1Fe47C384c0F6F7C3E815Da4b69eF31";

async function deposit(signer) {
  const contract = new ethers.Contract(usdtVault, contractABI, signer);

  const amount = ethers.utils.parseUnits("0.1", 6);
  const tx = await contract.deposit(amount, ownerAddress);
  console.log(tx);

  const receipt = await tx.wait();
}

async function withdraw(signer) {
  const contract = new ethers.Contract(usdtVault, contractABI, signer);

  const amount = ethers.utils.parseUnits("0.1", 6);
  const tx = await contract.withdraw(amount, ownerAddress, ownerAddress);
  console.log(tx);

  const receipt = await tx.wait();
  console.log(receipt);
}

deposit(signer);

// withdraw(signer);
