import BN from "bn.js";
import { expect } from "chai";
import { describe, it } from "mocha";

import { ASSOCIATED_TOKEN_PROGRAM_ID, NATIVE_MINT, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { AccountMeta, Keypair, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";

import { DCA_PROGRAM_ID } from "../../src/constants";
import { DepositTokenData, InitializeData, SwapData, WithdrawTokenData } from "../../src/instruction/data";
import { DcaInstruction } from "../../src/instruction/instruction";
import { SYSTEM_PROGRAM_ID } from "@raydium-io/raydium-sdk";

describe("DcaInstruction Test", () => {
	const owner = new Keypair().publicKey;
	const dcaData = new Keypair().publicKey;
	const baseMint = new Keypair().publicKey;
	const quoteMint = new Keypair().publicKey;
	const vault = new Keypair().publicKey;
	const ownerTokenAccount = new Keypair().publicKey;
	const vaultTokenAccountFrom = new Keypair().publicKey;
	const vaultTokenAccountTo = new Keypair().publicKey;
	const liquidityProgramId = new Keypair().publicKey;
	const amm = new Keypair().publicKey;
	const ammAuthority = new Keypair().publicKey;
	const ammOpenOrder = new Keypair().publicKey;
	const ammTargetOrder = new Keypair().publicKey;
	const poolCoinToken = new Keypair().publicKey;
	const poolPcToken = new Keypair().publicKey;
	const serumMarketProgramId = new Keypair().publicKey;
	const serumMarket = new Keypair().publicKey;
	const serumBids = new Keypair().publicKey;
	const serumAsk = new Keypair().publicKey;
	const serumEventQueue = new Keypair().publicKey;
	const serumCoinVault = new Keypair().publicKey;
	const serumPcVault = new Keypair().publicKey;
	const serumVaultSigner = new Keypair().publicKey;

	const amount = new BN("500000000");
	const startTime = new BN("100000000");
	const dcaAmount = new BN("100000000");
	const dcaTime = new BN("100000000");
	const minimumAmountOut = new BN("100000000");

	describe("depositToken()", () => {
		it("should have expected value in its props", async () => {
			const actual = DcaInstruction.depositToken(
				owner,
				vault,
				baseMint,
				ownerTokenAccount,
				vaultTokenAccountFrom,
				amount,
			);

			const keys: AccountMeta[] = [
				{ pubkey: owner, isSigner: true, isWritable: true },
				{ pubkey: vault, isSigner: false, isWritable: true },
				{ pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
				{ pubkey: baseMint, isSigner: false, isWritable: true },
				{ pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
				{ pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
				{ pubkey: ownerTokenAccount, isSigner: false, isWritable: true },
				{ pubkey: vaultTokenAccountFrom, isSigner: false, isWritable: true },
				{ pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
			];

			const data = new DepositTokenData(amount).encode();

			expect(actual.keys).deep.equal(keys);
			expect(actual.data).deep.equal(data);
			expect(actual.programId).equal(DCA_PROGRAM_ID);
		});
	});

	describe("initialize()", () => {
		it("should have expected value in its props", async () => {
			const actual = DcaInstruction.initialize(
				owner,
				vault,
				baseMint,
				quoteMint,
				vaultTokenAccountFrom,
				vaultTokenAccountTo,
				dcaData,
				startTime,
				dcaAmount,
				dcaTime,
			);

			const keys: AccountMeta[] = [
				{ pubkey: owner, isSigner: true, isWritable: true },
				{ pubkey: vault, isSigner: false, isWritable: true },
				{ pubkey: baseMint, isSigner: false, isWritable: true },
				{ pubkey: quoteMint, isSigner: false, isWritable: true },
				{ pubkey: vaultTokenAccountFrom, isSigner: false, isWritable: true },
				{ pubkey: vaultTokenAccountTo, isSigner: false, isWritable: true },
				{ pubkey: dcaData, isSigner: true, isWritable: true },
				{ pubkey: SYSTEM_PROGRAM_ID, isSigner: false, isWritable: false },
				{ pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
				{ pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
				{ pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
			];

			const data = new InitializeData(startTime, dcaAmount, dcaTime).encode();

			expect(actual.keys).deep.equal(keys);
			expect(actual.data).deep.equal(data);
			expect(actual.programId).equal(DCA_PROGRAM_ID);
		});
	});

	describe("swap()", () => {
		it("should have expected value in its props", async () => {
			const actual = DcaInstruction.swap(
				liquidityProgramId,
				amm,
				ammAuthority,
				ammOpenOrder,
				ammTargetOrder,
				poolCoinToken,
				poolPcToken,
				serumMarketProgramId,
				serumMarket,
				serumBids,
				serumAsk,
				serumEventQueue,
				serumCoinVault,
				serumPcVault,
				serumVaultSigner,
				vault,
				vaultTokenAccountFrom,
				vaultTokenAccountTo,
				baseMint,
				quoteMint,
				owner,
				dcaData,
				minimumAmountOut,
			);

			const keys: AccountMeta[] = [
				{ pubkey: liquidityProgramId, isSigner: false, isWritable: false },
				{ pubkey: amm, isSigner: false, isWritable: true },
				{ pubkey: ammAuthority, isSigner: false, isWritable: false },
				{ pubkey: ammOpenOrder, isSigner: false, isWritable: true },
				{ pubkey: ammTargetOrder, isSigner: false, isWritable: true },
				{ pubkey: poolCoinToken, isSigner: false, isWritable: true },
				{ pubkey: poolPcToken, isSigner: false, isWritable: true },
				{ pubkey: serumMarketProgramId, isSigner: false, isWritable: false },
				{ pubkey: serumMarket, isSigner: false, isWritable: true },
				{ pubkey: serumBids, isSigner: false, isWritable: true },
				{ pubkey: serumAsk, isSigner: false, isWritable: true },
				{ pubkey: serumEventQueue, isSigner: false, isWritable: true },
				{ pubkey: serumCoinVault, isSigner: false, isWritable: true },
				{ pubkey: serumPcVault, isSigner: false, isWritable: true },
				{ pubkey: serumVaultSigner, isSigner: false, isWritable: false },
				{ pubkey: vault, isSigner: false, isWritable: true },
				{ pubkey: vaultTokenAccountFrom, isSigner: false, isWritable: true },
				{ pubkey: vaultTokenAccountTo, isSigner: false, isWritable: true },
				{ pubkey: baseMint, isSigner: false, isWritable: true },
				{ pubkey: quoteMint, isSigner: false, isWritable: true },
				{ pubkey: owner, isSigner: false, isWritable: true },
				{ pubkey: dcaData, isSigner: false, isWritable: true },
				{ pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
			];

			const data = new SwapData(minimumAmountOut).encode();

			expect(actual.keys).deep.equal(keys);
			expect(actual.data).deep.equal(data);
			expect(actual.programId).equal(DCA_PROGRAM_ID);
		});
	});

	describe("withdrawToken()", () => {
		it("should have expected value in its props", async () => {
			const actual = DcaInstruction.withdrawToken(
				owner,
				vault,
				baseMint,
				ownerTokenAccount,
				vaultTokenAccountFrom,
				amount,
			);

			const keys: AccountMeta[] = [
				{ pubkey: owner, isSigner: true, isWritable: true },
				{ pubkey: vault, isSigner: false, isWritable: true },
				{ pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
				{ pubkey: baseMint, isSigner: false, isWritable: true },
				{ pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
				{ pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
				{ pubkey: ownerTokenAccount, isSigner: false, isWritable: true },
				{ pubkey: vaultTokenAccountFrom, isSigner: false, isWritable: true },
				{ pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
			];

			const data = new WithdrawTokenData(amount).encode();

			expect(actual.keys).deep.equal(keys);
			expect(actual.data).deep.equal(data);
			expect(actual.programId).equal(DCA_PROGRAM_ID);
		});
	});
});
