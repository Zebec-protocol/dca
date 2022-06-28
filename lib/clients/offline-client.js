"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DcaOfflineClient = void 0;

var _base = require("./base");

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DcaOfflineClient = /*#__PURE__*/function (_DcaClient) {
  _inherits(DcaOfflineClient, _DcaClient);

  var _super = _createSuper(DcaOfflineClient);

  function DcaOfflineClient(params) {
    var _this;

    _classCallCheck(this, DcaOfflineClient);

    _this = _super.call(this, {
      connection: params.connection,
      commitment: params.commitment,
      preflightCommitment: params.preflightCommitment
    });

    _defineProperty(_assertThisInitialized(_this), "_payer", void 0);

    _this._payer = params.payer;
    return _this;
  }

  _createClass(DcaOfflineClient, [{
    key: "sendTransaction",
    value: function () {
      var _sendTransaction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(txn, signers) {
        var blockhash, signature;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this._connection.getLatestBlockhash();

              case 3:
                blockhash = _context.sent;
                txn.recentBlockhash = blockhash.blockhash;
                txn.lastValidBlockHeight = blockhash.lastValidBlockHeight;
                _context.next = 8;
                return this._connection.sendTransaction(txn, signers, {
                  preflightCommitment: this._commitment,
                  skipPreflight: false
                });

              case 8:
                signature = _context.sent;
                _context.next = 11;
                return this._connection.confirmTransaction({
                  blockhash: blockhash.blockhash,
                  lastValidBlockHeight: blockhash.lastValidBlockHeight,
                  signature: signature
                }, this._commitment);

              case 11:
                return _context.abrupt("return", signature);

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 14]]);
      }));

      function sendTransaction(_x, _x2) {
        return _sendTransaction.apply(this, arguments);
      }

      return sendTransaction;
    }()
    /**
     * Deposit non-native token in dca program vault
     */

  }, {
    key: "depositToken",
    value: function () {
      var _depositToken = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(owner, mint, amount) {
        var _yield$this$makeDepos, transaction, dcaAccount, signature;

        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.makeDepositTokenTransaction(owner, mint, amount);

              case 3:
                _yield$this$makeDepos = _context2.sent;
                transaction = _yield$this$makeDepos.transaction;
                dcaAccount = _yield$this$makeDepos.dcaAccount;
                _context2.next = 8;
                return this.sendTransaction(transaction, [this._payer, dcaAccount]);

              case 8:
                signature = _context2.sent;
                return _context2.abrupt("return", {
                  status: "success",
                  data: {
                    signature: signature,
                    dcaAccount: dcaAccount.publicKey
                  }
                });

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 12]]);
      }));

      function depositToken(_x3, _x4, _x5) {
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
        var _yield$this$makeDepos2, transaction, dcaAccount, signature;

        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.makeDepositSolTransaction(owner, mint, amount);

              case 3:
                _yield$this$makeDepos2 = _context3.sent;
                transaction = _yield$this$makeDepos2.transaction;
                dcaAccount = _yield$this$makeDepos2.dcaAccount;
                _context3.next = 8;
                return this.sendTransaction(transaction, [this._payer, dcaAccount]);

              case 8:
                signature = _context3.sent;
                return _context3.abrupt("return", {
                  status: "success",
                  data: {
                    signature: signature,
                    dcaAccount: dcaAccount.publicKey
                  }
                });

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](0);
                throw _context3.t0;

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 12]]);
      }));

      function depositSol(_x6, _x7, _x8) {
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
      var _initialize = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(owner, mint, dcaAccount, startTime, dcaAmount, dcaTime) {
        var transaction, signature;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.makeInitializeTransaction(owner, mint, dcaAccount, startTime, dcaAmount, dcaTime);

              case 3:
                transaction = _context4.sent;
                _context4.next = 6;
                return this.sendTransaction(transaction, [this._payer]);

              case 6:
                signature = _context4.sent;
                return _context4.abrupt("return", {
                  status: "success",
                  data: {
                    signature: signature
                  }
                });

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](0);
                throw _context4.t0;

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 10]]);
      }));

      function initialize(_x9, _x10, _x11, _x12, _x13, _x14) {
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
      var _withdrawToken = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(owner, mint, dcaAccount, amount) {
        var transaction, signature;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return this.makeWithdrawTokenTransaction(owner, mint, dcaAccount, amount);

              case 3:
                transaction = _context5.sent;
                _context5.next = 6;
                return this.sendTransaction(transaction, [this._payer]);

              case 6:
                signature = _context5.sent;
                return _context5.abrupt("return", {
                  status: "success",
                  data: {
                    signature: signature
                  }
                });

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](0);
                throw _context5.t0;

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 10]]);
      }));

      function withdrawToken(_x15, _x16, _x17, _x18) {
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
      var _withdrawSol = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(owner, mint, dcaAccount, amount) {
        var transaction, signature;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return this.makeWithdrawSolTransaction(owner, mint, dcaAccount, amount);

              case 3:
                transaction = _context6.sent;
                _context6.next = 6;
                return this.sendTransaction(transaction, [this._payer]);

              case 6:
                signature = _context6.sent;
                return _context6.abrupt("return", {
                  status: "success",
                  data: {
                    signature: signature
                  }
                });

              case 10:
                _context6.prev = 10;
                _context6.t0 = _context6["catch"](0);
                throw _context6.t0;

              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 10]]);
      }));

      function withdrawSol(_x19, _x20, _x21, _x22) {
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
      var _swapFromSol = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(owner, mint, dcaAccount) {
        var transaction, signature;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return this.makeSwapFromSolTransaction(owner, mint, dcaAccount);

              case 3:
                transaction = _context7.sent;
                _context7.next = 6;
                return this.sendTransaction(transaction, [this._payer]);

              case 6:
                signature = _context7.sent;
                return _context7.abrupt("return", {
                  status: "success",
                  data: {
                    signature: signature
                  }
                });

              case 10:
                _context7.prev = 10;
                _context7.t0 = _context7["catch"](0);
                throw _context7.t0;

              case 13:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 10]]);
      }));

      function swapFromSol(_x23, _x24, _x25) {
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
      var _swapToSol = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(owner, mint, dcaAccount) {
        var transaction, signature;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.makeSwapToSolTransaction(owner, mint, dcaAccount);

              case 2:
                transaction = _context8.sent;
                _context8.next = 5;
                return this.sendTransaction(transaction, [this._payer]);

              case 5:
                signature = _context8.sent;
                return _context8.abrupt("return", {
                  status: "success",
                  data: {
                    signature: signature
                  }
                });

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function swapToSol(_x26, _x27, _x28) {
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
      var _fundToken = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(owner, mint, dcaAccount, amount) {
        var transaction, signature;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return this.makeFundTokenTransaction(owner, mint, dcaAccount, amount);

              case 3:
                transaction = _context9.sent;
                _context9.next = 6;
                return this.sendTransaction(transaction, [this._payer]);

              case 6:
                signature = _context9.sent;
                return _context9.abrupt("return", {
                  status: "success",
                  data: {
                    signature: signature
                  }
                });

              case 10:
                _context9.prev = 10;
                _context9.t0 = _context9["catch"](0);
                throw _context9.t0;

              case 13:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 10]]);
      }));

      function fundToken(_x29, _x30, _x31, _x32) {
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
      var _fundSol = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(owner, mint, dcaAccount, amount) {
        var transaction, signature;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                _context10.next = 3;
                return this.makeFundSolTransaction(owner, mint, dcaAccount, amount);

              case 3:
                transaction = _context10.sent;
                _context10.next = 6;
                return this.sendTransaction(transaction, [this._payer]);

              case 6:
                signature = _context10.sent;
                return _context10.abrupt("return", {
                  status: "success",
                  data: {
                    signature: signature
                  }
                });

              case 10:
                _context10.prev = 10;
                _context10.t0 = _context10["catch"](0);
                throw _context10.t0;

              case 13:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[0, 10]]);
      }));

      function fundSol(_x33, _x34, _x35, _x36) {
        return _fundSol.apply(this, arguments);
      }

      return fundSol;
    }()
  }]);

  return DcaOfflineClient;
}(_base.DcaClient);

exports.DcaOfflineClient = DcaOfflineClient;
//# sourceMappingURL=offline-client.js.map