# DCA Program TypeScript Client

A client library to interact with DCA program in solana blockchain. It consists of some simple API which makes you able to perform some operations for implementing dollar cost averaging.

The concept of DCA is same as in real world where buying dollar every day reduces the risk and result in higher returns accumulating both best and worst prices however, the implementation logic might differ here.

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

/*** creating online dca client ***/
const wallet = useWallet();

const dcaOnlineClient = new DcaClientFactory()
	.setConnection(connection)
	.setCommitment("confirmed")
	.setPreflightCommitment("confirmed")
	.buildOnlineClient(wallet);

/*** creating offline dca client ***/
const ownerKeypair = Keypair.generate();

const dcaOfflineClient = new DcaClientFactory()
	.setConnection(connection)
	.setCommitment("confirmed")
	.setPreflightCommitment("confirmed")
	.buildOfflineClient(ownerKeypair);
```

The work flow for both online and offline client is same for implementing the dca process. The example usage is given below:

```js
/*** exchanging from tokens to sol ***/
const mint = new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R");

/*1. deposit some token */
const {
	data: { signature, dcaAccount: dcaAccountA },
	status,
} = await dcaOnlineClient.depositToken(wallet.publicKey, mint, new BigNumber("0.0001"));
/* Note: Save the dcaAccount address for further use. */

/*2. init the dca process */
const {
	data: { signature: initializeSignature },
	status: initializeStatus,
} = await dcaOnlineClient.initialize(
	wallet.publicKey,
	mint,
	dcaAccountA,
	new BigNumber(Date.now() / 1000 + 120),
	new BigNumber(0.001),
	new BigNumber(3000),
);
/* Note: 120 is added in dca time so that given time don't get passed at the contract due to time taken by txn to reach to contract */

/*3. swap tokens to sol */
const {
	data: { signature },
	status,
} = await dcaOnlineClient.swapToSol(wallet.publicKey, mint, dcaAccountA);

/*4. withdraw wsol obtained after swapping tokens to wsol */
const {
	data: { signature },
	status,
} = await dcaOnlineClient.withdrawSol(wallet.publicKey, mint, dcaAccountA, new BigNumber(0.000001));

/*5. fund tokens to existing dca account */
const {
	data: { signature },
	status,
} = await dcaOnlineClient.fundToken(wallet.publicKey, mint, dcaAccountA, new BigNumber(0.001));

/*** end exchanging from tokens to sol ***/

/*** exchanging from sol to tokens ***/
const mint1 = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

/*1. deposit some sol */
const {
	data: { signature, dcaAccount: dcaAccountB },
	status,
} = await dcaOnlineClient.depositSol(wallet.publicKey, mint1, new BigNumber("0.0001"));
/* Note: Save the dcaAccount address for further use. */

/*2. Initialize the dca process in the same way as above */

/*3. swap sol to tokens */
const {
	data: { signature },
	status,
} = await dcaOnlineClient.swapFromSol(wallet.publicKey, mint1, dcaAccount);

/*4. withdraw tokens */
const {
	data: { signature },
	status,
} = await dcaOnlineClient.withdrawToken(wallet.publicKey, mint1, dcaAccount, new BigNumber(0.001));

/*5. fund sol */
const {
	data: { signature },
	status,
} = await dcaOnlineClient.fundSol(wallet.publicKey, mint1, dcaAccount, new BigNumber(0.000001));

/*** end exchanging from sol to tokens ***/
```

### Using Instruction Factory

Comming Soon...

## Development

Install dependencies:

```
npm install
```

Build project:

```
npm run build
```

Format project:

```
npm run format
```

Run tests

```
npm run test
```

## Contribution

Feel free to fork the repo and make contributions to the repository. If you found any issue or bug, open an issue on the github. Please mention the specfic steps to generate that issue. Any feedbacks like suggestions for features and ideas for improvement are also welcomed.

## License

[MIT](https://choosealicense.com/licenses/mit/)
