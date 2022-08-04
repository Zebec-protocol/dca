import BigNumber from "bignumber.js";
import BN from "bn.js";

export const MAX_U64_LIMITS = "18446744073709551615";

export const isU64 = (amount: BigNumber) => {
	if (amount.isNegative() || amount.isGreaterThan(new BigNumber(MAX_U64_LIMITS))) {
		return false;
	}
	return true;
};

export interface AmountInitParam {
	amount: number;
	decimals?: number;
}

export class Amount extends BigNumber {
	private _amount: BigNumber;
	private _decimals: number;

	constructor({ amount, decimals = 9 }: AmountInitParam) {
		const initial = new BigNumber(amount).multipliedBy(new BigNumber(10).pow(decimals));

		if (!isU64(initial)) {
			throw new Error("Parsing given inputs returns value out of u64 range");
		}
		super(initial);
		this._amount = initial;
		this._decimals = decimals;
	}

	public get amount() {
		return this._amount;
	}

	public get decimals() {
		return this._decimals;
	}

	public toUiAmount(): string {
		return this._amount.dividedBy(new BigNumber(10).pow(new BigNumber(this._decimals))).toFixed();
	}

	public toBN(): BN {
		return new BN(this._amount.toFixed());
	}

	public static fromBN(value: BN, decimals: number = 9) {
		const bigNum = new BigNumber(value.toString());
		if (!isU64(bigNum)) {
			throw new Error("Parsing given inputs returns value out of u64 range");
		}
		const amount = bigNum.dividedBy(new BigNumber(10).pow(decimals)).toNumber();
		return new Amount({ amount, decimals });
	}
}
