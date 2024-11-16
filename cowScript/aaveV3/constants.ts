import { ethers } from "ethers";

export const USDC = "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83";
export const aUSDC = "0xc6B7AcA6DE8a6044E0e32d0c841a89244A10D284";
export const wXDAI = "0xe91d153e0b41518a2ce8dd3d7944fa863463a97d";
export const USDT = "0x4ECaBa5870353805a9F068101A40E0f32ed605C6";
export const ownerAddress = "0xCC6052347377630ba1042FE618F848EE8b52db09";
export const aavePoolAddress = "0xb50201558B00496A145fE76f7424749556E326D8";
export const cowSettlement = "0x9008D19f58AAbD9eD0D60971565AA8510560ab41";
export const ourContract = "0xeDfB7D0f800A2A66B3C22c6c22D78456261B2d2C";
const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc.gnosischain.com"
);

export const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
