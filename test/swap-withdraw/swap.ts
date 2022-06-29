import base58 from "bs58";
import * as dotenv from "dotenv";

import {
	clusterApiUrl,
	Connection,
	Keypair,
	PublicKey,
	Transaction,
} from "@solana/web3.js";

import {
	NATIVE_MINT,
	transfer,
} from "../../node_modules/@solana/spl-token";
import {
	DcaClientFactory,
	findAssociatedTokenAddress,
	findVaultAddress,
} from "../../src/index";

dotenv.config();

const secretKeyString = process.env.SECRET;
if (!secretKeyString)
	throw new Error("Could not load env var. Try adding .env file at root dir with var SECRET=<secret key>");

export const ownerKeypair = Keypair.fromSecretKey(base58.decode(secretKeyString));

const connection = new Connection(clusterApiUrl("mainnet-beta"));

// custom offline wallet implementation
const wallet = {
	publicKey: ownerKeypair.publicKey,
	async signTransaction(transaction: Transaction) {
		const existingPair = transaction.signatures.filter((pair) => pair.signature !== null);
		transaction.sign(ownerKeypair);
		existingPair.forEach((pair) => {
			if (pair.signature) transaction.addSignature(pair.publicKey, pair.signature);
		});
		return transaction;
	},
	async signAllTransactions(transactions: Transaction[]) {
		transactions.forEach(async (txn) => {
			txn.sign(ownerKeypair);
		});
		return transactions;
	},
};

// RAY
export const RAY_MINT = new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R");
// USDC
export const USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

const ownerTokenAccountA = await findAssociatedTokenAddress(ownerKeypair.publicKey, RAY_MINT);
const ownerTokenAccountB = await findAssociatedTokenAddress(ownerKeypair.publicKey, USDC_MINT);

const dcaAccountA = new PublicKey("Hefrv6CqZr6EGq2Axkn89gbfxSnntkLeupgSBNhDdZn6");
const dcaAccountVaultA = await findVaultAddress(ownerKeypair.publicKey, dcaAccountA);
const dcaAccountTokenAccountA = await findAssociatedTokenAddress(dcaAccountVaultA, RAY_MINT);
const dcaAccountWsolAccountA = await findAssociatedTokenAddress(dcaAccountTokenAccountA, NATIVE_MINT);

const dcaAccountB = new PublicKey("BHxXyHLgnpF74WsQ6EmCCW7RiSPmG4xergDhin4yT8Vz");
const dcaAccountVaultB = await findVaultAddress(ownerKeypair.publicKey, dcaAccountB);
const dcaAccountTokenAccountB = await findAssociatedTokenAddress(dcaAccountVaultB, USDC_MINT);
const dcaAccountWsolAccountB = await findAssociatedTokenAddress(dcaAccountVaultB, NATIVE_MINT);

const onlineDcaClient = new DcaClientFactory()
	.setConnection(connection)
	.setCommitment("finalized")
	.setPreflightCommitment("finalized")
	.buildOnlineClient(wallet);

const transferSignature = await transfer(
	connection,
	ownerKeypair,
	ownerTokenAccountA,
	dcaAccountTokenAccountA,
	ownerKeypair.publicKey,
	1000,
	undefined,
	{ commitment: "finalized" },
);
console.log("transfer txId", transferSignature);

const { value } = await connection.getTokenAccountBalance(dcaAccountTokenAccountA);
console.log("dcaAccountTokenAccountA balance", value.uiAmount);

const {
	data: { signature },
	status,
} = await onlineDcaClient.swapToSol(wallet.publicKey, RAY_MINT, dcaAccountA);
console.log("swap to sol txId", signature);

const {};
