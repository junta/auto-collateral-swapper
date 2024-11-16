package main

import (
	"flag"
	"fmt"
	"os"

	"prover/circuits"

	"github.com/brevis-network/brevis-sdk/sdk/prover"
)

var port = flag.Uint("port", 33247, "the port to start the service at")

func main() {
	flag.Parse()

	proverService, err := prover.NewService(&circuits.APYCircuit{}, prover.ServiceConfig{
		SetupDir: "$HOME/circuitOut",
		SrsDir:   "$HOME/kzgsrs",
		// RpcURL:   "https://purple-flashy-morning.quiknode.pro/81c072f2436740a7b2e7cc481450cfc72a23315d",
		RpcURL:  "https://eth.llamarpc.com",
		ChainId: 1,
	})
	if err != nil {
		fmt.Println("Error initializing prover service:", err)
		os.Exit(1)
	}
	fmt.Println("Starting prover service on port:", *port)
	proverService.Serve("", *port)
}
