import { Cluster, Connection, PublicKey } from "@solana/web3.js";
/** The dca program id. */
export declare const DCA_PROGRAM_ID: PublicKey;
/** Json RPC client to communicate with Solana blockchain. */
export declare const CONNECTION: {
    [cluster in Cluster]: Connection;
};
/** The devnet raydium liquidity pool program v4 id. */
export declare const DEVNET_LIQUIDITY_PROGRAM_ID_V4: PublicKey;
/** The devnet serum market program id. */
export declare const DEVNET_SERUM_PROGRAM_ID_V3: PublicKey;
