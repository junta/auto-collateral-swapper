import { ethers } from "ethers";
import {
  OrderBookApi,
  OrderQuoteSideKindSell,
  OrderSigningUtils,
  SigningScheme,
  SupportedChainId,
  UnsignedOrder,
} from "@cowprotocol/cow-sdk";
import "dotenv/config";
import { MetadataApi, latest } from "@cowprotocol/app-data";
import {
  USDC,
  aUSDC,
  wXDAI,
  ourContract,
  ownerAddress,
  aavePoolAddress,
  cowSettlement,
  signer,
} from "./constants";

const collateralSwitchAbi = require("./collateralSwitchAbi.json");

const rawAmount = "1";
const amount = ethers.utils.parseUnits(rawAmount, 6);
const amount18Decimal = ethers.utils.parseEther(rawAmount);

const chainId = SupportedChainId.GNOSIS_CHAIN;
const orderBookApi = new OrderBookApi({
  chainId,
});

async function submitCowOrder() {
  try {
    const buyToken = wXDAI;
    let sellAmount = amount.toString();

    const { appDataHex, appDataContent } = await generateHookData();

    const quoteRequest = {
      sellToken: USDC,
      buyToken,
      from: ownerAddress,
      receiver: ownerAddress,
      sellAmountBeforeFee: sellAmount,
      kind: OrderQuoteSideKindSell.SELL,
      appData: appDataContent,
      appDataHash: appDataHex,
    };

    const { quote } = await orderBookApi.getQuote(quoteRequest);

    const feeAmount = "0";

    const order: UnsignedOrder = {
      ...quote,
      sellAmount,
      feeAmount,
      receiver: ownerAddress,
      appData: appDataHex,
    };

    const orderSigningResult = await OrderSigningUtils.signOrder(
      order,
      chainId,
      signer
    );

    console.log("orderSigningResult: ", orderSigningResult);

    const orderUid = await orderBookApi.sendOrder({
      ...quote,
      ...orderSigningResult,
      sellAmount,
      feeAmount,
      signingScheme:
        orderSigningResult.signingScheme as unknown as SigningScheme,
    });
    console.log("orderId: ", orderUid);

    // const orderresult = await orderBookApi.getOrder(orderUid);
    // console.log("orderresult: ", orderresult);

    console.log("waiting for the order is filled.");
    await getTrade(orderUid);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getTrade(orderUid: string) {
  let trades;

  while (!trades || trades.length === 0) {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // wait for 5 seconds
    trades = await orderBookApi.getTrades({ orderUid });
  }
  console.log(
    "Check your transaction: ",
    `https://gnosis.blockscout.com/tx/${trades[0].txHash}`
  );
}

async function generateHookData() {
  const appCode = "Aave v3 Collateral Swapper";
  const environment = "prod";

  const metadataApi = new MetadataApi();

  const preCallData = await supplyCallData();
  const postCallData = await withdrawCallData();

  const appDataDoc = await metadataApi.generateAppDataDoc({
    appCode,
    environment,
    metadata: {
      hooks: {
        pre: [
          {
            callData: preCallData,
            gasLimit: "1000000",
            target: ourContract,
          },
        ],
        post: [
          {
            callData: postCallData,
            gasLimit: "1000000",
            target: ourContract,
          },
        ],
      },
    },
  });
  const { appDataHex, appDataContent } = await metadataApi.appDataToCid(
    appDataDoc
  );
  console.log(appDataDoc);
  console.log(appDataHex);
  console.log(appDataContent);
  return { appDataHex, appDataContent };
}

async function supplyCallData() {
  const iface = new ethers.utils.Interface(collateralSwitchAbi);

  const onBehalfOf = ownerAddress;

  const callData = iface.encodeFunctionData("aaveV3Supply", [
    wXDAI,
    amount18Decimal,
    onBehalfOf,
  ]);

  console.log("Encoded call data for supply function:", callData);
  return callData;
}

async function withdrawCallData() {
  const iface = new ethers.utils.Interface(collateralSwitchAbi);

  const onBehalfOf = ownerAddress;

  const callData = iface.encodeFunctionData("aaveV3Withdraw", [
    USDC,
    aUSDC,
    amount,
    onBehalfOf,
  ]);

  console.log("Encoded call data for withdraw function:", callData);
  return callData;
}

submitCowOrder();

// getTrade(
//   "0xfa048609350a83aa2f18ba4edff0656b07507a599ef4796148cb091cb9e061ddcc6052347377630ba1042fe618f848ee8b52db0967382c13"
// );
