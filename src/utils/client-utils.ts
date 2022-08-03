import { Connection } from "@solana/web3.js";
import { BN } from "bn.js";

export const getClusterTime = async (connection: Connection) => {
	const currentSlot = await connection.getSlot();
	const blockTime = (await connection.getBlockTime(currentSlot)) as number;
	return new BN(blockTime);
};

export const nowInSec = () => Math.floor(Date.now() / 1000);
