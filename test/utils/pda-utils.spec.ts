import { PublicKey } from "@solana/web3.js";
import { expect } from "chai";
import { findProgramAddress, findAssociatedTokenAddress } from "../../src/utils";

describe("pda utils unit test", () => {
	describe("findProgramAddress()", () => {
		it("generates public key and a bump seed", async () => {
			const pubkey1 = new PublicKey("8wFNccoRA12vLJ2JcRSc4PXFnYjUCGsVRkUGFUYBDk3P");
			const pubkey2 = new PublicKey("AqP5WP8QzYy1YV6gEwACevuBNZJv7SbaW3vsb3mupH6a");
			const expectation = new PublicKey("31kuJfEmfkEgPWxhQACUnfj2MYvg3GGcLwVD5vnmP5nU");
			const [actualPubKey, actualBump] = await findProgramAddress([pubkey1.toBuffer(), pubkey2.toBuffer()]);
			expect(actualPubKey).to.instanceOf(PublicKey);
			expect(actualPubKey).to.deep.equal(expectation);
			expect(actualBump).to.be.a("number");
		});
	});

	describe("findAssociatedTokenAddress()", () => {
		it("generates associated token program address", async () => {
			const owner = new PublicKey("9sxUjP243VNGmFY8HqmcUTtP4CPHJNQ6LWeM81iJ6nWx");
			const mint = new PublicKey("BEcGFQK1T1tSu3kvHC17cyCkQ5dvXqAJ7ExB2bb5Do7a");
			const expectation = new PublicKey("7cj4Xb2aeixYnG1PbiEtXLB8kyHZma2LfmgZQGRDq7mN");
			const reality = await findAssociatedTokenAddress(owner, mint);
			expect(reality).to.be.instanceOf(PublicKey);
			expect(reality).to.deep.equal(expectation);
		});
	});
});
