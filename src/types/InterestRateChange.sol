// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import {IERC20, GPv2Order, IConditionalOrder, BaseConditionalOrder} from "../BaseConditionalOrder.sol";
import {IAggregatorV3Interface} from "../interfaces/IAggregatorV3Interface.sol";
import {ConditionalOrdersUtilsLib as Utils} from "./ConditionalOrdersUtilsLib.sol";
import {BrevisAppZkOnly} from "../../brevis/contracts/contracts/lib/BrevisAppZkOnly.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// --- error strings

/// @dev Invalid price data returned by the oracle
string constant ORACLE_INVALID_PRICE = "oracle invalid price";
/// @dev The oracle has returned stale data
string constant ORACLE_STALE_PRICE = "oracle stale price";
/// @dev The strike price has not been reached
string constant STRIKE_NOT_REACHED = "strike not reached";
/// @dev The order is not valid anymore
string constant ORDER_EXPIRED = "order expired";

/// @dev The daily difference is too low
string constant DAILY_DIFFERENCE_TOO_LOW = "daily difference too low";

/**
 * @title StopLoss conditional order
 * Requires providing two price oracles (e.g. chainlink) and a strike price. If the sellToken price falls below the strike price, the order will be triggered
 * @notice Both oracles need to be denominated in the same quote currency (e.g. GNO/ETH and USD/ETH for GNO/USD stop loss orders)
 * @dev This order type has replay protection due to the `validTo` parameter, ensuring it will just execute one time
 */
contract InterestRateChange is BaseConditionalOrder, BrevisAppZkOnly, Ownable {
    /// @dev Scaling factor for the strike price
    int256 constant SCALING_FACTOR = 10 ** 18;
    uint256 dailyDifference = 10000000;
    event APYChanged(uint256 difference);

    bytes32 public vkHash;
    constructor(address _brevisRequest) BrevisAppZkOnly(_brevisRequest) Ownable(msg.sender) {}

    function handleProofResult(bytes32 _vkHash, bytes calldata _circuitOutput) internal override {
        require(vkHash == _vkHash, "Invalid verifying key");

        uint256 difference = decodeOutput(_circuitOutput);
        dailyDifference = difference;
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

    /**
     * Defines the parameters of a StopLoss order
     * @param sellToken: the token to be sold
     * @param buyToken: the token to be bought
     * @param sellAmount: In case of a sell order, the exact amount of tokens the order is willing to sell. In case of a buy order, the maximium amount of tokens it is willing to sell
     * @param buyAmount: In case of a sell order, the min amount of tokens the order is wants to receive. In case of a buy order, the exact amount of tokens it is willing to receive
     * @param appData: The IPFS hash of the appData associated with the order
     * @param receiver: The account that should receive the proceeds of the trade
     * @param isSellOrder: Whether this is a sell or buy order
     * @param isPartiallyFillable: Whether solvers are allowed to only fill a fraction of the order (useful if exact sell or buy amount isn't know at time of placement)
     * @param validTo: The UNIX timestamp before which this order is valid
     */
    struct Data {
        IERC20 sellToken;
        IERC20 buyToken;
        uint256 sellAmount;
        uint256 buyAmount;
        bytes32 appData;
        address receiver;
        bool isSellOrder;
        bool isPartiallyFillable;
        uint32 validTo;
    }

    function getTradeableOrder(address, address, bytes32, bytes calldata staticInput, bytes calldata)
        public
        view
        override
        returns (GPv2Order.Data memory order)
    {
        Data memory data = abi.decode(staticInput, (Data));
        // scope variables to avoid stack too deep error
        {
            /// @dev Guard against expired orders
            if (data.validTo < block.timestamp) {
                revert IConditionalOrder.OrderNotValid(ORDER_EXPIRED);
            }

            /// @dev Guard against daily difference too high (currently have kept it low for testing purposes)
            if(dailyDifference < 10000000) {
                revert IConditionalOrder.OrderNotValid(DAILY_DIFFERENCE_TOO_LOW);
            }
        }

        order = GPv2Order.Data(
            data.sellToken,
            data.buyToken,
            data.receiver,
            data.sellAmount,
            data.buyAmount,
            data.validTo,
            data.appData,
            0, // use zero fee for limit orders
            data.isSellOrder ? GPv2Order.KIND_SELL : GPv2Order.KIND_BUY,
            data.isPartiallyFillable,
            GPv2Order.BALANCE_ERC20,
            GPv2Order.BALANCE_ERC20
        );
    }
}
