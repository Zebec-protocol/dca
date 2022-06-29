import { expect } from "chai";
import { describe, it } from "mocha";

import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

import { getMintInfo } from "../../src/utils";

describe("tokenUtils unit test", () => {
	describe("getMintInfo()", () => {
		it("gets expected mint authority and decimals", async () => {
			const expectedMintAuthority = new PublicKey("2wmVCSfPxGPjrnMMn7rchp4uaeoTqN39mXFC2zhPdri9");
			const expectedDecimal = 6;

			const reality = await getMintInfo(
				new Connection(clusterApiUrl("mainnet-beta")),
				new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
			);
			expect(reality.mintAuthority).to.deep.equal(expectedMintAuthority);
			expect(reality.decimals).to.equal(expectedDecimal);
		});
	});
});
