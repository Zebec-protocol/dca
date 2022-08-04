import BN from "bn.js";
import { deserializeUnchecked } from "borsh";

import {
	Commitment,
	Connection,
	PublicKey,
} from "@solana/web3.js";

import { DCA_PROGRAM_ID } from "../constants";

/**
 * The class for the dca account state in DCA program
 */
export class DcaAccount {
	private _authority: PublicKey;
	private _mintAddressFrom: PublicKey;
	private _mintAddressTo: PublicKey;
	private _startTime: BN;
	private _dcaAmount: BN;
	private _frequency: BN;
	private _state: boolean;

	constructor(param: {
		authority: Uint8Array;
		mintAddressFrom: Uint8Array;
		mintAddressTo: Uint8Array;
		startTime: BN;
		dcaAmount: BN;
		frequency: BN;
		state: number;
	}) {
		this._authority = new PublicKey(param.authority);
		this._mintAddressFrom = new PublicKey(param.mintAddressFrom);
		this._mintAddressTo = new PublicKey(param.mintAddressTo);
		this._startTime = param.startTime;
		this._dcaAmount = param.dcaAmount;
		this._frequency = param.frequency;
		this._state = param.state === 1;
	}

	/**
	 * The address of authority who deposit and initiates the dca process.
	 */
	public get authority(): PublicKey {
		return this._authority;
	}

	/**
	 * The token mint address which is used to swap from or to sol (native mint).
	 */
	public get mintAddressFrom(): PublicKey {
		return this._mintAddressFrom;
	}

	/**
	 * The token mint address which is used to swap from or to sol (native mint).
	 */
	public get mintAddressTo(): PublicKey {
		return this._mintAddressTo;
	}

	/**
	 * The unix timestamp from which the last swap is performed.
	 */
	public get startTime(): BN {
		return this._startTime;
	}

	/**
	 * The amount of currency or token to be used for the swap from the total amount at a time.
	 */
	public get dcaAmount(): BN {
		return this._dcaAmount;
	}

	/**
	 * The time interval or span between to consecutive swap process. The value should be in seconds.
	 */
	public get frequency(): BN {
		return this._frequency;
	}

	/**
	 * The state signifies whether the dca process has been initialized or not.
	 */
	public get state(): boolean {
		return this._state;
	}

	/**
	 * Decode buffer data to DcaAccount Object
	 */
	static decodeUnchecked(data: Buffer) {
		return deserializeUnchecked(dcaAccountSchema, this, data);
	}

	/**
	 * Get Dca account info of given address
	 */
	static async getDcaAccountInfo(
		connection: Connection,
		address: PublicKey,
		commitment?: Commitment,
		programId = DCA_PROGRAM_ID,
	) {
		const info = await connection.getAccountInfo(address, commitment);
		if (!info) throw new Error("Dca Account not found.");
		if (!info.owner.equals(programId)) throw new Error("Account is not owned by Dca Program.");
		const dcaAcount = this.decodeUnchecked(info.data);
		return dcaAcount;
	}
}

const dcaAccountSchema = new Map([
	[
		DcaAccount,
		{
			kind: "struct",
			fields: [
				["authority", [32]],
				["mintAddressFrom", [32]],
				["mintAddressTo", [32]],
				["startTime", "u64"],
				["dcaAmount", "u64"],
				["frequency", "u64"],
				["state", "u8"],
			],
		},
	],
]);
