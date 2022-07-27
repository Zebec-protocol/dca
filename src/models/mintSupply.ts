import BN from "bn.js";

import { Mint } from "./mint";
import { Supply } from "./supply";

export class MintSupply extends Supply {
	private _mint: Mint;

	constructor(mint: Mint, amount: BN) {
		super(amount);
		this._mint = mint;
	}

	public get mint() {
		return this._mint;
	}

	public toUiAmount(): string {
		return this._amount.divn(10 ** this._mint.decimals).toString();
	}
}
