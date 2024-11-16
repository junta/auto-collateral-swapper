export default [
    {
        "inputs": [
            { "internalType": "address", "name": "_feeCollector", "type": "address" },
            { "internalType": "contract IBrevisProof", "name": "_brevisProof", "type": "address" },
            { "internalType": "contract IBvnSigsVerifier", "name": "_bvnSigsVerifier", "type": "address" }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "address", "name": "from", "type": "address" },
            { "indexed": false, "internalType": "address", "name": "to", "type": "address" }
        ],
        "name": "AvsSigsVerifierUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "string", "name": "from", "type": "string" },
            { "indexed": false, "internalType": "string", "name": "to", "type": "string" }
        ],
        "name": "BaseDataUrlUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "address", "name": "from", "type": "address" },
            { "indexed": false, "internalType": "address", "name": "to", "type": "address" }
        ],
        "name": "BrevisDisputeUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "address", "name": "from", "type": "address" },
            { "indexed": false, "internalType": "address", "name": "to", "type": "address" }
        ],
        "name": "BrevisProofUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "address", "name": "from", "type": "address" },
            { "indexed": false, "internalType": "address", "name": "to", "type": "address" }
        ],
        "name": "BvnSigsVerifierUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" },
            { "indexed": false, "internalType": "address", "name": "receiver", "type": "address" }
        ],
        "name": "FeeCollected",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "address", "name": "from", "type": "address" },
            { "indexed": false, "internalType": "address", "name": "to", "type": "address" }
        ],
        "name": "FeeCollectorUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "bytes32[]", "name": "proofIds", "type": "bytes32[]" },
            { "indexed": false, "internalType": "uint64[]", "name": "nonces", "type": "uint64[]" },
            { "indexed": false, "internalType": "bytes32[]", "name": "appCommitHashes", "type": "bytes32[]" },
            { "indexed": false, "internalType": "bytes32[]", "name": "appVkHashes", "type": "bytes32[]" }
        ],
        "name": "OpRequestsFulfilled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" },
            { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }],
        "name": "Paused",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }],
        "name": "PauserAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }],
        "name": "PauserRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }],
        "name": "ProverAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }],
        "name": "ProverRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "bytes32", "name": "proofId", "type": "bytes32" },
            { "indexed": false, "internalType": "uint64", "name": "nonce", "type": "uint64" }
        ],
        "name": "RequestCallbackFailed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "bytes32", "name": "proofId", "type": "bytes32" },
            { "indexed": false, "internalType": "uint64", "name": "nonce", "type": "uint64" },
            { "indexed": false, "internalType": "uint256", "name": "gas", "type": "uint256" },
            { "indexed": false, "internalType": "uint256", "name": "fee", "type": "uint256" }
        ],
        "name": "RequestFeeIncreased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "bytes32", "name": "proofId", "type": "bytes32" },
            { "indexed": false, "internalType": "uint64", "name": "nonce", "type": "uint64" }
        ],
        "name": "RequestFulfilled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "bytes32", "name": "proofId", "type": "bytes32" },
            { "indexed": false, "internalType": "uint64", "name": "nonce", "type": "uint64" }
        ],
        "name": "RequestRefunded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "bytes32", "name": "proofId", "type": "bytes32" },
            { "indexed": false, "internalType": "uint64", "name": "nonce", "type": "uint64" },
            { "indexed": false, "internalType": "address", "name": "refundee", "type": "address" },
            { "indexed": false, "internalType": "uint256", "name": "fee", "type": "uint256" },
            {
                "components": [
                    { "internalType": "address", "name": "target", "type": "address" },
                    { "internalType": "uint64", "name": "gas", "type": "uint64" }
                ],
                "indexed": false,
                "internalType": "struct IBrevisTypes.Callback",
                "name": "callback",
                "type": "tuple"
            },
            { "indexed": false, "internalType": "uint8", "name": "option", "type": "uint8" }
        ],
        "name": "RequestSent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "uint256", "name": "from", "type": "uint256" },
            { "indexed": false, "internalType": "uint256", "name": "to", "type": "uint256" }
        ],
        "name": "RequestTimeoutUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "bytes32[]", "name": "proofIds", "type": "bytes32[]" },
            { "indexed": false, "internalType": "uint64[]", "name": "nonces", "type": "uint64[]" }
        ],
        "name": "RequestsCallbackFailed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "bytes32[]", "name": "proofIds", "type": "bytes32[]" },
            { "indexed": false, "internalType": "uint64[]", "name": "nonces", "type": "uint64[]" }
        ],
        "name": "RequestsFulfilled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }],
        "name": "Unpaused",
        "type": "event"
    },
    {
        "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
        "name": "addPauser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address[]", "name": "accounts", "type": "address[]" }],
        "name": "addPausers",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address[]", "name": "_accounts", "type": "address[]" }],
        "name": "addProvers",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint64", "name": "_chainId", "type": "uint64" },
            {
                "components": [
                    { "internalType": "bytes32", "name": "commitHash", "type": "bytes32" },
                    { "internalType": "bytes32", "name": "appCommitHash", "type": "bytes32" },
                    { "internalType": "bytes32", "name": "appVkHash", "type": "bytes32" },
                    { "internalType": "bytes32", "name": "smtRoot", "type": "bytes32" },
                    { "internalType": "bytes32", "name": "dummyInputCommitment", "type": "bytes32" }
                ],
                "internalType": "struct Brevis.ProofData",
                "name": "_proofData",
                "type": "tuple"
            },
            { "internalType": "bytes32", "name": "_merkleRoot", "type": "bytes32" },
            { "internalType": "bytes32[]", "name": "_merkleProof", "type": "bytes32[]" },
            { "internalType": "uint8", "name": "_nodeIndex", "type": "uint8" },
            { "internalType": "bytes", "name": "_appCircuitOutput", "type": "bytes" },
            { "internalType": "address", "name": "_callbackTarget", "type": "address" }
        ],
        "name": "applyBrevisAggProof",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint64", "name": "_chainId", "type": "uint64" },
            {
                "components": [
                    { "internalType": "bytes32", "name": "commitHash", "type": "bytes32" },
                    { "internalType": "bytes32", "name": "appCommitHash", "type": "bytes32" },
                    { "internalType": "bytes32", "name": "appVkHash", "type": "bytes32" },
                    { "internalType": "bytes32", "name": "smtRoot", "type": "bytes32" },
                    { "internalType": "bytes32", "name": "dummyInputCommitment", "type": "bytes32" }
                ],
                "internalType": "struct Brevis.ProofData[]",
                "name": "_proofDataArray",
                "type": "tuple[]"
            },
            { "internalType": "bytes[]", "name": "_appCircuitOutputs", "type": "bytes[]" },
            { "internalType": "address[]", "name": "_callbackTargets", "type": "address[]" }
        ],
        "name": "applyBrevisAggProof",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32", "name": "_proofId", "type": "bytes32" },
            { "internalType": "bytes32", "name": "_appVkHash", "type": "bytes32" },
            { "internalType": "bytes32", "name": "_appCommitHash", "type": "bytes32" },
            { "internalType": "bytes", "name": "_appCircuitOutput", "type": "bytes" },
            { "internalType": "address", "name": "_callbackTarget", "type": "address" }
        ],
        "name": "applyBrevisProof",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "avsSigsVerifier",
        "outputs": [{ "internalType": "contract IAvsSigsVerifier", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "baseDataURL",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "brevisDispute",
        "outputs": [{ "internalType": "contract IBrevisDispute", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "brevisProof",
        "outputs": [{ "internalType": "contract IBrevisProof", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "bvnSigsVerifier",
        "outputs": [{ "internalType": "contract IBvnSigsVerifier", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_amount", "type": "uint256" },
            { "internalType": "address", "name": "_to", "type": "address" }
        ],
        "name": "collectFee",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "bytes32", "name": "_proofId", "type": "bytes32" }],
        "name": "dataURL",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "feeCollector",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32[]", "name": "_proofIds", "type": "bytes32[]" },
            { "internalType": "uint64[]", "name": "_nonces", "type": "uint64[]" },
            { "internalType": "bytes32[]", "name": "_appCommitHashes", "type": "bytes32[]" },
            { "internalType": "bytes32[]", "name": "_appVkHashes", "type": "bytes32[]" },
            {
                "components": [
                    { "internalType": "bytes[]", "name": "sigs", "type": "bytes[]" },
                    { "internalType": "address[]", "name": "signers", "type": "address[]" },
                    { "internalType": "uint256[]", "name": "powers", "type": "uint256[]" }
                ],
                "internalType": "struct IBvnSigsVerifier.SigInfo",
                "name": "_bvnSigInfo",
                "type": "tuple"
            },
            {
                "components": [
                    { "internalType": "uint64", "name": "blockNum", "type": "uint64" },
                    {
                        "components": [
                            { "internalType": "uint32[]", "name": "nonSignerQuorumBitmapIndices", "type": "uint32[]" },
                            {
                                "components": [
                                    { "internalType": "uint256", "name": "X", "type": "uint256" },
                                    { "internalType": "uint256", "name": "Y", "type": "uint256" }
                                ],
                                "internalType": "struct IAvsSigsVerifier.BN254_G1Point[]",
                                "name": "nonSignerPubkeys",
                                "type": "tuple[]"
                            },
                            {
                                "components": [
                                    { "internalType": "uint256", "name": "X", "type": "uint256" },
                                    { "internalType": "uint256", "name": "Y", "type": "uint256" }
                                ],
                                "internalType": "struct IAvsSigsVerifier.BN254_G1Point[]",
                                "name": "quorumApks",
                                "type": "tuple[]"
                            },
                            {
                                "components": [
                                    { "internalType": "uint256[2]", "name": "X", "type": "uint256[2]" },
                                    { "internalType": "uint256[2]", "name": "Y", "type": "uint256[2]" }
                                ],
                                "internalType": "struct IAvsSigsVerifier.BN254_G2Point",
                                "name": "apkG2",
                                "type": "tuple"
                            },
                            {
                                "components": [
                                    { "internalType": "uint256", "name": "X", "type": "uint256" },
                                    { "internalType": "uint256", "name": "Y", "type": "uint256" }
                                ],
                                "internalType": "struct IAvsSigsVerifier.BN254_G1Point",
                                "name": "sigma",
                                "type": "tuple"
                            },
                            { "internalType": "uint32[]", "name": "quorumApkIndices", "type": "uint32[]" },
                            { "internalType": "uint32[]", "name": "totalStakeIndices", "type": "uint32[]" },
                            { "internalType": "uint32[][]", "name": "nonSignerStakeIndices", "type": "uint32[][]" }
                        ],
                        "internalType": "struct IAvsSigsVerifier.NonSignerStakesAndSignature",
                        "name": "params",
                        "type": "tuple"
                    }
                ],
                "internalType": "struct IAvsSigsVerifier.SigInfo",
                "name": "_avsSigInfo",
                "type": "tuple"
            }
        ],
        "name": "fulfillOpRequests",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32", "name": "_proofId", "type": "bytes32" },
            { "internalType": "uint64", "name": "_nonce", "type": "uint64" },
            { "internalType": "uint64", "name": "_chainId", "type": "uint64" },
            { "internalType": "bytes", "name": "_proof", "type": "bytes" },
            { "internalType": "bytes", "name": "_appCircuitOutput", "type": "bytes" },
            { "internalType": "address", "name": "_callbackTarget", "type": "address" }
        ],
        "name": "fulfillRequest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32[]", "name": "_proofIds", "type": "bytes32[]" },
            { "internalType": "uint64[]", "name": "_nonces", "type": "uint64[]" },
            { "internalType": "uint64", "name": "_chainId", "type": "uint64" },
            { "internalType": "bytes", "name": "_proof", "type": "bytes" },
            {
                "components": [
                    { "internalType": "bytes32", "name": "commitHash", "type": "bytes32" },
                    { "internalType": "bytes32", "name": "appCommitHash", "type": "bytes32" },
                    { "internalType": "bytes32", "name": "appVkHash", "type": "bytes32" },
                    { "internalType": "bytes32", "name": "smtRoot", "type": "bytes32" },
                    { "internalType": "bytes32", "name": "dummyInputCommitment", "type": "bytes32" }
                ],
                "internalType": "struct Brevis.ProofData[]",
                "name": "_proofDataArray",
                "type": "tuple[]"
            },
            { "internalType": "bytes[]", "name": "_appCircuitOutputs", "type": "bytes[]" },
            { "internalType": "address[]", "name": "_callbackTargets", "type": "address[]" }
        ],
        "name": "fulfillRequests",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32", "name": "_proofId", "type": "bytes32" },
            { "internalType": "uint64", "name": "_nonce", "type": "uint64" },
            { "internalType": "uint64", "name": "_addGas", "type": "uint64" },
            { "internalType": "uint256", "name": "_currentFee", "type": "uint256" },
            { "internalType": "address", "name": "_refundee", "type": "address" }
        ],
        "name": "increaseGasFee",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "_feeCollector", "type": "address" },
            { "internalType": "contract IBrevisProof", "name": "_brevisProof", "type": "address" },
            { "internalType": "contract IBvnSigsVerifier", "name": "_bvnSigsVerifier", "type": "address" },
            { "internalType": "uint256", "name": "_requestTimeout", "type": "uint256" }
        ],
        "name": "init",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "_account", "type": "address" }],
        "name": "isActiveProver",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
        "name": "isPauser",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "numPausers",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "numProvers",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
        "name": "onchainRequests",
        "outputs": [
            { "internalType": "bytes32", "name": "feeHash", "type": "bytes32" },
            {
                "components": [
                    { "internalType": "address", "name": "target", "type": "address" },
                    { "internalType": "uint64", "name": "gas", "type": "uint64" }
                ],
                "internalType": "struct IBrevisTypes.Callback",
                "name": "callback",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
        "name": "opdata",
        "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    { "inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    {
        "inputs": [],
        "name": "paused",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "name": "pauserList",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "name": "pausers",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "name": "proverStates",
        "outputs": [{ "internalType": "enum BrevisAccess.ProverState", "name": "", "type": "uint8" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "name": "provers",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32", "name": "_proofId", "type": "bytes32" },
            { "internalType": "uint64", "name": "_nonce", "type": "uint64" }
        ],
        "name": "queryRequestStatus",
        "outputs": [
            { "internalType": "enum IBrevisTypes.RequestStatus", "name": "", "type": "uint8" },
            { "internalType": "uint8", "name": "", "type": "uint8" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32", "name": "_proofId", "type": "bytes32" },
            { "internalType": "uint64", "name": "_nonce", "type": "uint64" },
            { "internalType": "uint256", "name": "_challengeWindow", "type": "uint256" }
        ],
        "name": "queryRequestStatus",
        "outputs": [
            { "internalType": "enum IBrevisTypes.RequestStatus", "name": "", "type": "uint8" },
            { "internalType": "uint8", "name": "", "type": "uint8" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32", "name": "_proofId", "type": "bytes32" },
            { "internalType": "uint64", "name": "_nonce", "type": "uint64" },
            { "internalType": "uint256", "name": "_amount", "type": "uint256" },
            { "internalType": "address", "name": "_refundee", "type": "address" }
        ],
        "name": "refund",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
        "name": "removePauser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address[]", "name": "accounts", "type": "address[]" }],
        "name": "removePausers",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address[]", "name": "_accounts", "type": "address[]" }],
        "name": "removeProvers",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    { "inputs": [], "name": "renouncePauser", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    {
        "inputs": [],
        "name": "requestTimeout",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
        "name": "requests",
        "outputs": [
            { "internalType": "enum IBrevisTypes.RequestStatus", "name": "status", "type": "uint8" },
            { "internalType": "uint64", "name": "timestamp", "type": "uint64" },
            { "internalType": "uint8", "name": "option", "type": "uint8" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32", "name": "_proofId", "type": "bytes32" },
            { "internalType": "uint64", "name": "_nonce", "type": "uint64" },
            { "internalType": "address", "name": "_refundee", "type": "address" },
            {
                "components": [
                    { "internalType": "address", "name": "target", "type": "address" },
                    { "internalType": "uint64", "name": "gas", "type": "uint64" }
                ],
                "internalType": "struct IBrevisTypes.Callback",
                "name": "_callback",
                "type": "tuple"
            },
            { "internalType": "uint8", "name": "_option", "type": "uint8" }
        ],
        "name": "sendRequest",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "_avsSigsVerifier", "type": "address" }],
        "name": "setAvsSigsVerifier",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "string", "name": "_url", "type": "string" }],
        "name": "setBaseDataURL",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "_brevisDispute", "type": "address" }],
        "name": "setBrevisDispute",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "_brevisProof", "type": "address" }],
        "name": "setBrevisProof",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "_bvnSigsVerifier", "type": "address" }],
        "name": "setBvnSigsVerifier",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "_feeCollector", "type": "address" }],
        "name": "setFeeCollector",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32", "name": "requestKey", "type": "bytes32" },
            { "internalType": "enum IBrevisTypes.RequestStatus", "name": "_status", "type": "uint8" }
        ],
        "name": "setRequestStatus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_timeout", "type": "uint256" }],
        "name": "setRequestTimeout",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    { "inputs": [], "name": "unpause", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    {
        "inputs": [
            { "internalType": "bytes32", "name": "_proofId", "type": "bytes32" },
            { "internalType": "uint64", "name": "_nonce", "type": "uint64" },
            { "internalType": "bytes32", "name": "_appCommitHash", "type": "bytes32" },
            { "internalType": "bytes32", "name": "_appVkHash", "type": "bytes32" },
            { "internalType": "uint256", "name": "_challengeWindow", "type": "uint256" },
            { "internalType": "uint8", "name": "_option", "type": "uint8" }
        ],
        "name": "validateOpAppData",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32", "name": "_proofId", "type": "bytes32" },
            { "internalType": "uint64", "name": "_nonce", "type": "uint64" },
            { "internalType": "bytes32", "name": "_appCommitHash", "type": "bytes32" },
            { "internalType": "bytes32", "name": "_appVkHash", "type": "bytes32" },
            { "internalType": "uint8", "name": "_option", "type": "uint8" }
        ],
        "name": "validateOpAppData",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32[]", "name": "_proofIds", "type": "bytes32[]" },
            { "internalType": "uint64[]", "name": "_nonces", "type": "uint64[]" },
            { "internalType": "bytes32[]", "name": "_appCommitHashes", "type": "bytes32[]" },
            { "internalType": "bytes32[]", "name": "_appVkHashes", "type": "bytes32[]" },
            { "internalType": "uint256", "name": "_challengeWindow", "type": "uint256" },
            { "internalType": "uint8", "name": "_option", "type": "uint8" }
        ],
        "name": "validateOpAppData",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    { "stateMutability": "payable", "type": "receive" }
]
