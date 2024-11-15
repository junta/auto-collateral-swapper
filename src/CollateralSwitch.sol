// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { IERC20 } from './dependencies/IERC20.sol';
import { GPv2SafeERC20 } from './dependencies/GPv2SafeERC20.sol';
import {IFlashLoanSimpleReceiver} from "@aave/core-v3/contracts/flashloan/interfaces/IFlashLoanSimpleReceiver.sol";

interface IAaveV3Pool {
    function getUserAccountData(address user) external view returns (
        uint256 totalCollateralBase,
        uint256 totalDebtBase,
        uint256 availableBorrowsBase,
        uint256 currentLiquidationThreshold,
        uint256 ltv,
        uint256 healthFactor
    );

    function repay(address asset,uint256 amount,uint256 interestRateMode,address onBehalfOf) external returns (uint256);

    function borrow(
        address asset,
        uint256 amount,
        uint256 interestRateMode,
        uint16 referralCode,
        address onBehalfOf
    ) external;

    function supply(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external;

    function withdraw(address asset, uint256 amount, address to) external returns (uint256);
}

interface IDebtToken {
    function approveDelegation(address delegatee, uint256 amount) external;
}

contract CollateralSwitch {
    using GPv2SafeERC20 for IERC20;

    IAaveV3Pool public aaveV3Pool;
    
    constructor(address _aaveV3PoolAddress) {
        aaveV3Pool = IAaveV3Pool(_aaveV3PoolAddress);
        
    }

    function getUserData(address user) public view returns (
        uint256 totalCollateralBase,
        uint256 totalDebtBase,
        uint256 availableBorrowsBase,
        uint256 currentLiquidationThreshold,
        uint256 ltv,
        uint256 healthFactor
    ) {
        return aaveV3Pool.getUserAccountData(user);
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

    function aaveV3Repay(address asset,uint256 amount) public returns (uint256) {
        IERC20(asset).safeTransferFrom(msg.sender, address(this), amount);
        IERC20(asset).approve(address(aaveV3Pool), amount); 
        return aaveV3Pool.repay(asset, amount, 2, msg.sender);
    }

    function aaveV3RepayInternal(address asset,uint256 amount) internal returns (uint256) {
   
    }

    function aaveV3Borrow(address asset,uint256 amount) public {
        aaveV3Pool.borrow(asset, amount, 2, 0, msg.sender);
    }


    // repay debt and withdraw collateral in aaveV3, then deposit collateral in aaveV2
    function aaveCollateralSwitch(address debtAsset, address collateralAsset, uint256 amount) public {
        aaveV3RepayInternal(debtAsset, amount);

        aaveV3Pool.withdraw(collateralAsset, amount, msg.sender);      
    }
    


   // callback function we need to implement for aave v3 flashloan
   function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external returns (bool) {
        address debtTokenAddress = abi.decode(params, (address));
        
        uint256 testSupplyAmount = 1;
        uint256 amountOwing = amount + premium + testSupplyAmount;
        // Repay the loan + premium (the fee charged by Aave for flash loan)
        IERC20(asset).approve(address(aaveV3Pool), amountOwing); 

        
        // write our own logic to use flashloan
        aaveV3Pool.supply(asset, testSupplyAmount, initiator, 0);
                
        return true;
    }
}