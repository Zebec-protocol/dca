# DCA Program TypeScript Client

A client library to interact with DCA program in solana blockchain. It consists of some simple API which makes you able to perform some operations related to dollar cost averaging. The concept of DCA is same as in real world where buying dollar every day reduces the risk and result in higher returns accumulating both best and worst prices howeever, the implementation logic might differ here.

## Installation

```
npm install @zebec-protocol/dca @solana/web3.js bignumber.js
```

```
yarn add @zebec-protocol/dca @solana/web3.js bignumber.js
```

## Usage

The sdk can be used in two ways:

- By using ready made clients.
- By using instruction factory for custom implemenation.

### Using ready made clients

The dca client can be buit in using dca client factory. Dca client is of two types: Online and Offine. The online client uses wallet adapter and the offline client uses a signer.

Any wallet adapter can be provided to build the online dca client unless it implements the wallet adapter interface given below:

```js
export interface IWalletAdapter {
	publicKey: PublicKey;
	signTransaction(transaction: Transaction): Promise<Transaction>;
	signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
}
```

```js
import BigNumber from "bignumber.js";
import { Connection, Keypair } from "@solana/web3.js";
import { DcaClientFactory, CONNECTION as connection } from "@zebec-protocol/dca";
import { useWallet } from "@solana/wallet-adapter-react";

// wallet adapter
const wallet = useWallet();

// online dca client
const dcaOnlineClient = new DcaClientFactory()
	.setConnection(connection)
	.setCommitment("confirmed")
	.setPreflightCommitment("confirmed")
	.buildOnlineClient(wallet);

// keypair to use for signer
const ownerKeypair = Keypair.generate();

// offline dca client
const dcaOfflineClient = new DcaClientFactory()
	.setConnection(connection)
	.setCommitment("confirmed")
	.setPreflightCommitment("confirmed")
	.buildOfflineClient(ownerKeypair);
```

The work flow for both online and offline client is same for implementing the dca process. The example usage is given below:

```js
const mint = new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R");

// exchanging from tokens to sol
// deposit some token
const {
    data: { dcaAccount, signature },
	status,
} = await dcaOnlineClient.depositToken(
    wallet.publicKey,
    mint,
    // ui amount to deposit
    new BigNumber("0.0001")));
// Note: Save the dcaAccount address for further use.

// then init the dca process
const {
    data: { signature: initializeSignature },
	status: initializeStatus,
} = await dcaOnlineClient.initialize(
    wallet.publicKey,
    mint,
	dcaAccount,
	// startTime in unix timestamp.
    // 120 is added so that given time don't get passed at the contract
    // due to time taken by txn to reach to contract
    new BigNumber(Date.now() / 1000 + 120),
    // amount to swap at a time from total amount
    new BigNumber(0.001),
    // time duration to wait between two consecutive swap
	new BigNumber(3000),
);

// swap tokens to sol
const {
    data: { signature },
    status,
} = await dcaOnlineClient.swapToSol(wallet.publicKey, mint, dcaAccountA);

// withdraw wsol obtained after swapping tokens to wsol
const {
    data: { signature },
    status,
} = await dcaOnlineClient.withdrawSol(
    wallet.publicKey,
    mint,
    dcaAccountA,
    // ui amount to withdraw
    new BigNumber(0.000001));

// fund tokens to existing dca account
const {
    data: { signature },
    status,
} = await dcaOnlineClient.fundToken(
    wallet.publicKey,
    mint,
    dcaAccountA,
    // ui amount to fund
    new BigNumber(0.001));

// end exchanging from tokens to sol

const mint1 = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

// exchanging from sol to tokens
// deposit some sol
const {
    data: { signature, dcaAccount },
    status,
} = await dcaOnlineClient.depositSol(
    wallet.publicKey,
    mint1,
    // ui amount to deposit
    new BigNumber("0.0001"));

// Note: Save the dcaAccount address for further use.

// Initialize the dca process in the same way as above

// swap sol to tokens
const {
    data: { signature },
    status,
} = await dcaOnlineClient.swapFromSol(
    wallet.publicKey,
    mint1,
    dcaAccountB);

// withdraw tokens
const {
    data: { signature },
    status,
} = await dcaOnlineClient.withdrawToken(
    wallet.publicKey,
    mint1,
    dcaAccountB,
    //ui amount to withdraw
    new BigNumber(0.001));

// fund sol
const {
    data: { signature },
    status,
} = await dcaOnlineClient.fundSol(
    wallet.publicKey,
    mint1,
    dcaAccountB,
    // ui amount to withdraw
    new BigNumber(0.000001));

// end exchanging from sol to tokens

```

### Using Instruction Factory

Comming Soon...
