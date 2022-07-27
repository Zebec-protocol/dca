"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEVNET_SERUM_PROGRAM_ID_V3 = exports.DEVNET_LIQUIDITY_PROGRAM_ID_V4 = exports.DCA_PROGRAM_ID = exports.CONNECTION = void 0;

var _web = require("@solana/web3.js");

/** The dca program id. */
var DCA_PROGRAM_ID = new _web.PublicKey("89U3HCacYnqJYUX33EupQRyKLBAqA9vb6tzAATRp19c7");
/** Json RPC client to communicate with Solana blockchain. */

exports.DCA_PROGRAM_ID = DCA_PROGRAM_ID;
var CONNECTION = {
  "mainnet-beta": new _web.Connection((0, _web.clusterApiUrl)("mainnet-beta")),
  devnet: new _web.Connection((0, _web.clusterApiUrl)("devnet")),
  testnet: new _web.Connection((0, _web.clusterApiUrl)("testnet"))
};
/** The devnet raydium liquidity pool program v4 id. */

exports.CONNECTION = CONNECTION;
var DEVNET_LIQUIDITY_PROGRAM_ID_V4 = new _web.PublicKey("9rpQHSyFVM1dkkHFQ2TtTzPEW7DVmEyPmN8wVniqJtuC");
/** The devnet serum market program id. */

exports.DEVNET_LIQUIDITY_PROGRAM_ID_V4 = DEVNET_LIQUIDITY_PROGRAM_ID_V4;
var DEVNET_SERUM_PROGRAM_ID_V3 = new _web.PublicKey("DESVgJVGajEgKGXhb6XmqDHGz3VjdgP7rEVESBgxmroY");
exports.DEVNET_SERUM_PROGRAM_ID_V3 = DEVNET_SERUM_PROGRAM_ID_V3;
//# sourceMappingURL=constants.js.map