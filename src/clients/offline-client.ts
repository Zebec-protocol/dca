import BN from "bn.js";

import { Commitment, Connection, PublicKey, Signer, Transaction } from "@solana/web3.js";

import { Amount, MintAmount } from "../models";
import { DcaClient } from "./base";

export class DcaOfflineClient extends DcaClient {
	private _payer: Signer;

	constructor(params: {
		connection: Connection;
		commitment: Commitment;
		preflightCommitment: Commitment;
		payer: Signer;
	}) {
		super({
			connection: params.connection,
			commitment: params.commitment,
			preflightCommitment: params.preflightCommitment,
		});
		this._payer = params.payer;
	}

	private async sendTransaction(txn: Transaction, signers: Signer[]): Promise<string> {
		try {
			const blockhash = await this._connection.getLatestBlockhash();
			txn.recentBlockhash = blockhash.blockhash;
			txn.lastValidBlockHeight = blockhash.lastValidBlockHeight;
			txn.feePayer = this._payer.publicKey;

			const signature = await this._connection.sendTransaction(txn, signers, {
				preflightCommitment: this._commitment,
				skipPreflight: false,
			});
			await this._connection.confirmTransaction(
				{
					blockhash: blockhash.blockhash,
					lastValidBlockHeight: blockhash.lastValidBlockHeight,
					signature: signature,
				},
				this._commitment,
			);
			return signature;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Deposit non-native token in dca program vault
	 */
	async depositToken(owner: PublicKey, mint: PublicKey, amount: Amount | MintAmount) {
		try {
			const { transaction } = await this.makeDepositTokenTransaction(owner, mint, amount);

			const signature = await this.sendTransaction(transaction, [this._payer]);

			return {
				status: "success",
				data: {
					signature: signature,
				},
			};
		} catch (e) {
			throw e;
		}
	}

	/**
	 * Intialize dca process
	 */
	async initialize(
		owner: PublicKey,
		tokenMintFrom: PublicKey,
		tokenMintTo: PublicKey,
		startTime: BN,
		dcaAmount: Amount | MintAmount,
		frequency: BN,
	) {
		try {
			const { transaction, dcaAccount, request } = await this.makeInitializeTransaction(
				owner,
				tokenMintFrom,
				tokenMintTo,
				startTime,
				dcaAmount,
				frequency,
			);

			const signature = await this.sendTransaction(transaction, [this._payer, dcaAccount]);

			return {
				status: "success",
				data: {
					signature: signature,
					dcaAccount: dcaAccount.publicKey,
					request,
				},
			};
		} catch (e) {
			throw e;
		}
	}

	/**
	 * Withdraw non-native token from vault
	 */
	async withdrawToken(owner: PublicKey, mint: PublicKey, amount: Amount | MintAmount) {
		try {
			const { transaction } = await this.makeWithdrawTokenTransaction(owner, mint, amount);

			const signature = await this.sendTransaction(transaction, [this._payer]);

			return {
				status: "success",
				data: {
					signature: signature,
				},
			};
		} catch (e) {
			throw e;
		}
	}

	/**
	 * Swap token from sol
	 */
	async swap(owner: PublicKey, tokenMintFrom: PublicKey, tokenMintTo: PublicKey, dcaAccount: PublicKey) {
		try {
			const { transaction } = await this.makeSwapTransaction(owner, tokenMintFrom, tokenMintTo, dcaAccount);

			const signature = await this.sendTransaction(transaction, [this._payer]);

			return {
				status: "success",
				data: {
					signature: signature,
				},
			};
		} catch (e) {
			throw e;
		}
	}
}
