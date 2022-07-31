import { expect } from "chai";
import { describe, it } from "mocha";

import { LiquidityPoolKeys } from "@raydium-io/raydium-sdk";
import { PublicKey } from "@solana/web3.js";

import { CONNECTION } from "../../src/constants";
import { fetchPoolKeysDevnet, findPoolIdByBaseAndQuoteMintDevnet } from "../../src/utils";
import { DEVNET_BASEMINT, DEVNET_QUOTEMINT } from "../clients/shared";

describe("Raydium utils test devnet", () => {
	const poolId = new PublicKey("HeD1cekRWUNR25dcvW8c9bAHeKbr1r7qKEhv7pEegr4f");

	describe("findPoolIdByBaseAndQuoteMint()", () => {
		it("return pool id as expected", async () => {
			const actual = await findPoolIdByBaseAndQuoteMintDevnet(DEVNET_BASEMINT, DEVNET_QUOTEMINT);

			expect(actual).to.equal(poolId.toString());
		});
	});

	describe("fetchPoolKeys()", () => {
		it("fetch keys associated with pool id", async () => {
			const keys: LiquidityPoolKeys = {
				id: new PublicKey("HeD1cekRWUNR25dcvW8c9bAHeKbr1r7qKEhv7pEegr4f"),
				baseMint: new PublicKey("BEcGFQK1T1tSu3kvHC17cyCkQ5dvXqAJ7ExB2bb5Do7a"),
				quoteMint: new PublicKey("FSRvxBNrQWX2Fy2qvKMLL3ryEdRtE3PUTZBcdKwASZTU"),
				lpMint: new PublicKey("14Wp3dxYTQpRMMz3AW7f2XGBTdaBrf1qb2NKjAN3Tb13"),
				version: 4,
				programId: new PublicKey("9rpQHSyFVM1dkkHFQ2TtTzPEW7DVmEyPmN8wVniqJtuC"),
				authority: new PublicKey("DhVpojXMTbZMuTaCgiiaFU7U8GvEEhnYo4G9BUdiEYGh"),
				openOrders: new PublicKey("HboQAt9BXyejnh6SzdDNTx4WELMtRRPCr7pRSLpAW7Eq"),
				targetOrders: new PublicKey("6TzAjFPVZVMjbET8vUSk35J9U2dEWFCrnbHogsejRE5h"),
				baseVault: new PublicKey("3qbeXHwh9Sz4zabJxbxvYGJc57DZHrFgYMCWnaeNJENT"),
				quoteVault: new PublicKey("FrGPG5D4JZVF5ger7xSChFVFL8M9kACJckzyCz8tVowz"),
				withdrawQueue: new PublicKey("DD9nUbJoUbuE3FampcJeLfDPb5zKGvR7Ho7HE5rpcBGx"),
				lpVault: new PublicKey("249BW2tWhsvwEFtWabpTXXX17Vh7NQSeHS4W7Ku6b27R"),
				marketVersion: 3,
				marketProgramId: new PublicKey("DESVgJVGajEgKGXhb6XmqDHGz3VjdgP7rEVESBgxmroY"),
				marketId: new PublicKey("3tsrPhKrWHWMB8RiPaqNxJ8GnBhZnDqL4wcu5EAMFeBe"),
				marketAuthority: new PublicKey("C2fDkZJqHH5PXyQ7UWBNZsmu6vDXxrEbb9Ex9KF7XsAE"),
				marketBaseVault: new PublicKey("E1E5kQqWXkXbaqVzpY5P2EQUSi8PNAHdCnqsj3mPWSjG"),
				marketQuoteVault: new PublicKey("3sj6Dsw8fr8MseXpCnvuCSczR8mQjCWNyWDC5cAfEuTq"),
				marketBids: new PublicKey("ANHHchetdZVZBuwKWgz8RSfVgCDsRpW9i2BNWrmG9Jh9"),
				marketAsks: new PublicKey("ESSri17GNbVttqrp7hrjuXtxuTcCqytnrMkEqr29gMGr"),
				marketEventQueue: new PublicKey("FGAW7QqNJGFyhakh5jPzGowSb8UqcSJ95ZmySeBgmVwt"),
			};

			const actual = await fetchPoolKeysDevnet(CONNECTION["devnet"], poolId);

			expect(actual).deep.equal(keys);
		});
	});
});
