import { expect } from "chai";
import { describe, it } from "mocha";

import { LiquidityPoolKeys } from "@raydium-io/raydium-sdk";
import { PublicKey } from "@solana/web3.js";

import { CONNECTION } from "../../src/constants";
import { fetchPoolKeysDevnet, findPoolIdByBaseAndQuoteMintDevnet } from "../../src/utils";
import { DEVNET_BASEMINT, DEVNET_QUOTEMINT } from "../clients/shared";

describe("Raydium utils test devnet", () => {
	const poolId = new PublicKey("ELSGBb45rAQNsMTVzwjUqL8vBophWhPn4rNbqwxenmqY");

	describe("findPoolIdByBaseAndQuoteMint()", () => {
		it("return pool id as expected", async () => {
			const actual = await findPoolIdByBaseAndQuoteMintDevnet(DEVNET_BASEMINT, DEVNET_QUOTEMINT);

			expect(actual).to.equal(poolId.toString());
		});
	});

	describe("fetchPoolKeys()", () => {
		it("fetch keys associated with pool id", async () => {
			const keys: LiquidityPoolKeys = {
				id: new PublicKey("ELSGBb45rAQNsMTVzwjUqL8vBophWhPn4rNbqwxenmqY"),
				baseMint: new PublicKey("BEcGFQK1T1tSu3kvHC17cyCkQ5dvXqAJ7ExB2bb5Do7a"),
				quoteMint: new PublicKey("FSRvxBNrQWX2Fy2qvKMLL3ryEdRtE3PUTZBcdKwASZTU"),
				lpMint: new PublicKey("2uv1kymqqTkxk5KtzYXEpMzr2Ek9CKpuK71RdKjVsFd6"),
				version: 4,
				programId: new PublicKey("9rpQHSyFVM1dkkHFQ2TtTzPEW7DVmEyPmN8wVniqJtuC"),
				authority: new PublicKey("DhVpojXMTbZMuTaCgiiaFU7U8GvEEhnYo4G9BUdiEYGh"),
				openOrders: new PublicKey("EH79tk431iKcWJuNHBxyvsrHfWwxiHPcXHN4ytZvxBc8"),
				targetOrders: new PublicKey("7A9QfQpvpL7YR3Em2E13zL3ccXfpBKNyKhPKk6Ayjtbd"),
				baseVault: new PublicKey("EuWHNHLwegpgzhWMkk9pCBgmrabHCGpxA2UzZTKMxKps"),
				quoteVault: new PublicKey("BMP1W9bzHVPMSKFDcs5KmoWcPVZKSg3YLLZVN8Deodoq"),
				withdrawQueue: new PublicKey("2FeGP8KRAYDJ1i4mo69hRv4JUvhP37yjMR2SWYhE7e5P"),
				lpVault: new PublicKey("FWyoBUWZhMXVbbEqngZUTEiWBqAWMKh9y2XvzsiZka2j"),
				marketVersion: 3,
				marketProgramId: new PublicKey("DESVgJVGajEgKGXhb6XmqDHGz3VjdgP7rEVESBgxmroY"),
				marketId: new PublicKey("9zb9brZMMAgqCRYrzBFCc34TLRg7dMAHRXBgEZgbQq1X"),
				marketAuthority: new PublicKey("DNF6vz7MreXLMYeCxnY2eoqVnhXnVqnp42TVWWCwC5JM"),
				marketBaseVault: new PublicKey("EEzrNAZrfAYMESNuEHUbE1dcVdQNgSZq9SbHwXWS9FLb"),
				marketQuoteVault: new PublicKey("BVk3kFPvNHh3gPuny7owRnTBcvCGJXnF3trYXFDDmwpd"),
				marketBids: new PublicKey("5jHNKiXg2rjf6rc24V2EaCVJ7gywcZGRSXjvNbXZH6Fd"),
				marketAsks: new PublicKey("E13MU8FzLxYkx39WbZiWZBDUBnjwwJs6mdY6tEuQhiAj"),
				marketEventQueue: new PublicKey("5upvAqnYi8Bo8SJYgfqChvepfr1JRZm63p1jTXgomu6n"),
			};

			const actual = await fetchPoolKeysDevnet(CONNECTION["devnet"], poolId);

			expect(actual).deep.equal(keys);
		});
	});
});
