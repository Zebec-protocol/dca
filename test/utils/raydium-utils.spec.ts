import { LiquidityPoolKeys } from "@raydium-io/raydium-sdk";
import { PublicKey } from "@solana/web3.js"
import { expect } from "chai"
import { connection } from "../../src/constants";
import { fetchPoolKeys, findPoolIdByBaseAndQuoteMint } from "../../src/utils"

describe("Raydium utils test", () => {
    const poolId = new PublicKey("13uCPybNakXHGVd2DDVB7o2uwXuf9GqPFkvJMVgKy6UJ");

    describe("findPoolIdByBaseAndQuoteMint()", () => {
        it("return pool id as expected", async () => {
            const baseMint = new PublicKey("HfYFjMKNZygfMC8LsQ8LtpPsPxEJoXJx4M6tqi75Hajo");
            const quoteMint = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

            const actual = await findPoolIdByBaseAndQuoteMint(baseMint, quoteMint);

            expect(actual).to.equal(poolId.toString());
        })
    })

    describe("fetchPoolKeys()", () => {
        it("fetch keys associated with pool id", async () => {
            const keys: LiquidityPoolKeys = {
                id: new PublicKey("13uCPybNakXHGVd2DDVB7o2uwXuf9GqPFkvJMVgKy6UJ"),
                baseMint: new PublicKey("HfYFjMKNZygfMC8LsQ8LtpPsPxEJoXJx4M6tqi75Hajo"),
                quoteMint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
                lpMint: new PublicKey("HjR23bxn2gtRDB2P1Tm3DLepAPPZgazsWJpLG9wqjnYR"),
                version: 4,
                programId: new PublicKey("675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"),
                authority: new PublicKey("5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1"),
                openOrders: new PublicKey("E6wZo9uiPf156g9jG5ZWX3s23hM3jcicHiNjMg9NTvo3"),
                targetOrders: new PublicKey("HnX2KEKgXfPbHoFCSfZydDDYm51DwdkXcibWP9o6sP9Z"),
                baseVault: new PublicKey("2rgPoyabSPeYoMiACSp9UcqG9WEBhDdXDmGQ4XRoBeo7"),
                quoteVault: new PublicKey("CzynpjFdoLekUGMPRNT6un5ieg6YQyT4WmJFKngoZHJY"),
                withdrawQueue: new PublicKey("AwYLatzaiaRG1JBQYevogqG6VhX3xfF93FHt4T5FtQgy"),
                lpVault: new PublicKey("4ACwuir8yUrYQLmFDX6Lsq8BozEizKCVdRduYuUyR4zr"),
                marketVersion: 3,
                marketProgramId: new PublicKey("9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin"),
                marketId: new PublicKey("CDYafmdHXtfZadhuXYiR7QaqmK9Ffgk2TA8otUWj9SWz"),
                marketAuthority: new PublicKey("GiVPfzeddXAbneSZWZ1XrNAZvB7XhNFbJtck7skN6xBE"),
                marketBaseVault: new PublicKey("2CAabztdescZCLyTmUAvRUxi3CZDgtFPx4WFrUmXEz8H"),
                marketQuoteVault: new PublicKey("nkMvRrq8ove9AMBJ65jPSsnd3RS7kvTTh5L3jN93uNu"),
                marketBids: new PublicKey("A3LCjzPEE9reQhKRED1TBGBG9ksL45rhLxh4fRzThWXJ"),
                marketAsks: new PublicKey("53krdJQgxmTaJgBPQ1Kc7SKLEEosvYs2uDYodQd9Lcqf"),
                marketEventQueue: new PublicKey("224GEWPVsY5fjn3JqqkxC7jW2oasosipvWSZCFrpbiDm"),
            }

            const actual = await fetchPoolKeys(connection, poolId);

            expect(actual).deep.equal(keys);
        })
    })
})