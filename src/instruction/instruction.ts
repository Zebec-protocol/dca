import BN from "bn.js";

import {
	ASSOCIATED_TOKEN_PROGRAM_ID,
	TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
	PublicKey,
	SystemProgram,
	SYSVAR_RENT_PUBKEY,
	TransactionInstruction,
} from "@solana/web3.js";

import { DCA_PROGRAM_ID } from "../constants";
import { AccountMetaFactory } from "../utils";
import {
	DepositTokenData,
	InitializeData,
	SwapData,
	WithdrawTokenData,
} from "./data";

/**
 * The DCA program instruction factory class.
 */
export class DcaInstruction {
	/**
	 * Generate transaction instruction that deposit into DCA vault
	 */
	static depositToken(
		source: PublicKey,
		vault: PublicKey,
		tokenMint: PublicKey,
		sourceTokenAccount: PublicKey,
		vaultTokenAccount: PublicKey,
		amount: BN,
	) {
		const data = new DepositTokenData(amount).encode();
		const keys = [
			AccountMetaFactory.newWritable(source, true),
			AccountMetaFactory.newWritable(vault, false),
			AccountMetaFactory.newReadonly(TOKEN_PROGRAM_ID, false),
			AccountMetaFactory.newWritable(tokenMint, false),
			AccountMetaFactory.newReadonly(SystemProgram.programId, false),
			AccountMetaFactory.newReadonly(SYSVAR_RENT_PUBKEY, false),
			AccountMetaFactory.newWritable(sourceTokenAccount, false),
			AccountMetaFactory.newWritable(vaultTokenAccount, false),
			AccountMetaFactory.newReadonly(ASSOCIATED_TOKEN_PROGRAM_ID, false),
		];
		return new TransactionInstruction({
			keys: keys,
			programId: DCA_PROGRAM_ID,
			data: data,
		});
	}

	/**
	 * Generate transaction instruction to intialize the dca process
	 */
	static initialize(
		source: PublicKey,
		vault: PublicKey,
		tokenMintFrom: PublicKey,
		tokenMintTo: PublicKey,
		vaultTokenAccountFrom: PublicKey,
		vaultTokenAccountTo: PublicKey,
		dcaAccount: PublicKey,
		startTime: BN,
		dcaAmount: BN,
		frequency: BN,
	) {
		const data = new InitializeData(startTime, dcaAmount, frequency).encode();
		const keys = [
			AccountMetaFactory.newWritable(source, true),
			AccountMetaFactory.newWritable(vault, false),
			AccountMetaFactory.newWritable(tokenMintFrom, false),
			AccountMetaFactory.newWritable(tokenMintTo, false),
			AccountMetaFactory.newWritable(vaultTokenAccountFrom, false),
			AccountMetaFactory.newWritable(vaultTokenAccountTo, false),
			AccountMetaFactory.newWritable(dcaAccount, false),
			AccountMetaFactory.newReadonly(SystemProgram.programId, false),
			AccountMetaFactory.newReadonly(SYSVAR_RENT_PUBKEY, false),
			AccountMetaFactory.newReadonly(TOKEN_PROGRAM_ID, false),
			AccountMetaFactory.newReadonly(ASSOCIATED_TOKEN_PROGRAM_ID, false),
		];
		return new TransactionInstruction({
			keys: keys,
			programId: DCA_PROGRAM_ID,
			data: data,
		});
	}

	/**
	 * Generate transaction instruction to swap
	 */
	static swap(
		liquidityProgramId: PublicKey,
		ammAccount: PublicKey,
		ammAuthority: PublicKey,
		ammOpenOrder: PublicKey,
		ammTargetOrder: PublicKey,
		poolCoinTokenAccount: PublicKey,
		poolPcTokenAccount: PublicKey,
		serumMarketProgramId: PublicKey,
		serumMarket: PublicKey,
		serumBids: PublicKey,
		serumAsk: PublicKey,
		serumEventQueue: PublicKey,
		serumCoinVault: PublicKey,
		serumPcVault: PublicKey,
		serumVaultSigner: PublicKey,
		vault: PublicKey,
		vaultTokenAccountFrom: PublicKey,
		vaultTokenAccountTo: PublicKey,
		tokenMintFrom: PublicKey,
		tokenMintTo: PublicKey,
		source: PublicKey,
		dcaAccount: PublicKey,
		minimumAmountOut: BN,
	) {
		const data = new SwapData(minimumAmountOut).encode();
		const keys = [
			AccountMetaFactory.newReadonly(liquidityProgramId, false),
			AccountMetaFactory.newWritable(ammAccount, false),
			AccountMetaFactory.newReadonly(ammAuthority, false),
			AccountMetaFactory.newWritable(ammOpenOrder, false),
			AccountMetaFactory.newWritable(ammTargetOrder, false),
			AccountMetaFactory.newWritable(poolCoinTokenAccount, false),
			AccountMetaFactory.newWritable(poolPcTokenAccount, false),
			AccountMetaFactory.newReadonly(serumMarketProgramId, false),
			AccountMetaFactory.newWritable(serumMarket, false),
			AccountMetaFactory.newWritable(serumBids, false),
			AccountMetaFactory.newWritable(serumAsk, false),
			AccountMetaFactory.newWritable(serumEventQueue, false),
			AccountMetaFactory.newWritable(serumCoinVault, false),
			AccountMetaFactory.newWritable(serumPcVault, false),
			AccountMetaFactory.newReadonly(serumVaultSigner, false),
			AccountMetaFactory.newWritable(vault, false),
			AccountMetaFactory.newWritable(vaultTokenAccountFrom, false),
			AccountMetaFactory.newWritable(vaultTokenAccountTo, false),
			AccountMetaFactory.newWritable(tokenMintFrom, false),
			AccountMetaFactory.newWritable(tokenMintTo, false),
			AccountMetaFactory.newWritable(source, false),
			AccountMetaFactory.newWritable(dcaAccount, false),
			AccountMetaFactory.newReadonly(TOKEN_PROGRAM_ID, false),
		];
		return new TransactionInstruction({
			keys: keys,
			programId: DCA_PROGRAM_ID,
			data: data,
		});
	}

	/**
	 * Generate Transaction Instruction to withdraw token from DCA vault
	 */
	static withdrawToken(
		source: PublicKey,
		vault: PublicKey,
		tokenMint: PublicKey,
		sourceTokenAccount: PublicKey,
		vaultTokenAccount: PublicKey,
		dcaAccount: PublicKey,
		transferAmount: BN,
	) {
		const data = new WithdrawTokenData(transferAmount).encode();
		const keys = [
			AccountMetaFactory.newWritable(source, true),
			AccountMetaFactory.newWritable(vault, false),
			AccountMetaFactory.newReadonly(TOKEN_PROGRAM_ID, false),
			AccountMetaFactory.newWritable(tokenMint, false),
			AccountMetaFactory.newReadonly(SystemProgram.programId, false),
			AccountMetaFactory.newReadonly(SYSVAR_RENT_PUBKEY, false),
			AccountMetaFactory.newWritable(sourceTokenAccount, false),
			AccountMetaFactory.newWritable(vaultTokenAccount, false),
			AccountMetaFactory.newReadonly(ASSOCIATED_TOKEN_PROGRAM_ID, false),
		];
		return new TransactionInstruction({
			keys: keys,
			programId: DCA_PROGRAM_ID,
			data: data,
		});
	}
}
