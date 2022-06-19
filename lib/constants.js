"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEVNET_SERUM_PROGRAM_ID_V3 = exports.DEVNET_LIQUIDITY_PROGRAM_ID_V4 = exports.connection = exports.DCA_PROGRAM_ID = void 0;
const web3_js_1 = require("@solana/web3.js");
/** The dca program id. */
exports.DCA_PROGRAM_ID = new web3_js_1.PublicKey("89U3HCacYnqJYUX33EupQRyKLBAqA9vb6tzAATRp19c7");
/** Json RPC client to communicate with Solana blockchain. */
exports.connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("mainnet-beta"));
/** The devnet raydium liquidity pool program v4 id. */
exports.DEVNET_LIQUIDITY_PROGRAM_ID_V4 = new web3_js_1.PublicKey("9rpQHSyFVM1dkkHFQ2TtTzPEW7DVmEyPmN8wVniqJtuC");
/** The devnet serum market program id. */
exports.DEVNET_SERUM_PROGRAM_ID_V3 = new web3_js_1.PublicKey("DESVgJVGajEgKGXhb6XmqDHGz3VjdgP7rEVESBgxmroY");
//# sourceMappingURL=constants.js.map