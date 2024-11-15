// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract MockAaveV3Pool {
    using SafeERC20 for IERC20;

    // Mapping to track user deposits: user => token => amount
    mapping(address => mapping(address => uint256)) public userDeposits;

    event Deposit(address indexed user, address indexed token, uint256 amount);
    event Withdraw(address indexed user, address indexed token, uint256 amount);

    function deposit(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 _referralCode
    ) external {
        IERC20(asset).safeTransferFrom(msg.sender, address(this), amount);
        userDeposits[onBehalfOf][asset] += amount;
        emit Deposit(onBehalfOf, asset, amount);
    }

    function withdraw(
        address asset,
        uint256 amount,
        address to
    ) external returns (uint256) {
        require(userDeposits[msg.sender][asset] >= amount, "Insufficient balance");
        
        userDeposits[msg.sender][asset] -= amount;
        IERC20(asset).safeTransfer(to, amount);
        
        emit Withdraw(msg.sender, asset, amount);
        return amount;
    }

    function getUserBalance(address user, address asset) external view returns (uint256) {
        return userDeposits[user][asset];
    }
}