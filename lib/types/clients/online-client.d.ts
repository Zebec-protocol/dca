import { Commitment, Connection, PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { DcaClient, IWalletAdapter } from "./base";
export declare class DcaOnlineClient extends DcaClient {
	private _wallet;
	constructor(params: {
		wallet: IWalletAdapter;
		connection: Connection;
		commitment: Commitment;
		preflightCommitment: Commitment;
	});
	private signAndSendTransaction;
	/**
	 * Deposit non-native token in dca program vault
	 */
	depositToken(
		owner: PublicKey,
		mint: PublicKey,
		amount: BigNumber,
	): Promise<{
		status: string;
		data: {
			signature: string;
			dcaAccount: import("@solana/web3.js").Keypair;
		};
	}>;
	/**
	 * Deposit sol in dca vault
	 */
	depositSol(
		owner: PublicKey,
		mint: PublicKey,
		amount: BigNumber,
	): Promise<{
		status: string;
		data: {
			signature: string;
			dcaAccount: import("@solana/web3.js").Keypair;
		};
	}>;
	/**
	 * Intialize dca process
	 */
	initialize(
		owner: PublicKey,
		mint: PublicKey,
		dcaAccount: PublicKey,
		startTime: BigNumber,
		dcaAmount: BigNumber,
		dcaTime: BigNumber,
	): Promise<{
		status: string;
		data: {
			signature: string;
		};
	}>;
	/**
	 * Withdraw non-native token from vault
	 */
	withdrawToken(
		owner: PublicKey,
		mint: PublicKey,
		dcaAccount: PublicKey,
		amount: BigNumber,
	): Promise<{
		status: string;
		data: {
			signature: string;
		};
	}>;
	/**
	 * Withdraw native token from vault
	 */
	withdrawSol(
		owner: PublicKey,
		mint: PublicKey,
		dcaAccount: PublicKey,
		amount: BigNumber,
	): Promise<{
		status: string;
		data: {
			signature: string;
		};
	}>;
	/**
	 * Swap token from sol
	 */
	swapFromSol(
		owner: PublicKey,
		mint: PublicKey,
		dcaAccount: PublicKey,
	): Promise<{
		status: string;
		data: {
			signature: string;
		};
	}>;
	/**
	 * Swap Token to Sol
	 */
	swapToSol(
		owner: PublicKey,
		mint: PublicKey,
		dcaAccount: PublicKey,
	): Promise<{
		status: string;
		data: {
			signature: string;
		};
	}>;
	/**
	 * Fund non-native token to existing vault
	 */
	fundToken(
		owner: PublicKey,
		mint: PublicKey,
		dcaAccount: PublicKey,
		amount: BigNumber,
	): Promise<{
		status: string;
		data: {
			signature: string;
		};
	}>;
	/**
	 * Fund native token to existing vault
	 */
	fundSol(
		owner: PublicKey,
		mint: PublicKey,
		dcaAccount: PublicKey,
		amount: BigNumber,
	): Promise<{
		status: string;
		data: {
			signature: Promise<string>;
		};
	}>;
}
