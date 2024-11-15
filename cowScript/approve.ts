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
  const token = new ethers.Contract(wXDAI, approveAbi, signer);

  const tx = await token.approve(
    // "0xC92E8bdf79f0507f65a392b0ab4667716BFE0110", // cow relayer
    ourContract,
    ethers.utils.parseUnits("100", 18)
  );
  console.log("tx", tx);
  const receipt = await tx.wait();
}

approve(signer);
