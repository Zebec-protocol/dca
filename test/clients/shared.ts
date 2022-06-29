import base58 from "bs58";
import * as dotenv from "dotenv";

import { Keypair, PublicKey } from "@solana/web3.js";

dotenv.config();

const secretKeyString = process.env.SECRET;
if (!secretKeyString)
	throw new Error("Could not load env var. Try adding .env file at root dir with var SECRET=<secret key>");

export const ownerKeypair = Keypair.fromSecretKey(base58.decode(secretKeyString));

// RAY
export const MINT1 = new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R");

// USDC
export const MINT2 = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

export const nowInSec = () => Math.floor(Date.now() / 1000);

export async function sleep(msec: number) {
	return new Promise((resolve) => setTimeout(resolve, msec));
}

export const expectedStatus = "success";
