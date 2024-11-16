// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./lib/BrevisAppZkOnly.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Contract to receive APY change data via Brevis
contract APYChange is BrevisAppZkOnly, Ownable {
    event APYChanged(uint256 difference);

    bytes32 public vkHash;

    constructor(address _brevisRequest) BrevisAppZkOnly(_brevisRequest) Ownable(msg.sender) {}

    // Handle proof result from Brevis
    function handleProofResult(bytes32 _vkHash, bytes calldata _circuitOutput) internal override {
        require(vkHash == _vkHash, "Invalid verifying key");

        uint256 difference = decodeOutput(_circuitOutput);
        emit APYChanged(difference);
    }

    // Decode circuit output
    function decodeOutput(bytes calldata o) internal pure returns (uint256) {
        uint256 difference = uint256(bytes32(o[0:31]));
        return difference;
    }

    // Set the verifying key hash
    function setVkHash(bytes32 _vkHash) external onlyOwner {
        vkHash = _vkHash;
    }
} 