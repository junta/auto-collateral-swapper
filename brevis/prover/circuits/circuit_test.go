package circuits

import (
	"fmt"
	"testing"

	"github.com/brevis-network/brevis-sdk/sdk"
	"github.com/brevis-network/brevis-sdk/test"
	"github.com/ethereum/go-ethereum/common"
)

func TestAPYCircuit(t *testing.T) {
	rpc := "https://eth.llamarpc.com"
	localDir := "$HOME/circuitOut/apyCircuit"
	app, err := sdk.NewBrevisApp(1, rpc, localDir)
	if err != nil {
		t.Fatal(err)
	}

	// Add 7 receipts to match the circuit's expectation
	for i := 0; i < 7; i++ {
		txHash := common.HexToHash(fmt.Sprintf("0xexamplehash%02d", i))
		app.AddReceipt(sdk.ReceiptData{
			TxHash:       txHash,
			BlockNum:     sdk.Uint32ToBytes(123456 + uint32(i)),            // Example block numbers
			BlockBaseFee: sdk.Uint248ToBytes(20000000000 + uint64(i)*1000), // Example base fees
			MptKeyPath:   sdk.Uint32ToBytes(1 + uint32(i)),                 // Example key paths
			Fields: []sdk.LogFieldData{
				{
					IsTopic:    true,
					LogPos:     0,
					FieldIndex: 0,                                                               // liquidityRate
					Value:      sdk.Uint248ToBytes(36726913224163956241400951 + uint64(i)*1000), // Example liquidityRate
				},
				{
					IsTopic:    true,
					LogPos:     0,
					FieldIndex: 1,                     // stableBorrowRate
					Value:      sdk.Uint248ToBytes(0), // Example stableBorrowRate
				},
				{
					IsTopic:    true,
					LogPos:     0,
					FieldIndex: 2,                                                               // variableBorrowRate
					Value:      sdk.Uint248ToBytes(54704326152021036761063673 + uint64(i)*1000), // Example variableBorrowRate
				},
			},
		})
	}

	apyCircuit := &APYCircuit{}
	apyCircuitAssignment := &APYCircuit{}

	circuitInput, err := app.BuildCircuitInput(apyCircuit)
	if err != nil {
		t.Fatal(err)
	}

	test.ProverSucceeded(t, apyCircuit, apyCircuitAssignment, circuitInput)
}
