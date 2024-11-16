import { ethers } from "ethers";
import "dotenv/config";
import { ourContract, signer, usdc, usdcVault, usdt } from "./constants";

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
  const token = new ethers.Contract(usdc, approveAbi, signer);

  const tx = await token.approve(
    // ourContract,
    "0xC92E8bdf79f0507f65a392b0ab4667716BFE0110", // relayer
    ethers.utils.parseUnits("1000", 6)
  );
  console.log("tx", tx);
  const receipt = await tx.wait();
}

approve(signer);
