import BigNumber from "bignumber.js";
import bs58 from "bs58";
import { expect } from "chai";
import * as dotenv from "dotenv";
import { describe, it } from "mocha";

import { Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

import { syncNative, transfer } from "../../node_modules/@solana/spl-token";
import { DcaClientFactory } from "../../src/clients";
import { CONNECTION as connection } from "../../src/constants";
import { findAssociatedTokenAddress } from "../../src/utils";

dotenv.config();

const secretKeyString = process.env.SECRET;
if (!secretKeyString)
	throw new Error("Could not load env var. Try adding .env file at root dir with var SECRET=<secret key>");

const ownerKeypair = Keypair.fromSecretKey(bs58.decode(secretKeyString));

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

async function isConfirmed(signature: string) {
	const status = await connection.getSignatureStatus(signature, { searchTransactionHistory: true });
	if (!status || status === null) {
		return false;
	} else {
		if (
			status.value?.confirmationStatus === "confirmed" ||
			status.value?.confirmationStatus === "processed" ||
			status.value?.confirmationStatus === "finalized"
		) {
			return true;
		} else {
			return false;
		}
	}
}
// RAY to SOL dca account
const dcaAccountA = new PublicKey("AtTJrt7hSCpT4pYB3R7S3Xi59dgp7jVRAEGKJSyjH1nX");
// RAY
const MINT1 = new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R");
// Ray ATA
const dcaWRAYTokenVault = new PublicKey("4VYm4kZYaAgsS29wGB8Lx1EBFw1HwWGURZYcKfMMu8aV");
// WSOL ATA
const dca1WSolVault = new PublicKey("9ebkPugoYKebFGuYXNw8weLp3L8vBts11VYyKrQPgtnk");

// SOL to USDC
const dcaAccountB = new PublicKey("B4mAeTp58jJuoXsLqQnhuytj67TpGQnzqoJDg9FMyzRy");
// USDC
const MINT2 = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
// Usdc ATA
const dcaUsdcTokenVault = new PublicKey("G9P2beimN11HN64mrkMpGCJUx7fVsgVxXdToRkUGswaJ");
// WSOL ATA
const dca2WSolVault = new PublicKey("68YY25k1bSYFDNV8zt7SqqZWx4QuLGFzVWoCxGAdhhnc");

const expectedStatus = "success";

describe("Dca online client test", async () => {
	const dcaOnlineClient = new DcaClientFactory()
		.setConnection(connection)
		.setCommitment("confirmed")
		.setPreflightCommitment("confirmed")
		.buildOnlineClient(wallet);

	describe("depositToken()", () => {
		it("deposit token into dca vault", async () => {
			const {
				data: { dcaAccount, signature },
				status,
			} = await dcaOnlineClient.depositToken(wallet.publicKey, MINT1, new BigNumber("0.0001"));
			const accountInfo = await connection.getAccountInfo(dcaAccount);
			expect(accountInfo).not.to.be.null;
			expect(status).to.equal(expectedStatus);
			expect(signature).not.to.be.undefined;
			const confirmed = await isConfirmed(signature);
			expect(confirmed).to.be.true;
		});
	});

	describe("depositSol()", () => {
		it("deposit sol into dca vault", async () => {
			const {
				data: { signature, dcaAccount },
				status,
			} = await dcaOnlineClient.depositSol(wallet.publicKey, MINT2, new BigNumber("0.0001"));
			const accountInfo = await connection.getAccountInfo(dcaAccount);
			expect(accountInfo).not.to.be.null;
			expect(status).to.equal(expectedStatus);
			expect(signature).not.to.be.undefined;
			const confirmed = await isConfirmed(signature);
			expect(confirmed).to.be.true;
		});
	});

	describe("intialize()", () => {
		it("intialize the dca process", async () => {
			const {
				data: { signature: initializeSignature },
				status: initializeStatus,
			} = await dcaOnlineClient.initialize(
				wallet.publicKey,
				MINT1,
				dcaAccountA,
				new BigNumber(Date.now() / 1000 + 120),
				new BigNumber(0.001),
				new BigNumber(3000),
			);
			expect(initializeStatus).to.equal("success");
			expect(initializeSignature).not.to.be.undefined;
			const confirmed = await isConfirmed(initializeSignature);
			expect(confirmed).to.be.true;
		});
	});

	describe("swapToSol()", () => {
		before(async () => {
			const ownerTokenAccount = await findAssociatedTokenAddress(wallet.publicKey, MINT1);
			const depositRAYToken = transfer(
				connection,
				ownerKeypair,
				ownerTokenAccount,
				dcaWRAYTokenVault,
				wallet.publicKey,
				1000,
			);
		});
		it("swap token mint to wsol", async () => {
			const {
				data: { signature },
				status,
			} = await dcaOnlineClient.swapToSol(wallet.publicKey, MINT1, dcaAccountA);
			expect(status).to.equal(expectedStatus);
			expect(signature).not.to.be.undefined;
			const confirmed = await isConfirmed(signature);
			expect(confirmed).to.be.true;
		});
	});

	describe("swapFromSol()", () => {
		before(async () => {
			const depositSol = await connection.sendTransaction(
				new Transaction().add(
					SystemProgram.transfer({
						fromPubkey: wallet.publicKey,
						toPubkey: dca2WSolVault,
						lamports: 1000,
					}),
				),
				[ownerKeypair],
				{
					preflightCommitment: "confirmed",
					skipPreflight: false,
				},
			);
			await syncNative(connection, ownerKeypair, dca2WSolVault, { commitment: "confirmed" });
		});
		it("swap sol to token mint", async () => {
			const {
				data: { signature },
				status,
			} = await dcaOnlineClient.swapFromSol(wallet.publicKey, MINT2, dcaAccountB);
			expect(status).to.equal(expectedStatus);
			expect(signature).not.to.be.undefined;
			const confirmed = await isConfirmed(signature);
			expect(confirmed).to.be.true;
		});
	});

	describe("withdrawToken()", () => {
		before(async () => {
			const ownerTokenAccount = await findAssociatedTokenAddress(wallet.publicKey, MINT2);
			const depositUSDCToken = await transfer(
				connection,
				ownerKeypair,
				ownerTokenAccount,
				dcaUsdcTokenVault,
				wallet.publicKey,
				1000,
			);
		});
		it("withdraw swapped token mint from dca vault", async () => {
			const {
				data: { signature },
				status,
			} = await dcaOnlineClient.withdrawToken(wallet.publicKey, MINT2, dcaAccountB, new BigNumber(0.001));
			expect(status).to.equal(expectedStatus);
			expect(signature).not.to.be.undefined;
			const confirmed = await isConfirmed(signature);
			expect(confirmed).to.be.true;
		});
	});

	describe("withdrawSol()", () => {
		before(async () => {
			const depositSol = await connection.sendTransaction(
				new Transaction().add(
					SystemProgram.transfer({
						fromPubkey: wallet.publicKey,
						toPubkey: dca1WSolVault,
						lamports: 1000,
					}),
				),
				[ownerKeypair],
				{
					preflightCommitment: "confirmed",
					skipPreflight: false,
				},
			);
			await syncNative(connection, ownerKeypair, dca1WSolVault, { commitment: "confirmed" });
		});
		it("withdraw swapped sol from dca vault", async () => {
			const {
				data: { signature },
				status,
			} = await dcaOnlineClient.withdrawSol(wallet.publicKey, MINT1, dcaAccountA, new BigNumber(0.000001));
			expect(status).to.equal(expectedStatus);
			expect(signature).not.to.be.undefined;
			const confirmed = await isConfirmed(signature);
			expect(confirmed).to.be.true;
		});
	});

	describe("fundToken()", () => {
		it("fund tokens to existing dca process", async () => {
			const {
				data: { signature },
				status,
			} = await dcaOnlineClient.fundToken(wallet.publicKey, MINT1, dcaAccountA, new BigNumber(0.001));
			expect(status).to.equal(expectedStatus);
			expect(signature).not.to.be.undefined;
			const confirmed = await isConfirmed(signature);
			expect(confirmed).to.be.true;
		});
	});

	describe("fundSol()", () => {
		it("fund sol to existing dca process", async () => {
			const {
				data: { signature },
				status,
			} = await dcaOnlineClient.fundSol(wallet.publicKey, MINT2, dcaAccountB, new BigNumber(0.000001));
			expect(status).to.equal(expectedStatus);
			expect(signature).not.to.be.undefined;
			const confirmed = await isConfirmed(signature);
			expect(confirmed).to.be.true;
		});
	});
});
