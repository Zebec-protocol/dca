import BigNumber from "bignumber.js";
import BN from "bn.js";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function parseBigNumber(amount: number, decimals: number) {
	return new BigNumber(amount).multipliedBy(new BigNumber(decimals));
}

export class Supply extends BN {
	protected _amount: BN;

	constructor(amount: BN) {
		if (amount.isNeg()) throw new Error("Value should not be less than zero");
		super(amount);
		this._amount = amount;
	}

	public get amount() {
		return this._amount;
	}

	public toUiAmount(): string {
		return this._amount.divn(LAMPORTS_PER_SOL).toString();
	}
}
