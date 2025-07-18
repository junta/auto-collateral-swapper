# Auto Collateral Swapper

A comprehensive DeFi automation platform that enables automated collateral management and conditional order execution across multiple protocols including Aave V3, Euler, and CoW Protocol.

## Overview

The Auto Collateral Swapper is a sophisticated smart contract system designed to automate collateral management strategies in decentralized finance. It provides users with the ability to:

- **Automated Collateral Switching**: Seamlessly swap between different collateral assets based on predefined conditions
- **Stop-Loss Protection**: Automatically trigger protective trades when collateral values drop below specified thresholds
- **Multi-Protocol Support**: Integrate with major DeFi protocols including Aave V3, Euler, and CoW Protocol
- **Price Oracle Integration**: Utilize Pyth Network and Chainlink oracles for reliable price feeds
- **Conditional Order Execution**: Execute complex trading strategies using the ComposableCoW framework

## Architecture

### Core Components

#### 1. Collateral Management Contracts

- **`CollateralSwitch.sol`**: Handles Aave V3 collateral operations including supply, withdrawal, and flash loan integration
- **`CollateralSwitchEuler.sol`**: Manages Euler protocol deposits and withdrawals through EVault interface
- **`ComposableCoW.sol`**: Implements conditional order framework with Merkle tree authorization and swap guards

#### 2. Order Types

- **`StopLoss.sol`**: Implements stop-loss orders with Pyth price oracle integration
- **`InterestRateChange.sol`**: Handles interest rate-based conditional orders
- **`BaseConditionalOrder.sol`**: Provides base functionality for all conditional order types

#### 3. Price Management

- **`PythPriceFeed.sol`**: Integrates with Pyth Network for real-time price data
- **`MyFirstPythContract.sol`**: Example implementation of Pyth price oracle usage
- **Price Pusher Service**: Dedicated service for pushing price updates to on-chain oracles

#### 4. Zero-Knowledge Proof Integration

- **Brevis Integration**: Provides ZK-proof capabilities for APY change verification
- **Circuit Implementation**: Go-based circuit for generating proofs of interest rate changes

## Key Features

### Automated Collateral Management

The system automatically manages collateral positions across different protocols:

```solidity
// Example: Aave V3 collateral supply
function aaveV3Supply(address asset, uint256 amount, address onBehalfOf) public {
    IERC20(asset).safeTransferFrom(onBehalfOf, address(this), amount);
    IERC20(asset).approve(address(aaveV3Pool), amount); 
    aaveV3Pool.supply(asset, amount, onBehalfOf, 0);
}
```

### Conditional Order Execution

Users can create complex conditional orders with various triggers:

- Price-based conditions (stop-loss, take-profit)
- Time-based conditions
- Interest rate changes
- Custom oracle conditions

### Multi-Protocol Support

- **Aave V3**: Lending protocol integration with flash loan capabilities
- **Euler**: Advanced lending protocol with EVault architecture
- **CoW Protocol**: Intent-based trading with MEV protection

## Technical Stack

### Smart Contracts

- **Solidity**: `>=0.8.0 <0.9.0`
- **Foundry**: Development framework and testing
- **OpenZeppelin**: Security-audited contract libraries
- **Safe**: Multi-signature wallet integration

### Dependencies

- **CoW Protocol**: `@cowprotocol/contracts ^1.6.0`
- **Pyth Network**: `@pythnetwork/pyth-sdk-solidity ^4.0.0`
- **Aave V3**: `@aave/core-v3 ^1.19.3`
- **Ethers.js**: `^5.7.2`
- **TypeScript**: `^5.6.3`

### Development Tools

- **Forge**: Smart contract compilation and testing
- **TypeScript**: Scripting and automation
- **Go**: ZK circuit implementation
- **Docker**: Containerized deployment

## Installation

### Prerequisites

- Node.js (v16 or higher)
- Foundry
- Go (for ZK circuits)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/your-repo/auto-collateral-swapper.git
cd auto-collateral-swapper
```

2. Install dependencies:
```bash
npm install
```

3. Install Foundry dependencies:
```bash
forge install
```

4. Build contracts:
```bash
forge build
```

## Usage

### Running Tests

```bash
# Run all tests
forge test

# Run specific test file
forge test --match-path test/ComposableCoW.stoploss.t.sol

# Run with verbose output
forge test -vvv
```

### Deployment

Deploy contracts using Foundry scripts:

```bash
# Deploy to Anvil (local)
forge script script/deploy_AnvilStack.s.sol:AnvilStackScript --fork-url http://localhost:8545 --private-key <your_private_key>

# Deploy to production
forge script script/deploy_ProdStack.s.sol:ProdStackScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Order Submission

Submit conditional orders using the provided scripts:

```bash
# Submit Aave V3 order
npm run submit-aave

# Submit Euler order
npm run submit-euler
```

### Price Pusher Service

Run the price pusher service to maintain up-to-date oracle prices:

```bash
cd price_pusher
npm install
npm run start evm --endpoint <rpc_endpoint> --pyth-contract-address <address> --price-service-endpoint <hermes_endpoint> --price-config-file <config_file> --mnemonic-file <mnemonic_file>
```

## Configuration

### Price Configuration

Configure price feeds in `price_pusher/price-config.yaml`:

```yaml
- alias: DAI/USD
  id: 0xb0948a5e5313200c632b51bb5ca32f6de0d36e9950a942d19751e833f70dabfd
  time_difference: 60
  price_deviation: 0.5
  confidence_ratio: 1
```

### Network Configuration

Configure network settings in `networks.json`:

```json
{
  "mainnet": {
    "rpc": "https://mainnet.infura.io/v3/YOUR_KEY",
    "chainId": 1
  },
  "sepolia": {
    "rpc": "https://sepolia.infura.io/v3/YOUR_KEY",
    "chainId": 11155111
  }
}
```

## Security

### Audit Status

- Smart contracts follow OpenZeppelin security standards
- Implements Safe multi-signature wallet integration
- Uses proven oracle solutions (Pyth Network, Chainlink)
- Includes comprehensive test suite

### Risk Management

- Stop-loss mechanisms to prevent excessive losses
- Slippage protection on all trades
- Time-based order expiration
- Multi-oracle price verification

## Zero-Knowledge Proof Integration

The system includes Brevis integration for ZK-proof generation:

- **Circuit Implementation**: Go-based circuit for APY change verification
- **Proof Generation**: Off-chain proof generation for on-chain verification
- **Privacy**: Maintain privacy while proving specific conditions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add comprehensive tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support and questions:
- GitHub Issues: Create an issue in this repository
- Documentation: Refer to the docs/ directory
- Community: Join our Discord server

## Acknowledgments

- CoW Protocol team for the conditional order framework
- Pyth Network for reliable price oracles
- Aave and Euler teams for lending protocol integration
- Safe team for multi-signature wallet support