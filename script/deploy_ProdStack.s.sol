// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import {Script} from "forge-std/Script.sol";

// ExtensibleFallbackHandler
import {ExtensibleFallbackHandler} from "../lib/safe/contracts/handler/ExtensibleFallbackHandler.sol";

// ComposableCoW
import {ComposableCoW} from "../src/ComposableCoW.sol";

// Order types
import {StopLoss} from "../src/types/StopLoss.sol";

// Value factories
import {CurrentBlockTimestampFactory} from "../src/value_factories/CurrentBlockTimestampFactory.sol";

contract DeployProdStack is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address settlement = vm.envAddress("SETTLEMENT");

        vm.startBroadcast(deployerPrivateKey);

        // Deploy ExtensibleFallbackHandler
        new ExtensibleFallbackHandler{salt: "v1.0.0"}();

        // Deploy ComposableCoW
        ComposableCoW composableCow = new ComposableCoW{salt: "v1.0.0"}(settlement);

        // Deploy order types
        new StopLoss{salt: "v1.0.0"}();

        // Deploy value factories
        new CurrentBlockTimestampFactory{salt: "v1.0.0"}();
    }
}
