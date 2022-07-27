"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToDecimal = convertToDecimal;
exports.convertToLamports = convertToLamports;

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _bn = _interopRequireDefault(require("bn.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isU64 = function isU64(amount) {
  if (amount.gt(new _bn.default("18446744073709551615"))) {
    throw new RangeError("The amount is not an unsigned 64-bit integer.");
  }
};
/**
 * Convert sol or token amounts to lamports
 * @returns Amount in lamports
 */


function convertToLamports(amount) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;

  var _amount = new _bignumber.default(amount).multipliedBy(10 * decimals);

  var bnAmount = new _bn.default(_amount.toFixed());
  isU64(bnAmount);
  return bnAmount;
}
/**
 * Convert lamports to decimal
 * @returns Amount in lamports
 */


function convertToDecimal(amount) {
  var decimal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;
  isU64(amount);
  return amount.divn(Math.pow(10, decimal)).toNumber();
}
//# sourceMappingURL=sol-helper.js.map