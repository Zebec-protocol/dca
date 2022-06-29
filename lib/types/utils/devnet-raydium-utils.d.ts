import { GetMultipleAccountsInfoConfig } from "@raydium-io/raydium-sdk";
import { Connection, PublicKey } from "@solana/web3.js";
export declare function fetchAllPoolKeysDevnet(
	connection: Connection,
	config: GetMultipleAccountsInfoConfig,
): Promise<
	{
		marketBaseVault: PublicKey;
		marketQuoteVault: PublicKey;
		marketBids: PublicKey;
		marketAsks: PublicKey;
		marketEventQueue: PublicKey;
		id: PublicKey;
		baseMint: PublicKey;
		quoteMint: PublicKey;
		lpMint: PublicKey;
		version: number;
		programId: PublicKey;
		authority: PublicKey;
		openOrders: PublicKey;
		targetOrders: PublicKey;
		baseVault: PublicKey;
		quoteVault: PublicKey;
		withdrawQueue: PublicKey;
		lpVault: PublicKey;
		marketVersion: number;
		marketProgramId: PublicKey;
		marketId: PublicKey;
		marketAuthority: PublicKey;
	}[]
>;
export declare function fetchPoolKeysDevnet(
	connection: Connection,
	poolId: PublicKey,
	version?: number,
): Promise<{
	marketBaseVault: PublicKey;
	marketQuoteVault: PublicKey;
	marketBids: PublicKey;
	marketAsks: PublicKey;
	marketEventQueue: PublicKey;
	id: PublicKey;
	baseMint: PublicKey;
	quoteMint: PublicKey;
	lpMint: PublicKey;
	version: number;
	programId: PublicKey;
	authority: PublicKey;
	openOrders: PublicKey;
	targetOrders: PublicKey;
	baseVault: PublicKey;
	quoteVault: PublicKey;
	withdrawQueue: PublicKey;
	lpVault: PublicKey;
	marketVersion: number;
	marketProgramId: PublicKey;
	marketId: PublicKey;
	marketAuthority: PublicKey;
}>;
