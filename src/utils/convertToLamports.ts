import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import BN from "bn.js";


/** 
 * Convert sol or token amounts to lamports
 * @returns Amount in lamports
 */
export function convertToLamports(amount: BigNumber, decimal = 9) {
    const _amount = amount.multipliedBy(new BigNumber(10 ** decimal));
    if (
        amount.isLessThanOrEqualTo(new BigNumber(0)) ||
        _amount.isGreaterThan(new BigNumber("18446744073709551615"))
    ) {
        throw new RangeError("Lamports of given amount doesn't fit in unsigned 64-bit integer.");
    }
    return new BN(_amount.toFixed());
}