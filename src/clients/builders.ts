import { clusterApiUrl, Commitment, Connection, Keypair } from "@solana/web3.js";

import { IWalletAdapter } from "./base";
import { DcaOfflineClient } from "./offline-client";
import { DcaOnlineClient } from "./online-client";

export class DcaClientFactory {
	private _connection: Connection;
	private _commitment: Commitment;
	private _preflightCommitment: Commitment;

	constructor() {
		this._connection = new Connection(clusterApiUrl("mainnet-beta"));
		this._commitment = "finalized";
		this._preflightCommitment = "finalized";
	}

	setConnection(connection: Connection) {
		this._connection = connection;
		return this;
	}

	setPreflightCommitment(preflightCommitment: Commitment) {
		this._preflightCommitment = preflightCommitment;
		return this;
	}

	setCommitment(commitment: Commitment) {
		this._commitment = commitment;
		return this;
	}

	buildOnlineClient(adapter: IWalletAdapter) {
		return new DcaOnlineClient({
			connection: this._connection,
			commitment: this._commitment,
			preflightCommitment: this._preflightCommitment,
			wallet: adapter,
		});
	}

	buildPayerClient(payer: Keypair) {
		return new DcaOfflineClient({
			connection: this._connection,
			commitment: this._commitment,
			preflightCommitment: this._preflightCommitment,
			payer: payer,
		});
	}
}
