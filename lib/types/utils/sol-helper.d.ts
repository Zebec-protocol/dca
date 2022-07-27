import BN from "bn.js";
/**
 * Convert sol or token amounts to lamports
 * @returns Amount in lamports
 */
export declare function convertToLamports(amount: number, decimals?: number): BN;
/**
 * Convert lamports to decimal
 * @returns Amount in lamports
 */
export declare function convertToDecimal(amount: BN, decimal?: number): number;
