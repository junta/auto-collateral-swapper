// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { IERC20 } from './dependencies/IERC20.sol';
import { GPv2SafeERC20 } from './dependencies/GPv2SafeERC20.sol';

interface IEVault {
    function deposit(uint256 amount, address receiver) external returns (uint256);

    function withdraw(uint256 amount, address receiver, address owner) external returns (uint256);
}

contract CollateralSwitchEuler {
    using GPv2SafeERC20 for IERC20;
    
    IEVault public depositEVault;
    IEVault public withdrawEVault;
    
    function deposit(address vaultAddress, address asset, uint256 amount, address onBehalfOf) public {
        depositEVault = IEVault(vaultAddress);
        IERC20(asset).safeTransferFrom(onBehalfOf, address(this), amount);
        IERC20(asset).approve(address(depositEVault), amount); 
        depositEVault.deposit(amount, onBehalfOf);
    }

    function withdraw(address vaultAddress, address asset, uint amount, address onBehalfOf) public {
        withdrawEVault = IEVault(vaultAddress);
        IERC20(asset).safeTransferFrom(onBehalfOf, address(this), amount);
        IERC20(asset).approve(address(withdrawEVault), amount); 
        withdrawEVault.withdraw(amount, onBehalfOf, onBehalfOf);
    }
}