"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPoolKeysDevnet = exports.fetchAllPoolKeysDevnet = void 0;
const raydium_sdk_1 = require("@raydium-io/raydium-sdk");
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../constants");
const LIQUIDITY_PROGRAM_ID_V4 = constants_1.DEVNET_LIQUIDITY_PROGRAM_ID_V4;
const SERUM_PROGRAM_ID_V3 = constants_1.DEVNET_SERUM_PROGRAM_ID_V3;
async function getAssociatedId({ programId, marketId }) {
    const { publicKey } = await (0, raydium_sdk_1.findProgramAddress)([programId.toBuffer(), marketId.toBuffer(), Buffer.from("amm_associated_seed", "utf-8")], programId);
    return publicKey;
}
async function getAssociatedAuthority({ programId }) {
    return (0, raydium_sdk_1.findProgramAddress)(
    // new Uint8Array(Buffer.from('amm authority'.replace('\u00A0', ' '), 'utf-8'))
    [Buffer.from([97, 109, 109, 32, 97, 117, 116, 104, 111, 114, 105, 116, 121])], programId);
}
async function getAssociatedBaseVault({ programId, marketId }) {
    const { publicKey } = await (0, raydium_sdk_1.findProgramAddress)([programId.toBuffer(), marketId.toBuffer(), Buffer.from("coin_vault_associated_seed", "utf-8")], programId);
    return publicKey;
}
async function getAssociatedQuoteVault({ programId, marketId }) {
    const { publicKey } = await (0, raydium_sdk_1.findProgramAddress)([programId.toBuffer(), marketId.toBuffer(), Buffer.from("pc_vault_associated_seed", "utf-8")], programId);
    return publicKey;
}
async function getAssociatedLpMint({ programId, marketId }) {
    const { publicKey } = await (0, raydium_sdk_1.findProgramAddress)([programId.toBuffer(), marketId.toBuffer(), Buffer.from("lp_mint_associated_seed", "utf-8")], programId);
    return publicKey;
}
async function getAssociatedLpVault({ programId, marketId }) {
    const { publicKey } = await (0, raydium_sdk_1.findProgramAddress)([programId.toBuffer(), marketId.toBuffer(), Buffer.from("temp_lp_token_associated_seed", "utf-8")], programId);
    return publicKey;
}
async function getAssociatedTargetOrders({ programId, marketId }) {
    const { publicKey } = await (0, raydium_sdk_1.findProgramAddress)([programId.toBuffer(), marketId.toBuffer(), Buffer.from("target_associated_seed", "utf-8")], programId);
    return publicKey;
}
async function getAssociatedWithdrawQueue({ programId, marketId }) {
    const { publicKey } = await (0, raydium_sdk_1.findProgramAddress)([programId.toBuffer(), marketId.toBuffer(), Buffer.from("withdraw_associated_seed", "utf-8")], programId);
    return publicKey;
}
async function getAssociatedOpenOrders({ programId, marketId }) {
    const { publicKey } = await (0, raydium_sdk_1.findProgramAddress)([programId.toBuffer(), marketId.toBuffer(), Buffer.from("open_order_associated_seed", "utf-8")], programId);
    return publicKey;
}
async function getAssociatedPoolKeys({ version, marketId, baseMint, quoteMint, }) {
    const programId = LIQUIDITY_PROGRAM_ID_V4;
    const id = await getAssociatedId({ programId, marketId });
    const lpMint = await getAssociatedLpMint({ programId, marketId });
    const { publicKey: authority, nonce } = await getAssociatedAuthority({ programId });
    const baseVault = await getAssociatedBaseVault({ programId, marketId });
    const quoteVault = await getAssociatedQuoteVault({ programId, marketId });
    const lpVault = await getAssociatedLpVault({ programId, marketId });
    const openOrders = await getAssociatedOpenOrders({ programId, marketId });
    const targetOrders = await getAssociatedTargetOrders({ programId, marketId });
    const withdrawQueue = await getAssociatedWithdrawQueue({ programId, marketId });
    const serumVersion = 3;
    const serumProgramId = SERUM_PROGRAM_ID_V3;
    const { publicKey: marketAuthority } = await raydium_sdk_1.Market.getAssociatedAuthority({
        programId: serumProgramId,
        marketId,
    });
    return {
        // base
        id,
        baseMint,
        quoteMint,
        lpMint,
        // version
        version,
        programId,
        // keys
        authority,
        nonce,
        baseVault,
        quoteVault,
        lpVault,
        openOrders,
        targetOrders,
        withdrawQueue,
        // market version
        marketVersion: serumVersion,
        marketProgramId: serumProgramId,
        // market keys
        marketId,
        marketAuthority,
    };
}
async function fetchAllPoolKeysDevnet(connection, config) {
    // supported versions
    const supported = [{
            version: 4,
            programId: LIQUIDITY_PROGRAM_ID_V4,
            serumVersion: 3,
            serumProgramId: SERUM_PROGRAM_ID_V3,
            stateLayout: raydium_sdk_1.LIQUIDITY_STATE_LAYOUT_V4,
        }];
    let poolsAccountInfo = [];
    try {
        poolsAccountInfo = await Promise.all(supported.map(({ programId, version, serumVersion, serumProgramId, stateLayout }) => connection
            .getProgramAccounts(programId, {
            filters: [{ dataSize: stateLayout.span }],
        })
            .then((accounts) => {
            return accounts.map((info) => {
                return {
                    ...info,
                    ...{ version, programId, serumVersion, serumProgramId, stateLayout },
                };
            });
        })));
    }
    catch (error) {
    }
    const flatPoolsAccountInfo = poolsAccountInfo.flat();
    // temp pool keys without market keys
    const tempPoolsKeys = [];
    for (const { pubkey, account: accountInfo, version, programId, serumVersion, serumProgramId, stateLayout: LIQUIDITY_STATE_LAYOUT, } of flatPoolsAccountInfo) {
        const { data } = accountInfo;
        const fields = LIQUIDITY_STATE_LAYOUT.decode(data);
        const { status, nonce, baseMint, quoteMint, lpMint, openOrders, targetOrders, baseVault, quoteVault, marketId } = fields;
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
        if (status.isZero()) {
            continue;
        }
        const associatedPoolKeys = await getAssociatedPoolKeys({
            version,
            baseMint,
            quoteMint,
            marketId,
        });
        // double check keys with on-chain data
        // logger.assert(Number(nonce) === associatedPoolKeys.nonce, "invalid nonce");
        tempPoolsKeys.push({
            id: pubkey,
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
        });
    }
    // fetch market keys
    let marketsInfo = [];
    try {
        marketsInfo = await (0, raydium_sdk_1.getMultipleAccountsInfo)(connection, tempPoolsKeys.map(({ marketId }) => marketId), config);
    }
    catch (error) {
    }
    const poolsKeys = [];
    for (const index in marketsInfo) {
        const poolKeys = tempPoolsKeys[index];
        const marketInfo = marketsInfo[index];
        const { id, marketVersion } = poolKeys;
        // @ts-ignore
        const { data } = marketInfo;
        const { state: MARKET_STATE_LAYOUT } = raydium_sdk_1.Market.getLayouts(marketVersion);
        const { baseVault: marketBaseVault, quoteVault: marketQuoteVault, bids: marketBids, asks: marketAsks, eventQueue: marketEventQueue, } = MARKET_STATE_LAYOUT.decode(data);
        poolsKeys.push({
            ...poolKeys,
            ...{
                marketBaseVault,
                marketQuoteVault,
                marketBids,
                marketAsks,
                marketEventQueue,
            },
        });
    }
    return poolsKeys;
}
exports.fetchAllPoolKeysDevnet = fetchAllPoolKeysDevnet;
async function fetchPoolKeysDevnet(connection, poolId, version = 4) {
    // const version = 4
    const serumVersion = 3;
    const marketVersion = 3;
    const programId = LIQUIDITY_PROGRAM_ID_V4;
    const serumProgramId = SERUM_PROGRAM_ID_V3;
    const account = await connection.getAccountInfo(poolId);
    const { state: LiquidityStateLayout } = raydium_sdk_1.Liquidity.getLayouts(version);
    //@ts-ignore
    const fields = LiquidityStateLayout.decode(Uint8Array.from(account.data));
    const { status, baseMint, quoteMint, lpMint, openOrders, targetOrders, baseVault, quoteVault, marketId } = fields;
    let withdrawQueue;
    let lpVault;
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
    const associatedPoolKeys = await getAssociatedPoolKeys({
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
    //@ts-ignore
    const market = MARKET_STATE_LAYOUT.decode(Uint8Array.from(marketInfo.data));
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
exports.fetchPoolKeysDevnet = fetchPoolKeysDevnet;
//# sourceMappingURL=devnet-raydium-utils.js.map