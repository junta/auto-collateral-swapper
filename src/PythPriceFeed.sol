// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
 
import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";
 
contract SomeContract {
  IPyth pyth;
  int64 priceFed;

  event LogPrice(address indexed sender, int64 price);
 
  /**
   * @param pythContract The address of the Pyth contract
   */
  constructor(address pythContract) {
    // The IPyth interface from pyth-sdk-solidity provides the methods to interact with the Pyth contract.
    // Instantiate it with the Pyth contract address from https://docs.pyth.network/price-feeds/contract-addresses/evm
    pyth = IPyth(pythContract);
  }

  function pullDaiPrice(bytes[] calldata priceUpdate, uint256 age) public payable {
    uint fee = pyth.getUpdateFee(priceUpdate);
    pyth.updatePriceFeeds{ value: fee }(priceUpdate);
 
    bytes32 priceFeedId = 0xb0948a5e5313200c632b51bb5ca32f6de0d36e9950a942d19751e833f70dabfd; // DAI/USD PRICE FEED ID
    PythStructs.Price memory price = pyth.getPriceNoOlderThan(priceFeedId, age);

    emit LogPrice(msg.sender, price.price);
  }
}
 
