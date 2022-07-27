import { PublicKey } from "@solana/web3.js";

export class Mint {
	private _address: PublicKey;
	private _decimals: number;
	static WSOL = new PublicKey("So11111111111111111111111111111111111111112");

	constructor(address: PublicKey, decimals = 9) {
		this._address = address;
		this._decimals = decimals;
	}

	public get address() {
		return this._address;
	}

	public get decimals() {
		return this._decimals;
	}

	static isWSol(address: PublicKey) {
		return address.equals(this.WSOL);
	}
}
