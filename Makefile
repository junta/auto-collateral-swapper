-include .env

.PHONY: all test clean deploy fund help install format anvil

DEFAULT_ANVIL_KEY := 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

all: clean remove install update build

# Clean the repo
clean  :; forge clean

snapshot :; forge snapshot

format :; forge fmt

anvil :; anvil -m 'test test test test test test test test test test test junk' --steps-tracing --block-time 1

my-balance:
	cast wallet address | xargs cast balance --rpc-url $(SEPOLIA_RPC_URL) --ether

# This will call the contract on chain at $DAI_PRICE_FEED_CONTRACT. The $DAI_PRICE_FEED_CALLDATA could be obtained from https://hermes.pyth.network/docs/#/rest/latest_price_updates API method
pull-dai-price-feed:
	cast send $(DAI_PRICE_FEED_CONTRACT) "pullDaiPrice(bytes[], uint256)(int64)" ['0x$(DAI_PRICE_FEED_CALLDATA)'] 6000 --value 1000 --rpc-url=$(SEPOLIA_RPC_URL)

deploy-pyth-price-feed:
	forge create src/PythPriceFeed.sol:SomeContract --rpc-url $(SEPOLIA_RPC_URL) --constructor-args $(SEPOLIA_PYTH_PRICE_FEED)

deploy-stop-loss-contract:
	forge create src/types/StopLoss.sol:StopLoss --rpc-url $(SEPOLIA_RPC_URL) 

deploy-sep:
	forge script script/DeployFundMe.s.sol:DeployFundMe --rpc-url $(SEPOLIA_RPC_URL) --broadcast

