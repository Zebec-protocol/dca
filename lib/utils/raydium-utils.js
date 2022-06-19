"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPoolIdByBaseAndQuoteMint = exports.fetchPoolKeys = void 0;
const raydium_sdk_1 = require("@raydium-io/raydium-sdk");
const web3_js_1 = require("@solana/web3.js");
const axios_1 = __importDefault(require("axios"));
/**
 * Fetch all keys in a raydium liquidity pool id
 */
async function fetchPoolKeys(connection, poolId, version = 4) {
    // const version = 4
    const serumVersion = 3;
    const marketVersion = 3;
    const programId = raydium_sdk_1.LIQUIDITY_PROGRAM_ID_V4;
    const serumProgramId = raydium_sdk_1.SERUM_PROGRAM_ID_V3;
    const account = await connection.getAccountInfo(poolId);
    const { state: LiquidityStateLayout } = raydium_sdk_1.Liquidity.getLayouts(version);
    //@ts-ignore
    const fields = LiquidityStateLayout.decode(account.data);
    const { status, baseMint, quoteMint, lpMint, openOrders, targetOrders, baseVault, quoteVault, marketId } = fields;
    let withdrawQueue, lpVault;
    if (raydium_sdk_1.Liquidity.isV4(fields)) {
        withdrawQueue = fields.withdrawQueue;
        lpVault = fields.lpVault;
    }
    else {
        withdrawQueue = web3_js_1.PublicKey.default;
        lpVault = web3_js_1.PublicKey.default;
    }
    // uninitialized
    // if (status.isZero()) {
    //   return ;
    // }
    const associatedPoolKeys = await raydium_sdk_1.Liquidity.getAssociatedPoolKeys({
        version,
        baseMint,
        quoteMint,
        marketId,
    });
    const poolKeys = {
        id: poolId,
        baseMint,
        quoteMint,
        lpMint,
        version,
        programId,
        authority: associatedPoolKeys.authority,
        openOrders,
        targetOrders,
        baseVault,
        quoteVault,
        withdrawQueue,
        lpVault,
        marketVersion: serumVersion,
        marketProgramId: serumProgramId,
        marketId,
        marketAuthority: associatedPoolKeys.marketAuthority,
    };
    const marketInfo = await connection.getAccountInfo(marketId);
    const { state: MARKET_STATE_LAYOUT } = raydium_sdk_1.Market.getLayouts(marketVersion);
    // @ts-ignore
    const market = MARKET_STATE_LAYOUT.decode(marketInfo.data);
    const { baseVault: marketBaseVault, quoteVault: marketQuoteVault, bids: marketBids, asks: marketAsks, eventQueue: marketEventQueue, } = market;
    // const poolKeys: LiquidityPoolKeys;
    return {
        ...poolKeys,
        ...{
            marketBaseVault,
            marketQuoteVault,
            marketBids,
            marketAsks,
            marketEventQueue,
        },
    };
}
exports.fetchPoolKeys = fetchPoolKeys;
async function fetchAllPoolKeys() {
    var _a, _b;
    try {
        const response = await axios_1.default.get("https://api.raydium.io/v2/sdk/liquidity/mainnet.json");
        let poolKeysList = [...((_a = response.data.official) !== null && _a !== void 0 ? _a : []), ...((_b = response.data.unOfficial) !== null && _b !== void 0 ? _b : [])];
        if (poolKeysList.length === 0)
            throw new Error("Error in retreiving liquidity pool keys");
        return poolKeysList;
    }
    catch (err) {
        throw err;
    }
}
async function findPoolIdByBaseAndQuoteMint(base, quote) {
    try {
        const poolKeysList = await fetchAllPoolKeys();
        const keys = poolKeysList.find(el => el.baseMint.toString() == base.toString() &&
            el.quoteMint.toString() == quote.toString());
        if (!keys)
            throw new Error("No liquidity pool found for given base and quote mint.");
        return keys.id.toString();
    }
    catch (err) {
        throw err;
    }
}
exports.findPoolIdByBaseAndQuoteMint = findPoolIdByBaseAndQuoteMint;
//# sourceMappingURL=raydium-utils.js.map