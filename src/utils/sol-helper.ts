import BigNumber from 'bignumber.js';
import BN from 'bn.js';

const isU64 = (amount: BigNumber) => {
  if (
    amount.isLessThan(new BigNumber(0)) ||
    amount.isGreaterThanOrEqualTo(new BigNumber("18446744073709551615"))
  ) {
    throw new RangeError("The amount doesn't fit in unsigned 64-bit integer.");
  }
};

/**
 * Convert sol or token amounts to lamports
 * @returns Amount in lamports
 */
export function convertToLamports(amount: BigNumber, decimal = 9) {
  const _amount = amount.multipliedBy(new BigNumber(10 ** decimal));
  isU64(_amount);
  return new BN(_amount.toFixed());
}

/**
 * Convert lamports to decimal
 * @returns Amount in lamports
 */
export function convertToDecimal(amount: BN, decimal = 9) {
  const _amount = new BigNumber(amount.toString());
  isU64(_amount);
  return _amount.dividedBy(new BigNumber(10 ** decimal));
}
