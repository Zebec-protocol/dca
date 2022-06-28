import BigNumber from "bignumber.js";

import { Commitment, Connection, PublicKey, Signer, Transaction } from "@solana/web3.js";

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
	async depositToken(owner: PublicKey, mint: PublicKey, amount: BigNumber) {
		try {
			const { transaction, dcaAccount } = await this.makeDepositTokenTransaction(owner, mint, amount);

			const signature = await this.sendTransaction(transaction, [this._payer, dcaAccount]);

			return {
				status: "success",
				data: {
					signature: signature,
					dcaAccount: dcaAccount.publicKey,
				},
			};
		} catch (e) {
			throw e;
		}
	}

	/**
	 * Deposit sol in dca vault
	 */
	async depositSol(owner: PublicKey, mint: PublicKey, amount: BigNumber) {
		try {
			const { transaction, dcaAccount } = await this.makeDepositSolTransaction(owner, mint, amount);

			const signature = await this.sendTransaction(transaction, [this._payer, dcaAccount]);

			return {
				status: "success",
				data: {
					signature: signature,
					dcaAccount: dcaAccount.publicKey,
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
		mint: PublicKey,
		dcaAccount: PublicKey,
		startTime: BigNumber,
		dcaAmount: BigNumber,
		dcaTime: BigNumber,
	) {
		try {
			const transaction = await this.makeInitializeTransaction(owner, mint, dcaAccount, startTime, dcaAmount, dcaTime);

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
	 * Withdraw non-native token from vault
	 */
	async withdrawToken(owner: PublicKey, mint: PublicKey, dcaAccount: PublicKey, amount: BigNumber) {
		try {
			const transaction = await this.makeWithdrawTokenTransaction(owner, mint, dcaAccount, amount);

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
	 * Withdraw native token from vault
	 */
	async withdrawSol(owner: PublicKey, mint: PublicKey, dcaAccount: PublicKey, amount: BigNumber) {
		try {
			const transaction = await this.makeWithdrawSolTransaction(owner, mint, dcaAccount, amount);

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
	async swapFromSol(owner: PublicKey, mint: PublicKey, dcaAccount: PublicKey) {
		try {
			const transaction = await this.makeSwapFromSolTransaction(owner, mint, dcaAccount);

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
	 * Swap Token to Sol
	 */
	async swapToSol(owner: PublicKey, mint: PublicKey, dcaAccount: PublicKey) {
		const transaction = await this.makeSwapToSolTransaction(owner, mint, dcaAccount);

		const signature = await this.sendTransaction(transaction, [this._payer]);

		return {
			status: "success",
			data: {
				signature: signature,
			},
		};
	}

	/**
	 * Fund non-native token to existing vault
	 */
	async fundToken(owner: PublicKey, mint: PublicKey, dcaAccount: PublicKey, amount: BigNumber) {
		try {
			const transaction = await this.makeFundTokenTransaction(owner, mint, dcaAccount, amount);

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
	 * Fund native token to existing vault
	 */
	async fundSol(owner: PublicKey, mint: PublicKey, dcaAccount: PublicKey, amount: BigNumber) {
		try {
			const transaction = await this.makeFundSolTransaction(owner, mint, dcaAccount, amount);

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
