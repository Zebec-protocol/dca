"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DcaClient = void 0;

var _web = require("@solana/web3.js");

var _splToken = require("@solana/spl-token");

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _bn = require("bn.js");

var _raydiumSdk = require("@raydium-io/raydium-sdk");

var _utils = require("./utils");

var _instruction = require("./instruction");

var _dcaAccount = require("./models/dca-account");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DcaClient = /*#__PURE__*/function () {
  function DcaClient(walletProvider, cluster, commitment) {
    _classCallCheck(this, DcaClient);

    _defineProperty(this, "_connection", void 0);

    _defineProperty(this, "_commitment", void 0);

    _defineProperty(this, "_wallet", void 0);

    this._commitment = commitment ? commitment : "confirmed";
    this._connection = cluster ? new _web.Connection((0, _web.clusterApiUrl)(cluster)) : new _web.Connection((0, _web.clusterApiUrl)("mainnet-beta"));
    this._wallet = walletProvider;
  }

  _createClass(DcaClient, [{
    key: "signAndSendTransaction",
    value: function () {
      var _signAndSendTransaction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(txn) {
        var signedTxn;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._wallet.signTransaction(txn);

              case 2:
                signedTxn = _context.sent;
                _context.next = 5;
                return (0, _web.sendAndConfirmRawTransaction)(this._connection, signedTxn.serialize(), {
                  commitment: this._commitment,
                  skipPreflight: false,
                  preflightCommitment: "processed"
                });

              case 5:
                return _context.abrupt("return", _context.sent);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function signAndSendTransaction(_x) {
        return _signAndSendTransaction.apply(this, arguments);
      }

      return signAndSendTransaction;
    }()
    /**
     * Deposit non-native token in dca program vault
     */

  }, {
    key: "depositToken",
    value: function () {
      var _depositToken = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(owner, mint, amount) {
        var dcaDataAccount, vault, ownerTokenAccount, vaultTokenAccount, vaultNativeMintAddress, mintInfo, _amount, txn, signature;

        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                dcaDataAccount = _web.Keypair.generate();
                _context2.next = 4;
                return (0, _utils.findVaultAddress)(owner, dcaDataAccount.publicKey);

              case 4:
                vault = _context2.sent;
                _context2.next = 7;
                return (0, _utils.findAssociatedTokenAddress)(owner, mint);

              case 7:
                ownerTokenAccount = _context2.sent;
                _context2.next = 10;
                return (0, _utils.findAssociatedTokenAddress)(vault, mint);

              case 10:
                vaultTokenAccount = _context2.sent;
                _context2.next = 13;
                return (0, _utils.findAssociatedTokenAddress)(vault, _splToken.NATIVE_MINT);

              case 13:
                vaultNativeMintAddress = _context2.sent;
                _context2.next = 16;
                return (0, _utils.getMintInfo)(this._connection, mint);

              case 16:
                mintInfo = _context2.sent;
                _amount = (0, _utils.convertToLamports)(amount, mintInfo.decimals);
                txn = new _web.Transaction().add(_instruction.DcaInstruction.depositToken(owner, vault, mint, _splToken.NATIVE_MINT, ownerTokenAccount, vaultTokenAccount, vaultNativeMintAddress, dcaDataAccount.publicKey, _amount));
                txn.feePayer = owner;
                _context2.next = 22;
                return this._connection.getLatestBlockhash();

              case 22:
                txn.recentBlockhash = _context2.sent.blockhash;
                txn.partialSign(dcaDataAccount);
                _context2.next = 26;
                return this.signAndSendTransaction(txn);

              case 26:
                signature = _context2.sent;
                return _context2.abrupt("return", {
                  status: "success",
                  data: {
                    signature: signature,
                    dcaData: dcaDataAccount.publicKey.toBase58()
                  }
                });

              case 30:
                _context2.prev = 30;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 33:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 30]]);
      }));

      function depositToken(_x2, _x3, _x4) {
        return _depositToken.apply(this, arguments);
      }

      return depositToken;
    }()
    /**
    * Deposit sol in dca vault
    */

  }, {
    key: "depositSol",
    value: function () {
      var _depositSol = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(owner, mint, amount) {
        var dcaDataAccount, vaultAddress, ownerTokenAccount, vaultTokenAccount, vaultNativeMintAddress, _amount, txn, signature;

        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                dcaDataAccount = _web.Keypair.generate();
                _context3.next = 4;
                return (0, _utils.findVaultAddress)(owner, dcaDataAccount.publicKey);

              case 4:
                vaultAddress = _context3.sent;
                _context3.next = 7;
                return (0, _utils.findAssociatedTokenAddress)(owner, mint);

              case 7:
                ownerTokenAccount = _context3.sent;
                _context3.next = 10;
                return (0, _utils.findAssociatedTokenAddress)(vaultAddress, mint);

              case 10:
                vaultTokenAccount = _context3.sent;
                _context3.next = 13;
                return (0, _utils.findAssociatedTokenAddress)(vaultAddress, _splToken.NATIVE_MINT);

              case 13:
                vaultNativeMintAddress = _context3.sent;
                _amount = (0, _utils.convertToLamports)(amount);
                txn = new _web.Transaction().add(_instruction.DcaInstruction.depositSol(owner, vaultAddress, mint, _splToken.NATIVE_MINT, ownerTokenAccount, vaultNativeMintAddress, vaultTokenAccount, dcaDataAccount.publicKey, _amount));
                txn.feePayer = owner;
                _context3.next = 19;
                return this._connection.getLatestBlockhash();

              case 19:
                txn.recentBlockhash = _context3.sent.blockhash;
                txn.partialSign(dcaDataAccount);
                _context3.next = 23;
                return this.signAndSendTransaction(txn);

              case 23:
                signature = _context3.sent;
                return _context3.abrupt("return", {
                  status: "success",
                  data: {
                    signature: signature,
                    dcaData: dcaDataAccount.publicKey.toBase58()
                  }
                });

              case 27:
                _context3.prev = 27;
                _context3.t0 = _context3["catch"](0);
                throw _context3.t0;

              case 30:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 27]]);
      }));

      function depositSol(_x5, _x6, _x7) {
        return _depositSol.apply(this, arguments);
      }

      return depositSol;
    }()
    /**
     * Intialize dca process
     */

  }, {
    key: "initialize",
    value: function () {
      var _initialize = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(owner, mint, dcaData, startTime, dcaAmount, dcaTime) {
        var vault, _startTime, _dcaTime, mintInfo, _dcaAmount, minimumAmountOut, txn, signature;

        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return (0, _utils.findVaultAddress)(owner, dcaData);

              case 3:
                vault = _context4.sent;
                _startTime = new _bn.BN(startTime.toFixed());
                _dcaTime = new _bn.BN(dcaTime.toFixed());
                _context4.next = 8;
                return (0, _utils.getMintInfo)(this._connection, mint);

              case 8:
                mintInfo = _context4.sent;
                _dcaAmount = (0, _utils.convertToLamports)(dcaAmount, mintInfo.decimals);
                minimumAmountOut = (0, _utils.convertToLamports)(dcaAmount, mintInfo.decimals);
                txn = new _web.Transaction().add(_instruction.DcaInstruction.initialize(owner, vault, dcaData, _startTime, _dcaAmount, _dcaTime, minimumAmountOut));
                txn.feePayer = owner;
                _context4.next = 15;
                return this._connection.getLatestBlockhash();

              case 15:
                txn.recentBlockhash = _context4.sent.blockhash;
                _context4.next = 18;
                return this.signAndSendTransaction(txn);

              case 18:
                signature = _context4.sent;
                return _context4.abrupt("return", {
                  status: "success",
                  data: {
                    signature: signature
                  }
                });

              case 22:
                _context4.prev = 22;
                _context4.t0 = _context4["catch"](0);
                throw _context4.t0;

              case 25:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 22]]);
      }));

      function initialize(_x8, _x9, _x10, _x11, _x12, _x13) {
        return _initialize.apply(this, arguments);
      }

      return initialize;
    }()
    /**
     * Withdraw non-native token from vault
     */

  }, {
    key: "withdrawToken",
    value: function () {
      var _withdrawToken = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(owner, mint, dcaData, amount) {
        var vaultAddress, ownerTokenAccount, vaultTokenAddress, mintInfo, transferAmount, txn, signature;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return (0, _utils.findVaultAddress)(owner, dcaData);

              case 3:
                vaultAddress = _context5.sent;
                _context5.next = 6;
                return (0, _utils.findAssociatedTokenAddress)(owner, mint);

              case 6:
                ownerTokenAccount = _context5.sent;
                _context5.next = 9;
                return (0, _utils.findAssociatedTokenAddress)(vaultAddress, mint);

              case 9:
                vaultTokenAddress = _context5.sent;
                _context5.next = 12;
                return (0, _utils.getMintInfo)(this._connection, mint);

              case 12:
                mintInfo = _context5.sent;
                transferAmount = (0, _utils.convertToLamports)(amount, mintInfo.decimals);
                txn = new _web.Transaction().add(_instruction.DcaInstruction.withdrawToken(owner, vaultAddress, mint, ownerTokenAccount, vaultTokenAddress, dcaData, transferAmount));
                txn.feePayer = owner;
                _context5.next = 18;
                return this._connection.getLatestBlockhash();

              case 18:
                txn.recentBlockhash = _context5.sent.blockhash;
                _context5.next = 21;
                return this.signAndSendTransaction(txn);

              case 21:
                signature = _context5.sent;
                return _context5.abrupt("return", {
                  status: "success",
                  data: {
                    signature: signature
                  }
                });

              case 25:
                _context5.prev = 25;
                _context5.t0 = _context5["catch"](0);
                throw _context5.t0;

              case 28:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 25]]);
      }));

      function withdrawToken(_x14, _x15, _x16, _x17) {
        return _withdrawToken.apply(this, arguments);
      }

      return withdrawToken;
    }()
    /**
     * Withdraw native token from vault
     */

  }, {
    key: "withdrawSol",
    value: function () {
      var _withdrawSol = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(owner, mint, dcaData, amount) {
        var vaultAddress, ownerTokenAccount, ownerNativeMintAccount, vaultTokenAddress, vaultNativeMintAddress, transferAmount, txn, signature;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return (0, _utils.findVaultAddress)(owner, dcaData);

              case 3:
                vaultAddress = _context6.sent;
                _context6.next = 6;
                return (0, _utils.findAssociatedTokenAddress)(owner, mint);

              case 6:
                ownerTokenAccount = _context6.sent;
                _context6.next = 9;
                return (0, _utils.findAssociatedTokenAddress)(owner, _splToken.NATIVE_MINT);

              case 9:
                ownerNativeMintAccount = _context6.sent;
                _context6.next = 12;
                return (0, _utils.findAssociatedTokenAddress)(vaultAddress, mint);

              case 12:
                vaultTokenAddress = _context6.sent;
                _context6.next = 15;
                return (0, _utils.findAssociatedTokenAddress)(vaultAddress, _splToken.NATIVE_MINT);

              case 15:
                vaultNativeMintAddress = _context6.sent;
                transferAmount = (0, _utils.convertToLamports)(amount);
                txn = new _web.Transaction().add(_instruction.DcaInstruction.withdrawSol(owner, vaultAddress, mint, ownerTokenAccount, vaultTokenAddress, dcaData, _splToken.NATIVE_MINT, vaultNativeMintAddress, ownerNativeMintAccount, transferAmount));
                txn.feePayer = owner;
                _context6.next = 21;
                return this._connection.getLatestBlockhash();

              case 21:
                txn.recentBlockhash = _context6.sent.blockhash;
                _context6.next = 24;
                return this.signAndSendTransaction(txn);

              case 24:
                signature = _context6.sent;
                return _context6.abrupt("return", {
                  status: "success",
                  data: {
                    signature: signature
                  }
                });

              case 28:
                _context6.prev = 28;
                _context6.t0 = _context6["catch"](0);
                throw _context6.t0;

              case 31:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 28]]);
      }));

      function withdrawSol(_x18, _x19, _x20, _x21) {
        return _withdrawSol.apply(this, arguments);
      }

      return withdrawSol;
    }()
    /**
     * Swap token from sol
     */

  }, {
    key: "swapFromSol",
    value: function () {
      var _swapFromSol = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(owner, mint, dcaData) {
        var vault, vaultNativeMintAccount, vaultTokenAccount, poolKeyId, poolKeys, poolInfo, dcaInfo, amount, amountIn, currencyOut, slippage, _Liquidity$computeAmo, amountOut, minAmountOut, currentPrice, executionPrice, priceImpact, fee, txn, signature;

        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return (0, _utils.findVaultAddress)(owner, dcaData);

              case 3:
                vault = _context7.sent;
                _context7.next = 6;
                return (0, _utils.findAssociatedTokenAddress)(vault, _splToken.NATIVE_MINT);

              case 6:
                vaultNativeMintAccount = _context7.sent;
                _context7.next = 9;
                return (0, _utils.findAssociatedTokenAddress)(vault, mint);

              case 9:
                vaultTokenAccount = _context7.sent;
                _context7.next = 12;
                return (0, _utils.findPoolIdByBaseAndQuoteMint)(_splToken.NATIVE_MINT, mint);

              case 12:
                poolKeyId = _context7.sent;
                _context7.next = 15;
                return (0, _utils.fetchPoolKeys)(this._connection, new _web.PublicKey(poolKeyId));

              case 15:
                poolKeys = _context7.sent;
                _context7.next = 18;
                return _raydiumSdk.Liquidity.fetchInfo({
                  connection: this._connection,
                  poolKeys: poolKeys
                });

              case 18:
                poolInfo = _context7.sent;
                _context7.next = 21;
                return _dcaAccount.DcaAccount.getDcaAccountInfo(this._connection, dcaData);

              case 21:
                dcaInfo = _context7.sent;

                if (!(dcaInfo.dcaAmount.toString() === "0")) {
                  _context7.next = 24;
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
                vault, vaultNativeMintAccount, vaultTokenAccount, mint, owner, dcaData, _splToken.NATIVE_MINT, minAmountOut.raw));
                txn.feePayer = owner;
                _context7.next = 33;
                return this._connection.getLatestBlockhash();

              case 33:
                txn.recentBlockhash = _context7.sent.blockhash;
                _context7.next = 36;
                return this.signAndSendTransaction(txn);

              case 36:
                signature = _context7.sent;
                return _context7.abrupt("return", {
                  status: "success",
                  data: {
                    signature: signature
                  }
                });

              case 40:
                _context7.prev = 40;
                _context7.t0 = _context7["catch"](0);
                throw _context7.t0;

              case 43:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 40]]);
      }));

      function swapFromSol(_x22, _x23, _x24) {
        return _swapFromSol.apply(this, arguments);
      }

      return swapFromSol;
    }()
    /**
     * Swap Token to Sol
     */

  }, {
    key: "swapToSol",
    value: function () {
      var _swapToSol = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(owner, mint, dcaData) {
        var vault, vaultTokenAccount, vaultNativeMintAccount, poolKeyId, poolKeys, poolInfo, dcaInfo, mintInfo, amount, amountIn, currencyOut, slippage, _Liquidity$computeAmo2, amountOut, minAmountOut, currentPrice, executionPrice, priceImpact, fee, txn, signature;

        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return (0, _utils.findVaultAddress)(owner, dcaData);

              case 2:
                vault = _context8.sent;
                _context8.next = 5;
                return (0, _utils.findAssociatedTokenAddress)(vault, mint);

              case 5:
                vaultTokenAccount = _context8.sent;
                _context8.next = 8;
                return (0, _utils.findAssociatedTokenAddress)(vault, _splToken.NATIVE_MINT);

              case 8:
                vaultNativeMintAccount = _context8.sent;
                _context8.next = 11;
                return (0, _utils.findPoolIdByBaseAndQuoteMint)(mint, _splToken.NATIVE_MINT);

              case 11:
                poolKeyId = _context8.sent;
                _context8.next = 14;
                return (0, _utils.fetchPoolKeys)(this._connection, new _web.PublicKey(poolKeyId));

              case 14:
                poolKeys = _context8.sent;
                _context8.next = 17;
                return _raydiumSdk.Liquidity.fetchInfo({
                  connection: this._connection,
                  poolKeys: poolKeys
                });

              case 17:
                poolInfo = _context8.sent;
                _context8.next = 20;
                return _dcaAccount.DcaAccount.getDcaAccountInfo(this._connection, dcaData);

              case 20:
                dcaInfo = _context8.sent;

                if (!(dcaInfo.dcaAmount.toString() === "0")) {
                  _context8.next = 23;
                  break;
                }

                throw new Error("Dca amount is zero");

              case 23:
                _context8.next = 25;
                return (0, _utils.getMintInfo)(this._connection, mint);

              case 25:
                mintInfo = _context8.sent;
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
                vault, vaultNativeMintAccount, vaultTokenAccount, mint, owner, dcaData, _splToken.NATIVE_MINT, minAmountOut.raw));
                txn.feePayer = owner;
                _context8.next = 35;
                return this._connection.getLatestBlockhash();

              case 35:
                txn.recentBlockhash = _context8.sent.blockhash;
                _context8.next = 38;
                return this.signAndSendTransaction(txn);

              case 38:
                signature = _context8.sent;
                return _context8.abrupt("return", {
                  status: "success",
                  data: {
                    signature: signature
                  }
                });

              case 40:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function swapToSol(_x25, _x26, _x27) {
        return _swapToSol.apply(this, arguments);
      }

      return swapToSol;
    }()
    /**
     * Fund non-native token to existing vault
     */

  }, {
    key: "fundToken",
    value: function () {
      var _fundToken = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(owner, mint, dcaData, amount) {
        var vault, ownerTokenAccount, vaultTokenAccount, mintInfo, transferAmount, txn, signature;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return (0, _utils.findVaultAddress)(owner, dcaData);

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
                return (0, _utils.getMintInfo)(this._connection, mint);

              case 12:
                mintInfo = _context9.sent;
                transferAmount = (0, _utils.convertToLamports)(amount, mintInfo.decimals);
                txn = new _web.Transaction().add(_instruction.DcaInstruction.fundToken(owner, vault, mint, ownerTokenAccount, vaultTokenAccount, dcaData, transferAmount));
                txn.feePayer = owner;
                _context9.next = 18;
                return this._connection.getLatestBlockhash();

              case 18:
                txn.recentBlockhash = _context9.sent.blockhash;
                _context9.next = 21;
                return this.signAndSendTransaction(txn);

              case 21:
                signature = _context9.sent;
                return _context9.abrupt("return", {
                  status: "success",
                  data: {
                    signature: signature
                  }
                });

              case 25:
                _context9.prev = 25;
                _context9.t0 = _context9["catch"](0);
                throw _context9.t0;

              case 28:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 25]]);
      }));

      function fundToken(_x28, _x29, _x30, _x31) {
        return _fundToken.apply(this, arguments);
      }

      return fundToken;
    }()
    /**
     * Fund native token to existing vault
     */

  }, {
    key: "fundSol",
    value: function () {
      var _fundSol = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(owner, mint, dcaData, amount) {
        var vault, ownerTokenAccount, vaultTokenAccount, vaultNativeMintAccount, transferAmount, txn, signature;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                _context10.next = 3;
                return (0, _utils.findVaultAddress)(owner, dcaData);

              case 3:
                vault = _context10.sent;
                _context10.next = 6;
                return (0, _utils.findAssociatedTokenAddress)(owner, mint);

              case 6:
                ownerTokenAccount = _context10.sent;
                _context10.next = 9;
                return (0, _utils.findAssociatedTokenAddress)(vault, mint);

              case 9:
                vaultTokenAccount = _context10.sent;
                _context10.next = 12;
                return (0, _utils.findAssociatedTokenAddress)(vault, _splToken.NATIVE_MINT);

              case 12:
                vaultNativeMintAccount = _context10.sent;
                transferAmount = (0, _utils.convertToLamports)(amount);
                txn = new _web.Transaction().add(_instruction.DcaInstruction.fundSol(owner, vault, mint, _splToken.NATIVE_MINT, ownerTokenAccount, vaultNativeMintAccount, vaultTokenAccount, dcaData, transferAmount));
                txn.feePayer = owner;
                _context10.next = 18;
                return this._connection.getLatestBlockhash();

              case 18:
                txn.recentBlockhash = _context10.sent.blockhash;
                signature = this.signAndSendTransaction(txn);
                return _context10.abrupt("return", {
                  status: "success",
                  data: {
                    signature: signature
                  }
                });

              case 23:
                _context10.prev = 23;
                _context10.t0 = _context10["catch"](0);
                throw _context10.t0;

              case 26:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[0, 23]]);
      }));

      function fundSol(_x32, _x33, _x34, _x35) {
        return _fundSol.apply(this, arguments);
      }

      return fundSol;
    }()
  }]);

  return DcaClient;
}();

exports.DcaClient = DcaClient;
//# sourceMappingURL=client.js.map