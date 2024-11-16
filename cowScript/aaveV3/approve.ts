import { ethers } from "ethers";
import "dotenv/config";
import { aUSDC, ourContract, wXDAI, signer } from "./constants";

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
  const token = new ethers.Contract(aUSDC, approveAbi, signer);

  const tx = await token.approve(
    ourContract,
    ethers.utils.parseUnits("100", 6)
  );
  console.log("tx", tx);
  const receipt = await tx.wait();
}

approve(signer);
