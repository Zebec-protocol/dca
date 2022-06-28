"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DcaClient = void 0;

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _bn = require("bn.js");

var _raydiumSdk = require("@raydium-io/raydium-sdk");

var _splToken = require("@solana/spl-token");

var _web = require("@solana/web3.js");

var _instruction = require("../instruction");

var _dcaAccount = require("../models/dca-account");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DcaClient = /*#__PURE__*/function () {
  function DcaClient(params) {
    _classCallCheck(this, DcaClient);

    _defineProperty(this, "_connection", void 0);

    _defineProperty(this, "_commitment", void 0);

    _defineProperty(this, "_preflightCommitment", void 0);

    this._commitment = params.commitment;
    this._connection = params.connection;
    this._preflightCommitment = params.preflightCommitment;
  }

  _createClass(DcaClient, [{
    key: "makeDepositTokenTransaction",
    value: function () {
      var _makeDepositTokenTransaction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(owner, mint, amount) {
        var dcaAccount, vault, ownerTokenAccount, vaultTokenAccount, vaultNativeMintAddress, mintInfo, _amount, txn;

        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                dcaAccount = _web.Keypair.generate();
                _context.next = 4;
                return (0, _utils.findVaultAddress)(owner, dcaAccount.publicKey);

              case 4:
                vault = _context.sent;
                _context.next = 7;
                return (0, _utils.findAssociatedTokenAddress)(owner, mint);

              case 7:
                ownerTokenAccount = _context.sent;
                _context.next = 10;
                return (0, _utils.findAssociatedTokenAddress)(vault, mint);

              case 10:
                vaultTokenAccount = _context.sent;
                _context.next = 13;
                return (0, _utils.findAssociatedTokenAddress)(vault, _splToken.NATIVE_MINT);

              case 13:
                vaultNativeMintAddress = _context.sent;
                _context.next = 16;
                return (0, _utils.getMintInfo)(this._connection, mint);

              case 16:
                mintInfo = _context.sent;
                _amount = (0, _utils.convertToLamports)(amount, mintInfo.decimals);
                txn = new _web.Transaction().add(_instruction.DcaInstruction.depositToken(owner, vault, mint, _splToken.NATIVE_MINT, ownerTokenAccount, vaultTokenAccount, vaultNativeMintAddress, dcaAccount.publicKey, _amount));
                txn.feePayer = owner;
                return _context.abrupt("return", {
                  transaction: txn,
                  dcaAccount: dcaAccount
                });

              case 23:
                _context.prev = 23;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 23]]);
      }));

      function makeDepositTokenTransaction(_x, _x2, _x3) {
        return _makeDepositTokenTransaction.apply(this, arguments);
      }

      return makeDepositTokenTransaction;
    }()
  }, {
    key: "makeDepositSolTransaction",
    value: function () {
      var _makeDepositSolTransaction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(owner, mint, amount) {
        var dcaAccount, vaultAddress, ownerTokenAccount, vaultTokenAccount, vaultNativeMintAddress, _amount, txn;

        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                dcaAccount = _web.Keypair.generate();
                _context2.next = 4;
                return (0, _utils.findVaultAddress)(owner, dcaAccount.publicKey);

              case 4:
                vaultAddress = _context2.sent;
                _context2.next = 7;
                return (0, _utils.findAssociatedTokenAddress)(owner, mint);

              case 7:
                ownerTokenAccount = _context2.sent;
                _context2.next = 10;
                return (0, _utils.findAssociatedTokenAddress)(vaultAddress, mint);

              case 10:
                vaultTokenAccount = _context2.sent;
                _context2.next = 13;
                return (0, _utils.findAssociatedTokenAddress)(vaultAddress, _splToken.NATIVE_MINT);

              case 13:
                vaultNativeMintAddress = _context2.sent;
                _amount = (0, _utils.convertToLamports)(amount);
                txn = new _web.Transaction().add(_instruction.DcaInstruction.depositSol(owner, vaultAddress, mint, _splToken.NATIVE_MINT, ownerTokenAccount, vaultNativeMintAddress, vaultTokenAccount, dcaAccount.publicKey, _amount));
                txn.partialSign(dcaAccount);
                txn.feePayer = owner;
                return _context2.abrupt("return", {
                  transaction: txn,
                  dcaAccount: dcaAccount
                });

              case 21:
                _context2.prev = 21;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 21]]);
      }));

      function makeDepositSolTransaction(_x4, _x5, _x6) {
        return _makeDepositSolTransaction.apply(this, arguments);
      }

      return makeDepositSolTransaction;
    }()
  }, {
    key: "makeInitializeTransaction",
    value: function () {
      var _makeInitializeTransaction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(owner, mint, dcaAccount, startTime, dcaAmount, dcaTime) {
        var vault, _startTime, _dcaTime, mintInfo, _dcaAmount, minimumAmountOut, txn;

        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return (0, _utils.findVaultAddress)(owner, dcaAccount);

              case 3:
                vault = _context3.sent;
                _startTime = new _bn.BN(startTime.toFixed());
                _dcaTime = new _bn.BN(dcaTime.toFixed());
                _context3.next = 8;
                return (0, _utils.getMintInfo)(this._connection, mint);

              case 8:
                mintInfo = _context3.sent;
                _dcaAmount = (0, _utils.convertToLamports)(dcaAmount, mintInfo.decimals);
                minimumAmountOut = (0, _utils.convertToLamports)(dcaAmount, mintInfo.decimals);
                txn = new _web.Transaction().add(_instruction.DcaInstruction.initialize(owner, vault, dcaAccount, _startTime, _dcaAmount, _dcaTime, minimumAmountOut));
                return _context3.abrupt("return", txn);

              case 15:
                _context3.prev = 15;
                _context3.t0 = _context3["catch"](0);
                throw _context3.t0;

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 15]]);
      }));

      function makeInitializeTransaction(_x7, _x8, _x9, _x10, _x11, _x12) {
        return _makeInitializeTransaction.apply(this, arguments);
      }

      return makeInitializeTransaction;
    }()
  }, {
    key: "makeWithdrawTokenTransaction",
    value: function () {
      var _makeWithdrawTokenTransaction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(owner, mint, dcaAccount, amount) {
        var vaultAddress, ownerTokenAccount, vaultTokenAddress, mintInfo, transferAmount, txn;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return (0, _utils.findVaultAddress)(owner, dcaAccount);

              case 3:
                vaultAddress = _context4.sent;
                _context4.next = 6;
                return (0, _utils.findAssociatedTokenAddress)(owner, mint);

              case 6:
                ownerTokenAccount = _context4.sent;
                _context4.next = 9;
                return (0, _utils.findAssociatedTokenAddress)(vaultAddress, mint);

              case 9:
                vaultTokenAddress = _context4.sent;
                _context4.next = 12;
                return (0, _utils.getMintInfo)(this._connection, mint);

              case 12:
                mintInfo = _context4.sent;
                transferAmount = (0, _utils.convertToLamports)(amount, mintInfo.decimals);
                txn = new _web.Transaction().add(_instruction.DcaInstruction.withdrawToken(owner, vaultAddress, mint, ownerTokenAccount, vaultTokenAddress, dcaAccount, transferAmount));
                return _context4.abrupt("return", txn);

              case 18:
                _context4.prev = 18;
                _context4.t0 = _context4["catch"](0);
                throw _context4.t0;

              case 21:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 18]]);
      }));

      function makeWithdrawTokenTransaction(_x13, _x14, _x15, _x16) {
        return _makeWithdrawTokenTransaction.apply(this, arguments);
      }

      return makeWithdrawTokenTransaction;
    }()
  }, {
    key: "makeWithdrawSolTransaction",
    value: function () {
      var _makeWithdrawSolTransaction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(owner, mint, dcaAccount, amount) {
        var vaultAddress, ownerTokenAccount, ownerNativeMintAccount, vaultTokenAddress, vaultNativeMintAddress, transferAmount, txn;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return (0, _utils.findVaultAddress)(owner, dcaAccount);

              case 3:
                vaultAddress = _context5.sent;
                _context5.next = 6;
                return (0, _utils.findAssociatedTokenAddress)(owner, mint);

              case 6:
                ownerTokenAccount = _context5.sent;
                _context5.next = 9;
                return (0, _utils.findAssociatedTokenAddress)(owner, _splToken.NATIVE_MINT);

              case 9:
                ownerNativeMintAccount = _context5.sent;
                _context5.next = 12;
                return (0, _utils.findAssociatedTokenAddress)(vaultAddress, mint);

              case 12:
                vaultTokenAddress = _context5.sent;
                _context5.next = 15;
                return (0, _utils.findAssociatedTokenAddress)(vaultAddress, _splToken.NATIVE_MINT);

              case 15:
                vaultNativeMintAddress = _context5.sent;
                transferAmount = (0, _utils.convertToLamports)(amount);
                txn = new _web.Transaction().add(_instruction.DcaInstruction.withdrawSol(owner, vaultAddress, mint, ownerTokenAccount, vaultTokenAddress, dcaAccount, _splToken.NATIVE_MINT, vaultNativeMintAddress, ownerNativeMintAccount, transferAmount));
                return _context5.abrupt("return", txn);

              case 21:
                _context5.prev = 21;
                _context5.t0 = _context5["catch"](0);
                throw _context5.t0;

              case 24:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 21]]);
      }));

      function makeWithdrawSolTransaction(_x17, _x18, _x19, _x20) {
        return _makeWithdrawSolTransaction.apply(this, arguments);
      }

      return makeWithdrawSolTransaction;
    }()
  }, {
    key: "makeSwapFromSolTransaction",
    value: function () {
      var _makeSwapFromSolTransaction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(owner, mint, dcaAccount) {
        var vault, vaultNativeMintAccount, vaultTokenAccount, poolKeyId, poolKeys, poolInfo, dcaInfo, amount, amountIn, currencyOut, slippage, _Liquidity$computeAmo, amountOut, minAmountOut, currentPrice, executionPrice, priceImpact, fee, txn;

        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return (0, _utils.findVaultAddress)(owner, dcaAccount);

              case 3:
                vault = _context6.sent;
                _context6.next = 6;
                return (0, _utils.findAssociatedTokenAddress)(vault, _splToken.NATIVE_MINT);

              case 6:
                vaultNativeMintAccount = _context6.sent;
                _context6.next = 9;
                return (0, _utils.findAssociatedTokenAddress)(vault, mint);

              case 9:
                vaultTokenAccount = _context6.sent;
                _context6.next = 12;
                return (0, _utils.findPoolIdByBaseAndQuoteMint)(_splToken.NATIVE_MINT, mint);

              case 12:
                poolKeyId = _context6.sent;
                _context6.next = 15;
                return (0, _utils.fetchPoolKeys)(this._connection, new _web.PublicKey(poolKeyId));

              case 15:
                poolKeys = _context6.sent;
                _context6.next = 18;
                return _raydiumSdk.Liquidity.fetchInfo({
                  connection: this._connection,
                  poolKeys: poolKeys
                });

              case 18:
                poolInfo = _context6.sent;
                _context6.next = 21;
                return _dcaAccount.DcaAccount.getDcaAccountInfo(this._connection, dcaAccount);

              case 21:
                dcaInfo = _context6.sent;

                if (!(dcaInfo.dcaAmount.toString() === "0")) {
                  _context6.next = 24;
                  break;
                }

                throw new Error("Dca amout is zero");

              case 24:
                amount = new _bignumber.default(dcaInfo.dcaAmount.toString()).div(new _bignumber.default(_web.LAMPORTS_PER_SOL));
                amountIn = new _raydiumSdk.TokenAmount(new _raydiumSdk.Token(poolKeys.baseMint, poolInfo.baseDecimals), amount.toFixed(), false);
                currencyOut = new _raydiumSdk.Token(poolKeys.quoteMint, poolInfo.quoteDecimals);
                slippage = new _raydiumSdk.Percent(5, 100);
                _Liquidity$computeAmo = _raydiumSdk.Liquidity.computeAmountOut({
                  poolKeys: poolKeys,
                  poolInfo: poolInfo,
                  amountIn: amountIn,
                  currencyOut: currencyOut,
                  slippage: slippage
                }), amountOut = _Liquidity$computeAmo.amountOut, minAmountOut = _Liquidity$computeAmo.minAmountOut, currentPrice = _Liquidity$computeAmo.currentPrice, executionPrice = _Liquidity$computeAmo.executionPrice, priceImpact = _Liquidity$computeAmo.priceImpact, fee = _Liquidity$computeAmo.fee;
                txn = new _web.Transaction().add(_instruction.DcaInstruction.swapFromSol(poolKeys.programId, // liquidityProgramId
                poolKeys.id, // ammAddress
                poolKeys.authority, // ammAuthorityAddress
                poolKeys.openOrders, // ammOpenOrderAddress
                poolKeys.targetOrders, // ammTargetOrderAddress
                poolKeys.baseVault, // poolCoinTokenAddress
                poolKeys.quoteVault, // poolPcTokenAddress
                poolKeys.marketProgramId, // serumMarketProgramId
                poolKeys.marketId, // serumMarketAddress
                poolKeys.marketBids, // serumBidsAddress
                poolKeys.marketAsks, // serumAskAddress
                poolKeys.marketEventQueue, // serumEventQueueAddress
                poolKeys.marketBaseVault, // serumCoinVaultAddress
                poolKeys.marketQuoteVault, // serumVaultAddress
                poolKeys.marketAuthority, // serumVaultSigner
                vault, vaultNativeMintAccount, vaultTokenAccount, mint, owner, dcaAccount, _splToken.NATIVE_MINT, minAmountOut.raw));
                return _context6.abrupt("return", txn);

              case 33:
                _context6.prev = 33;
                _context6.t0 = _context6["catch"](0);
                throw _context6.t0;

              case 36:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 33]]);
      }));

      function makeSwapFromSolTransaction(_x21, _x22, _x23) {
        return _makeSwapFromSolTransaction.apply(this, arguments);
      }

      return makeSwapFromSolTransaction;
    }()
  }, {
    key: "makeSwapToSolTransaction",
    value: function () {
      var _makeSwapToSolTransaction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(owner, mint, dcaAccount) {
        var vault, vaultTokenAccount, vaultNativeMintAccount, poolKeyId, poolKeys, poolInfo, dcaInfo, mintInfo, amount, amountIn, currencyOut, slippage, _Liquidity$computeAmo2, amountOut, minAmountOut, currentPrice, executionPrice, priceImpact, fee, txn;

        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return (0, _utils.findVaultAddress)(owner, dcaAccount);

              case 2:
                vault = _context7.sent;
                _context7.next = 5;
                return (0, _utils.findAssociatedTokenAddress)(vault, mint);

              case 5:
                vaultTokenAccount = _context7.sent;
                _context7.next = 8;
                return (0, _utils.findAssociatedTokenAddress)(vault, _splToken.NATIVE_MINT);

              case 8:
                vaultNativeMintAccount = _context7.sent;
                _context7.next = 11;
                return (0, _utils.findPoolIdByBaseAndQuoteMint)(mint, _splToken.NATIVE_MINT);

              case 11:
                poolKeyId = _context7.sent;
                _context7.next = 14;
                return (0, _utils.fetchPoolKeys)(this._connection, new _web.PublicKey(poolKeyId));

              case 14:
                poolKeys = _context7.sent;
                _context7.next = 17;
                return _raydiumSdk.Liquidity.fetchInfo({
                  connection: this._connection,
                  poolKeys: poolKeys
                });

              case 17:
                poolInfo = _context7.sent;
                _context7.next = 20;
                return _dcaAccount.DcaAccount.getDcaAccountInfo(this._connection, dcaAccount);

              case 20:
                dcaInfo = _context7.sent;

                if (!(dcaInfo.dcaAmount.toString() === "0")) {
                  _context7.next = 23;
                  break;
                }

                throw new Error("Dca amount is zero");

              case 23:
                _context7.next = 25;
                return (0, _utils.getMintInfo)(this._connection, mint);

              case 25:
                mintInfo = _context7.sent;
                amount = new _bignumber.default(dcaInfo.dcaAmount.toString()).div(new _bignumber.default(Math.pow(10, mintInfo.decimals)));
                amountIn = new _raydiumSdk.TokenAmount(new _raydiumSdk.Token(poolKeys.baseMint, poolInfo.baseDecimals), amount.toString(), false);
                currencyOut = new _raydiumSdk.Token(poolKeys.quoteMint, poolInfo.quoteDecimals);
                slippage = new _raydiumSdk.Percent(5, 100);
                _Liquidity$computeAmo2 = _raydiumSdk.Liquidity.computeAmountOut({
                  poolKeys: poolKeys,
                  poolInfo: poolInfo,
                  amountIn: amountIn,
                  currencyOut: currencyOut,
                  slippage: slippage
                }), amountOut = _Liquidity$computeAmo2.amountOut, minAmountOut = _Liquidity$computeAmo2.minAmountOut, currentPrice = _Liquidity$computeAmo2.currentPrice, executionPrice = _Liquidity$computeAmo2.executionPrice, priceImpact = _Liquidity$computeAmo2.priceImpact, fee = _Liquidity$computeAmo2.fee;
                txn = new _web.Transaction().add(_instruction.DcaInstruction.swapToSol(poolKeys.programId, poolKeys.id, // ammAddress
                poolKeys.authority, // ammAuthorityAddress
                poolKeys.openOrders, // ammOpenOrderAddress
                poolKeys.targetOrders, // ammTargetOrderAddress
                poolKeys.baseVault, // poolCoinTokenAddress
                poolKeys.quoteVault, // poolPcTokenAddress
                poolKeys.marketProgramId, // serumMarketProgramId
                poolKeys.marketId, // serumMarketAddress
                poolKeys.marketBids, // serumBidsAddress
                poolKeys.marketAsks, // serumAskAddress
                poolKeys.marketEventQueue, // serumEventQueueAddress
                poolKeys.marketBaseVault, // serumCoinVaultAddress
                poolKeys.marketQuoteVault, // serumVaultAddress
                poolKeys.marketAuthority, // serumVaultSigner
                vault, vaultNativeMintAccount, vaultTokenAccount, mint, owner, dcaAccount, _splToken.NATIVE_MINT, minAmountOut.raw));
                return _context7.abrupt("return", txn);

              case 33:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function makeSwapToSolTransaction(_x24, _x25, _x26) {
        return _makeSwapToSolTransaction.apply(this, arguments);
      }

      return makeSwapToSolTransaction;
    }()
  }, {
    key: "makeFundTokenTransaction",
    value: function () {
      var _makeFundTokenTransaction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(owner, mint, dcaAccount, amount) {
        var vault, ownerTokenAccount, vaultTokenAccount, mintInfo, transferAmount, txn;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return (0, _utils.findVaultAddress)(owner, dcaAccount);

              case 3:
                vault = _context8.sent;
                _context8.next = 6;
                return (0, _utils.findAssociatedTokenAddress)(owner, mint);

              case 6:
                ownerTokenAccount = _context8.sent;
                _context8.next = 9;
                return (0, _utils.findAssociatedTokenAddress)(vault, mint);

              case 9:
                vaultTokenAccount = _context8.sent;
                _context8.next = 12;
                return (0, _utils.getMintInfo)(this._connection, mint);

              case 12:
                mintInfo = _context8.sent;
                transferAmount = (0, _utils.convertToLamports)(amount, mintInfo.decimals);
                txn = new _web.Transaction().add(_instruction.DcaInstruction.fundToken(owner, vault, mint, ownerTokenAccount, vaultTokenAccount, dcaAccount, transferAmount));
                return _context8.abrupt("return", txn);

              case 18:
                _context8.prev = 18;
                _context8.t0 = _context8["catch"](0);
                throw _context8.t0;

              case 21:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 18]]);
      }));

      function makeFundTokenTransaction(_x27, _x28, _x29, _x30) {
        return _makeFundTokenTransaction.apply(this, arguments);
      }

      return makeFundTokenTransaction;
    }()
  }, {
    key: "makeFundSolTransaction",
    value: function () {
      var _makeFundSolTransaction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(owner, mint, dcaAccount, amount) {
        var vault, ownerTokenAccount, vaultTokenAccount, vaultNativeMintAccount, transferAmount, txn;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return (0, _utils.findVaultAddress)(owner, dcaAccount);

              case 3:
                vault = _context9.sent;
                _context9.next = 6;
                return (0, _utils.findAssociatedTokenAddress)(owner, mint);

              case 6:
                ownerTokenAccount = _context9.sent;
                _context9.next = 9;
                return (0, _utils.findAssociatedTokenAddress)(vault, mint);

              case 9:
                vaultTokenAccount = _context9.sent;
                _context9.next = 12;
                return (0, _utils.findAssociatedTokenAddress)(vault, _splToken.NATIVE_MINT);

              case 12:
                vaultNativeMintAccount = _context9.sent;
                transferAmount = (0, _utils.convertToLamports)(amount);
                txn = new _web.Transaction().add(_instruction.DcaInstruction.fundSol(owner, vault, mint, _splToken.NATIVE_MINT, ownerTokenAccount, vaultNativeMintAccount, vaultTokenAccount, dcaAccount, transferAmount));
                return _context9.abrupt("return", txn);

              case 18:
                _context9.prev = 18;
                _context9.t0 = _context9["catch"](0);
                throw _context9.t0;

              case 21:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[0, 18]]);
      }));

      function makeFundSolTransaction(_x31, _x32, _x33, _x34) {
        return _makeFundSolTransaction.apply(this, arguments);
      }

      return makeFundSolTransaction;
    }()
  }]);

  return DcaClient;
}();

exports.DcaClient = DcaClient;
//# sourceMappingURL=base.js.map