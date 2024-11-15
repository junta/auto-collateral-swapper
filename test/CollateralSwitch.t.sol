// // SPDX-License-Identifier: MIT
// pragma solidity >=0.8.0 <0.9.0;

// import "forge-std/Test.sol";
// import "../src/CollateralSwitch.sol";
// import "./helpers/Tokens.t.sol";

// // import { IERC20 } from "./ComposableCoW.base.t.sol";

// contract CollateralSwitchTest is Test {
//     CollateralSwitch collateralSwitch;
//     IERC20 mockDebtToken;
//     IERC20 mockCollateralToken;
//     IAaveV3Pool mockAaveV3Pool;

//     function setUp() public {
//         // Deploy mock tokens and the CollateralSwitch contract
//         mockDebtToken = new MockERC20("Mock Debt Token", "MDT", 18);
//         mockCollateralToken = new MockERC20("Mock Collateral Token", "MCT", 18);
//         mockAaveV3Pool = new LendingPoolMock();

//         collateralSwitch = new CollateralSwitch(address(mockAaveV3Pool), address(mockDebtToken));
//     }

//     function testAaveCollateralSwitch() public {
//         uint256 amount = 1000;

//         // Mint tokens to the caller
//         mockDebtToken.mint(address(this), amount);
//         mockCollateralToken.mint(address(this), amount);

//         // Approve the CollateralSwitch contract to spend the tokens
//         mockDebtToken.approve(address(collateralSwitch), amount);
//         mockCollateralToken.approve(address(collateralSwitch), amount);

//         // Call the aaveCollateralSwitch function
//         collateralSwitch.aaveCollateralSwitch(address(mockDebtToken), address(mockCollateralToken), amount);

//         // Assert that the debt has been repaid and collateral has been withdrawn
//         assertEq(mockAaveV3Pool.getDebtBalance(address(this)), 0, "Debt should be repaid");
//         assertEq(mockCollateralToken.balanceOf(address(this)), amount, "Collateral should be withdrawn");
//     }
// }

// contract LendingPoolMock {
//     // using SafeERC20 for IERC20;

//     // Mapping to track user deposits: user => token => amount
//     mapping(address => mapping(address => uint256)) public userDeposits;

//     event Deposit(address indexed user, address indexed token, uint256 amount);
//     event Withdraw(address indexed user, address indexed token, uint256 amount);

//     function deposit(
//         address asset,
//         uint256 amount,
//         address onBehalfOf,
//         uint16 _referralCode
//     ) external {
//         IERC20(asset).safeTransferFrom(msg.sender, address(this), amount);
//         userDeposits[onBehalfOf][asset] += amount;
//         emit Deposit(onBehalfOf, asset, amount);
//     }

//     function withdraw(
//         address asset,
//         uint256 amount,
//         address to
//     ) external returns (uint256) {
//         require(userDeposits[msg.sender][asset] >= amount, "Insufficient balance");
        
//         userDeposits[msg.sender][asset] -= amount;
//         IERC20(asset).safeTransfer(to, amount);
        
//         emit Withdraw(msg.sender, asset, amount);
//         return amount;
//     }

//     function getUserBalance(address user, address asset) external view returns (uint256) {
//         return userDeposits[user][asset];
//     }
// }