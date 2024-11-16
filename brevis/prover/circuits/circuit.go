package circuits

import (
	"fmt"

	"github.com/brevis-network/brevis-sdk/sdk"
)

type APYCircuit struct {
}

var _ sdk.AppCircuit = &APYCircuit{}

func (c *APYCircuit) Allocate() (maxReceipts, maxStorage, maxTransactions int) {
	// Allocating for 8 receipts
	return 32, 0, 0
}

func (c *APYCircuit) Define(api *sdk.CircuitAPI, in sdk.DataInput) error {
	receipts := sdk.NewDataStream(api, in.Receipts)

	// Initialize min and max rates
	maxRate := sdk.ConstUint248(0)
	// maxUint248 := sdk.ConstUint248("37778931862957161709568")
	minRate := api.ToUint248(sdk.GetUnderlying(receipts, 0).Fields[0].Value)
	for i := 0; i < 8; i++ {
		receipt := sdk.GetUnderlying(receipts, i)
		fmt.Println("----------x-xxx-x-x--x-x-x-x-x-x", receipt)
		fmt.Println("receipt blocknum ---", receipt.BlockNum)
		// Adjust the field index if necessary
		rate := api.ToUint248(receipt.Fields[0].Value)
		fmt.Println("rate---", rate)

		// Update maxRate
		isGreater := api.Uint248.IsGreaterThan(rate, maxRate)
		maxRate = api.Uint248.Select(isGreater, rate, maxRate)
		fmt.Println("IsGreater", isGreater)
		fmt.Println("maxRate", maxRate)

		// Update minRate
		isLess := api.Uint248.IsLessThan(rate, minRate)
		minRate = api.Uint248.Select(isLess, rate, minRate)
		fmt.Println("IsLess", isLess)
		fmt.Println("minRate", minRate)
		fmt.Println("--------------------------------")
	}
	// Iterate over the receipts

	fmt.Println("maxRate--------", maxRate)
	fmt.Println("minRate--------", minRate)
	// Compute the difference
	difference := api.Uint248.Sub(maxRate, minRate)
	fmt.Println("Difference -------", difference)

	// Output the difference
	api.OutputUint(128, api.ToUint248(difference))

	return nil
}
