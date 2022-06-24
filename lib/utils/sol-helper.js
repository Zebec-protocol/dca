"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true,
});
exports.convertToDecimal = convertToDecimal;
exports.convertToLamports = convertToLamports;

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _bn = _interopRequireDefault(require("bn.js"));

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var isU64 = function isU64(amount) {
	if (
		amount.isLessThan(new _bignumber.default(0)) ||
		amount.isGreaterThanOrEqualTo(new _bignumber.default("18446744073709551615"))
	) {
		throw new RangeError("The amount doesn't fit in unsigned 64-bit integer.");
	}
};
/**
 * Convert sol or token amounts to lamports
 * @returns Amount in lamports
 */

function convertToLamports(amount) {
	var decimal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;

	var _amount = amount.multipliedBy(new _bignumber.default(Math.pow(10, decimal)));

	isU64(_amount);
	return new _bn.default(_amount.toFixed());
}
/**
 * Convert lamports to decimal
 * @returns Amount in lamports
 */

function convertToDecimal(amount) {
	var decimal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;

	var _amount = new _bignumber.default(amount.toString());

	isU64(_amount);
	return _amount.dividedBy(new _bignumber.default(Math.pow(10, decimal)));
}
//# sourceMappingURL=sol-helper.js.map
