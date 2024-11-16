import { ethers } from "ethers";
import "dotenv/config";
import { ourContract, signer, usdcVault, usdt } from "./constants";

async function approve(signer) {
  const approveAbi = [
    {
      inputs: [
        { name: "_spender", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const token = new ethers.Contract(usdcVault, approveAbi, signer);

  const tx = await token.approve(
    ourContract,
    ethers.utils.parseUnits("1000", 6)
  );
  console.log("tx", tx);
  const receipt = await tx.wait();
}

approve(signer);
