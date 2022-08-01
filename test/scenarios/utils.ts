import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, GetProgramAccountsFilter, PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";

export const delay = async (ms: number): Promise<unknown> => {
	const delay = new Promise((resolve) => setTimeout(resolve, ms));
	return delay;
};

export const getBalanceOfSplToken = async (splTokenAddress: PublicKey, wallet: PublicKey, connection: Connection) => {
	const filters: GetProgramAccountsFilter[] = [
		{
			dataSize: 165, //size of account (bytes)
		},
		{
			memcmp: {
				offset: 32, //location of our query in the account (bytes)
				bytes: wallet.toString(),
			},
		},
	];
	const accounts = await connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, {
		filters: filters,
	});
	await delay(2000);
	let tokenBalance = 0;
	accounts.forEach((account, _) => {
		const parsedAccountInfo: any = account.account.data;
		const mintAddress: string = parsedAccountInfo["parsed"]["info"]["mint"];
		if (splTokenAddress.toString() == mintAddress) {
			tokenBalance = parsedAccountInfo["parsed"]["info"]["tokenAmount"]["amount"];
			return;
		}
	});
	return new BN(tokenBalance);
};

export async function getNativeTokenBalance(address: PublicKey, connection: Connection) {
	let tokenBalance = await connection.getBalance(address);
	return new BN(tokenBalance);
}
