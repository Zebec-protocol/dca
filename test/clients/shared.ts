import base58 from "bs58";
import * as dotenv from "dotenv";

import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";

dotenv.config();

const secretKeyString = process.env.SECRET;
if (!secretKeyString)
	throw new Error("Could not load env var. Try adding .env file at root dir with var SECRET=<secret key>");

export const ownerKeypair = Keypair.fromSecretKey(base58.decode(secretKeyString));

export const connection = new Connection(clusterApiUrl("mainnet-beta"));

export const DEVNET_BASEMINT = new PublicKey("BEcGFQK1T1tSu3kvHC17cyCkQ5dvXqAJ7ExB2bb5Do7a");
export const DEVNET_QUOTEMINT = new PublicKey("FSRvxBNrQWX2Fy2qvKMLL3ryEdRtE3PUTZBcdKwASZTU");
export const WSOL_MINT = new PublicKey("So11111111111111111111111111111111111111112");
export const DEVNET_QUOTEMINT1 = new PublicKey("8FRFC6MoGGkMFQwngccyu69VnYbzykGeez7ignHVAFSN");

// RAY
export const RAY_MINT = new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R");
export const dcaAccountA = new PublicKey("Hefrv6CqZr6EGq2Axkn89gbfxSnntkLeupgSBNhDdZn6");
export const dcaAccountB = new PublicKey("8TcfxmtsLUjBH1Z82ZHxDuk6aJJ2H3A3hNNid9qTNRSV");
export const dcaAccountC = new PublicKey("7rzx3bXUMS6qeVysLpsiBUhuaXmxgzpdLxeLTuq4DUCi");
// USDC
export const USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
export const dcaAccountD = new PublicKey("BHxXyHLgnpF74WsQ6EmCCW7RiSPmG4xergDhin4yT8Vz");
export const dcaAccountE = new PublicKey("orUXAjqurh3E74HZFZQeTdTDfkMpHjV4pojESc9Fk7R");
export const dcaAccountF = new PublicKey("4amiyFvRLjTPRxZA2UMPx9okSeNWALh9ALMwj9VA9P2R");

export async function sleep(msec: number) {
	return new Promise((resolve) => setTimeout(resolve, msec));
}

export const expectedStatus = "success";
