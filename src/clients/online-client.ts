import BN from "bn.js";

import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { Commitment, Connection, PublicKey, Signer, Transaction } from "@solana/web3.js";

import { Amount, MintAmount } from "../models";
import { DcaClient, IWalletAdapter } from "./base";

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
			txn.feePayer = this._wallet.publicKey;
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
	async depositToken(owner: PublicKey, mint: PublicKey, amount: Amount | MintAmount) {
		try {
			const { transaction } = await this.makeDepositTokenTransaction(owner, mint, amount);

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

			const signature = await this.signAndSendTransaction(transaction, [dcaAccount]);

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
	async swap(owner: PublicKey, tokenMintFrom: PublicKey, tokenMintTo: PublicKey, dcaAccount: PublicKey) {
		try {
			const { transaction } = await this.makeSwapTransaction(owner, tokenMintFrom, tokenMintTo, dcaAccount);

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
