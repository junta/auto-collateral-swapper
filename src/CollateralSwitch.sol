// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { IERC20 } from './dependencies/IERC20.sol';
import { GPv2SafeERC20 } from './dependencies/GPv2SafeERC20.sol';
import {IFlashLoanSimpleReceiver} from "@aave/core-v3/contracts/flashloan/interfaces/IFlashLoanSimpleReceiver.sol";

interface IAaveV3Pool {
    function supply(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external;

    function withdraw(address asset, uint256 amount, address to) external returns (uint256);
}

contract CollateralSwitch {
    using GPv2SafeERC20 for IERC20;

    IAaveV3Pool public aaveV3Pool;
    
    constructor(address _aaveV3PoolAddress) {
        aaveV3Pool = IAaveV3Pool(_aaveV3PoolAddress);
        
    }

    function aaveV3Supply(address asset,uint256 amount, address onBehalfOf) public {
        IERC20(asset).safeTransferFrom(onBehalfOf, address(this), amount);
        IERC20(asset).approve(address(aaveV3Pool), amount); 
        aaveV3Pool.supply(asset, amount, onBehalfOf, 0);
    }

    function aaveV3Withdraw(address asset, address aToken, uint amount, address onBehalfOf) public {
        IERC20(aToken).safeTransferFrom(onBehalfOf, address(this), amount);
        IERC20(aToken).approve(address(aaveV3Pool), amount); 
        aaveV3Pool.withdraw(asset, amount, onBehalfOf);
    }


   // callback function we need to implement for aave v3 flashloan
//    function executeOperation(
//         address asset,
//         uint256 amount,
//         uint256 premium,
//         address initiator,
//         bytes calldata params
//     ) external returns (bool) {
//         address debtTokenAddress = abi.decode(params, (address));
        
//         uint256 testSupplyAmount = 1;
//         uint256 amountOwing = amount + premium + testSupplyAmount;
//         // Repay the loan + premium (the fee charged by Aave for flash loan)
//         IERC20(asset).approve(address(aaveV3Pool), amountOwing); 

        
//         // write our own logic to use flashloan
//         aaveV3Pool.supply(asset, testSupplyAmount, initiator, 0);
                
//         return true;
//     }
}