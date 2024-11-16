import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "https://arbitrum.llamarpc.com"
);
export const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

export const usdt = "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9";
export const usdc = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831";
export const ourContract = "0x4cF696596DA3F799906DE03bE7fA8C9Afb3C7F98";
export const usdcVault = "0x6a47f0Dee6d11B8F43559792ca6ac20fbBE9c572";
