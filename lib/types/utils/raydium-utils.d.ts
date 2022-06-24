import { LiquidityPoolKeys } from "@raydium-io/raydium-sdk";
import { Connection, PublicKey } from "@solana/web3.js";
/**
 * Fetch all keys in a raydium liquidity pool id
 */
export declare function fetchPoolKeys(
	connection: Connection,
	poolId: PublicKey,
	version?: number,
): Promise<LiquidityPoolKeys>;
export declare function findPoolIdByBaseAndQuoteMint(base: PublicKey, quote: PublicKey): Promise<string>;
