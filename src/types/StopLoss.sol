// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import {IERC20, GPv2Order, IConditionalOrder, BaseConditionalOrder} from "../BaseConditionalOrder.sol";
import {IAggregatorV3Interface} from "../interfaces/IAggregatorV3Interface.sol";
import {ConditionalOrdersUtilsLib as Utils} from "./ConditionalOrdersUtilsLib.sol";

import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

// --- error strings

/// @dev Invalid price data returned by the oracle
string constant ORACLE_INVALID_PRICE = "oracle invalid price";
/// @dev The oracle has returned stale data
string constant ORACLE_STALE_PRICE = "oracle stale price";
/// @dev The strike price has not been reached
string constant STRIKE_NOT_REACHED = "strike not reached";
/// @dev The order is not valid anymore
string constant ORDER_EXPIRED = "order expired";

/**
 * @title StopLoss conditional order
 * Requires providing two price oracles (e.g. chainlink) and a strike price. If the sellToken price falls below the strike price, the order will be triggered
 * @notice Both oracles need to be denominated in the same quote currency (e.g. GNO/ETH and USD/ETH for GNO/USD stop loss orders)
 * @dev This order type has replay protection due to the `validTo` parameter, ensuring it will just execute one time
 */
contract StopLoss is BaseConditionalOrder {
    /// @dev Scaling factor for the strike price
    int256 constant SCALING_FACTOR = 10 ** 18;

    // DAI/USD oracle
    IPyth pyth = IPyth(0xDd24F84d36BF92C65F92307595335bdFab5Bbd21);
    bytes32 priceFeedId = 0xb0948a5e5313200c632b51bb5ca32f6de0d36e9950a942d19751e833f70dabfd; // DAI/USD PRICE FEED ID

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
     * @param sellTokenPriceOracle: A chainlink-like oracle returning the current sell token price in a given numeraire
     * @param buyTokenPriceOracle: A chainlink-like oracle returning the current buy token price in the same numeraire
     * @param strike: The exchange rate (denominated in sellToken/buyToken) which triggers the StopLoss order if the oracle price falls below. Specified in base / quote with 18 decimals.
     * @param maxTimeSinceLastOracleUpdate: The maximum time since the last oracle update. If the oracle hasn't been updated in this time, the order will be considered invalid
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
        IAggregatorV3Interface sellTokenPriceOracle;
        IAggregatorV3Interface buyTokenPriceOracle;
        int256 strike;
        uint256 maxTimeSinceLastOracleUpdate;
    }

    function pullCollateralPrice(uint256 age) public view returns(int64) {
      PythStructs.Price memory price = pyth.getPriceNoOlderThan(priceFeedId, age);
      return price.price;
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

            // Make sure the price is no older than 10 minutes
            int64 collateral_price = pullCollateralPrice(600);

            /// @dev Scale the strike price to 6 decimals.
            if (collateral_price > 99000000) {
                revert IConditionalOrder.PollTryNextBlock(STRIKE_NOT_REACHED);
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
