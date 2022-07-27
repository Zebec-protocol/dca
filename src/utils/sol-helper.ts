import BigNumber from "bignumber.js";
import BN from "bn.js";

const isU64 = (amount: BN) => {
	if (amount.gt(new BN("18446744073709551615"))) {
		throw new RangeError("The amount is not an unsigned 64-bit integer.");
	}
};

/**
 * Convert sol or token amounts to lamports
 * @returns Amount in lamports
 */
export function convertToLamports(amount: number, decimals = 9) {
	const _amount = new BigNumber(amount).multipliedBy(10 * decimals);
	const bnAmount = new BN(_amount.toFixed());
	isU64(bnAmount);
	return bnAmount;
}

/**
 * Convert lamports to decimal
 * @returns Amount in lamports
 */
export function convertToDecimal(amount: BN, decimal = 9) {
	isU64(amount);
	return amount.divn(10 ** decimal).toNumber();
}
