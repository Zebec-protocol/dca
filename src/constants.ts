import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";

/** The dca program id. */
export const DCA_PROGRAM_ID = new PublicKey("89U3HCacYnqJYUX33EupQRyKLBAqA9vb6tzAATRp19c7");

/** Json RPC client to communicate with Solana blockchain. */
export const connection = new Connection(clusterApiUrl("devnet"));

/** The devnet raydium liquidity pool program v4 id. */
export const DEVNET_LIQUIDITY_PROGRAM_ID_V4 = new PublicKey("9rpQHSyFVM1dkkHFQ2TtTzPEW7DVmEyPmN8wVniqJtuC");

/** The devnet serum market program id. */
export const DEVNET_SERUM_PROGRAM_ID_V3 = new PublicKey("DESVgJVGajEgKGXhb6XmqDHGz3VjdgP7rEVESBgxmroY");
