import BigNumber from "bignumber.js";

import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import {
	Commitment,
	Connection,
	PublicKey,
	Signer,
	Transaction,
} from "@solana/web3.js";

import { DcaFlag } from "../models";
import {
	DcaClient,
	IWalletAdapter,
} from "./base";

export class DcaOnlineClient extends DcaClient {
	private _wallet: IWalletAdapter;
	constructor(params: {
		wallet: IWalletAdapter;
		connection: Connection;
		commitment: Commitment;
		preflightCommitment: Commitment;
	}) {
		super({
			connection: params.connection,
			commitment: params.commitment,
			preflightCommitment: params.preflightCommitment,
		});
		this._wallet = params.wallet;
	}

	private async signAndSendTransaction(txn: Transaction, signers?: Signer[]): Promise<string> {
		try {
			if (!this._wallet.publicKey) {
				throw new WalletNotConnectedError("No wallet is connected.");
			}
			const blockhash = await this._connection.getLatestBlockhash();
			txn.recentBlockhash = blockhash.blockhash;
			txn.lastValidBlockHeight = blockhash.lastValidBlockHeight;
			if (signers) {
				txn.partialSign(...signers);
			}
			const signedTxn = await this._wallet.signTransaction(txn);
			const signature = await this._connection.sendRawTransaction(signedTxn.serialize(), {
				preflightCommitment: this._preflightCommitment,
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

			const signature = await this.signAndSendTransaction(transaction, [dcaAccount]);

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

			const signature = await this.signAndSendTransaction(transaction, [dcaAccount]);

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
		flag: DcaFlag,
		startTime: BigNumber,
		dcaAmount: BigNumber,
		dcaTime: BigNumber,
	) {
		try {
			const transaction = await this.makeInitializeTransaction(
				owner,
				mint,
				dcaAccount,
				flag,
				startTime,
				dcaAmount,
				dcaTime,
			);

			const signature = await this.signAndSendTransaction(transaction);

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

			const signature = await this.signAndSendTransaction(transaction);

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

			const signature = await this.signAndSendTransaction(transaction);

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

			const signature = await this.signAndSendTransaction(transaction);

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

		const signature = await this.signAndSendTransaction(transaction);

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

			const signature = await this.signAndSendTransaction(transaction);

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

			const signature = await this.signAndSendTransaction(transaction);

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
