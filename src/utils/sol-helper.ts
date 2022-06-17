import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import BN from "bn.js";


const isU64 = (amount: BigNumber) => {
    if (
        amount.isLessThan(new BigNumber(0)) ||
        amount.isGreaterThanOrEqualTo(new BigNumber("18446744073709551615"))
    ) {
        throw new RangeError("Lamports of given amount doesn't fit in unsigned 64-bit integer.");
    }
}

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
 * Convert sol or token amounts to lamports
 * @returns Amount in lamports
 */
export function convertToBigNumber(amount: BN, decimal = 9) {
    const _amount = new BigNumber(amount.toString())
        .multipliedBy(new BigNumber(10 ** decimal));
    isU64(_amount);
    return new BN(_amount.toFixed());
}