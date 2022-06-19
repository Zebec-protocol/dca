"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToDecimal = exports.convertToLamports = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const bn_js_1 = __importDefault(require("bn.js"));
const isU64 = (amount) => {
    if (amount.isLessThan(new bignumber_js_1.default(0)) ||
        amount.isGreaterThanOrEqualTo(new bignumber_js_1.default("18446744073709551615"))) {
        throw new RangeError("The amount doesn't fit in unsigned 64-bit integer.");
    }
};
/**
 * Convert sol or token amounts to lamports
 * @returns Amount in lamports
 */
function convertToLamports(amount, decimal = 9) {
    const _amount = amount.multipliedBy(new bignumber_js_1.default(10 ** decimal));
    isU64(_amount);
    return new bn_js_1.default(_amount.toFixed());
}
exports.convertToLamports = convertToLamports;
/**
 * Convert lamports to decimal
 * @returns Amount in lamports
 */
function convertToDecimal(amount, decimal = 9) {
    const _amount = new bignumber_js_1.default(amount.toString());
    isU64(_amount);
    return _amount.dividedBy(new bignumber_js_1.default(10 ** decimal));
}
exports.convertToDecimal = convertToDecimal;
//# sourceMappingURL=sol-helper.js.map