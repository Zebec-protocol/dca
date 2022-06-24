"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true,
});
exports.fetchAllPoolKeysDevnet = fetchAllPoolKeysDevnet;
exports.fetchPoolKeysDevnet = fetchPoolKeysDevnet;

var _raydiumSdk = require("@raydium-io/raydium-sdk");

var _web = require("@solana/web3.js");

var _constants = require("../constants");

function _typeof(obj) {
	"@babel/helpers - typeof";
	return (
		(_typeof =
			"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
				? function (obj) {
						return typeof obj;
				  }
				: function (obj) {
						return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype
							? "symbol"
							: typeof obj;
				  }),
		_typeof(obj)
	);
}

function _createForOfIteratorHelper(o, allowArrayLike) {
	var it = (typeof Symbol !== "undefined" && o[Symbol.iterator]) || o["@@iterator"];
	if (!it) {
		if (
			Array.isArray(o) ||
			(it = _unsupportedIterableToArray(o)) ||
			(allowArrayLike && o && typeof o.length === "number")
		) {
			if (it) o = it;
			var i = 0;
			var F = function F() {};
			return {
				s: F,
				n: function n() {
					if (i >= o.length) return { done: true };
					return { done: false, value: o[i++] };
				},
				e: function e(_e) {
					throw _e;
				},
				f: F,
			};
		}
		throw new TypeError(
			"Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
		);
	}
	var normalCompletion = true,
		didErr = false,
		err;
	return {
		s: function s() {
			it = it.call(o);
		},
		n: function n() {
			var step = it.next();
			normalCompletion = step.done;
			return step;
		},
		e: function e(_e2) {
			didErr = true;
			err = _e2;
		},
		f: function f() {
			try {
				if (!normalCompletion && it.return != null) it.return();
			} finally {
				if (didErr) throw err;
			}
		},
	};
}

function _unsupportedIterableToArray(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) {
		arr2[i] = arr[i];
	}
	return arr2;
}

function ownKeys(object, enumerableOnly) {
	var keys = Object.keys(object);
	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(object);
		enumerableOnly &&
			(symbols = symbols.filter(function (sym) {
				return Object.getOwnPropertyDescriptor(object, sym).enumerable;
			})),
			keys.push.apply(keys, symbols);
	}
	return keys;
}

function _objectSpread(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = null != arguments[i] ? arguments[i] : {};
		i % 2
			? ownKeys(Object(source), !0).forEach(function (key) {
					_defineProperty(target, key, source[key]);
			  })
			: Object.getOwnPropertyDescriptors
			? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
			: ownKeys(Object(source)).forEach(function (key) {
					Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
			  });
	}
	return target;
}

function _defineProperty(obj, key, value) {
	if (key in obj) {
		Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
	} else {
		obj[key] = value;
	}
	return obj;
}

function _regeneratorRuntime() {
	"use strict";
	/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime =
		function _regeneratorRuntime() {
			return exports;
		};
	var exports = {},
		Op = Object.prototype,
		hasOwn = Op.hasOwnProperty,
		$Symbol = "function" == typeof Symbol ? Symbol : {},
		iteratorSymbol = $Symbol.iterator || "@@iterator",
		asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
		toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	function define(obj, key, value) {
		return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key];
	}
	try {
		define({}, "");
	} catch (err) {
		define = function define(obj, key, value) {
			return (obj[key] = value);
		};
	}
	function wrap(innerFn, outerFn, self, tryLocsList) {
		var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
			generator = Object.create(protoGenerator.prototype),
			context = new Context(tryLocsList || []);
		return (
			(generator._invoke = (function (innerFn, self, context) {
				var state = "suspendedStart";
				return function (method, arg) {
					if ("executing" === state) throw new Error("Generator is already running");
					if ("completed" === state) {
						if ("throw" === method) throw arg;
						return doneResult();
					}
					for (context.method = method, context.arg = arg; ; ) {
						var delegate = context.delegate;
						if (delegate) {
							var delegateResult = maybeInvokeDelegate(delegate, context);
							if (delegateResult) {
								if (delegateResult === ContinueSentinel) continue;
								return delegateResult;
							}
						}
						if ("next" === context.method) context.sent = context._sent = context.arg;
						else if ("throw" === context.method) {
							if ("suspendedStart" === state) throw ((state = "completed"), context.arg);
							context.dispatchException(context.arg);
						} else "return" === context.method && context.abrupt("return", context.arg);
						state = "executing";
						var record = tryCatch(innerFn, self, context);
						if ("normal" === record.type) {
							if (((state = context.done ? "completed" : "suspendedYield"), record.arg === ContinueSentinel)) continue;
							return { value: record.arg, done: context.done };
						}
						"throw" === record.type && ((state = "completed"), (context.method = "throw"), (context.arg = record.arg));
					}
				};
			})(innerFn, self, context)),
			generator
		);
	}
	function tryCatch(fn, obj, arg) {
		try {
			return { type: "normal", arg: fn.call(obj, arg) };
		} catch (err) {
			return { type: "throw", arg: err };
		}
	}
	exports.wrap = wrap;
	var ContinueSentinel = {};
	function Generator() {}
	function GeneratorFunction() {}
	function GeneratorFunctionPrototype() {}
	var IteratorPrototype = {};
	define(IteratorPrototype, iteratorSymbol, function () {
		return this;
	});
	var getProto = Object.getPrototypeOf,
		NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	NativeIteratorPrototype &&
		NativeIteratorPrototype !== Op &&
		hasOwn.call(NativeIteratorPrototype, iteratorSymbol) &&
		(IteratorPrototype = NativeIteratorPrototype);
	var Gp = (GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype));
	function defineIteratorMethods(prototype) {
		["next", "throw", "return"].forEach(function (method) {
			define(prototype, method, function (arg) {
				return this._invoke(method, arg);
			});
		});
	}
	function AsyncIterator(generator, PromiseImpl) {
		function invoke(method, arg, resolve, reject) {
			var record = tryCatch(generator[method], generator, arg);
			if ("throw" !== record.type) {
				var result = record.arg,
					value = result.value;
				return value && "object" == _typeof(value) && hasOwn.call(value, "__await")
					? PromiseImpl.resolve(value.__await).then(
							function (value) {
								invoke("next", value, resolve, reject);
							},
							function (err) {
								invoke("throw", err, resolve, reject);
							},
					  )
					: PromiseImpl.resolve(value).then(
							function (unwrapped) {
								(result.value = unwrapped), resolve(result);
							},
							function (error) {
								return invoke("throw", error, resolve, reject);
							},
					  );
			}
			reject(record.arg);
		}
		var previousPromise;
		this._invoke = function (method, arg) {
			function callInvokeWithMethodAndArg() {
				return new PromiseImpl(function (resolve, reject) {
					invoke(method, arg, resolve, reject);
				});
			}
			return (previousPromise = previousPromise
				? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg)
				: callInvokeWithMethodAndArg());
		};
	}
	function maybeInvokeDelegate(delegate, context) {
		var method = delegate.iterator[context.method];
		if (undefined === method) {
			if (((context.delegate = null), "throw" === context.method)) {
				if (
					delegate.iterator.return &&
					((context.method = "return"),
					(context.arg = undefined),
					maybeInvokeDelegate(delegate, context),
					"throw" === context.method)
				)
					return ContinueSentinel;
				(context.method = "throw"), (context.arg = new TypeError("The iterator does not provide a 'throw' method"));
			}
			return ContinueSentinel;
		}
		var record = tryCatch(method, delegate.iterator, context.arg);
		if ("throw" === record.type)
			return (context.method = "throw"), (context.arg = record.arg), (context.delegate = null), ContinueSentinel;
		var info = record.arg;
		return info
			? info.done
				? ((context[delegate.resultName] = info.value),
				  (context.next = delegate.nextLoc),
				  "return" !== context.method && ((context.method = "next"), (context.arg = undefined)),
				  (context.delegate = null),
				  ContinueSentinel)
				: info
			: ((context.method = "throw"),
			  (context.arg = new TypeError("iterator result is not an object")),
			  (context.delegate = null),
			  ContinueSentinel);
	}
	function pushTryEntry(locs) {
		var entry = { tryLoc: locs[0] };
		1 in locs && (entry.catchLoc = locs[1]),
			2 in locs && ((entry.finallyLoc = locs[2]), (entry.afterLoc = locs[3])),
			this.tryEntries.push(entry);
	}
	function resetTryEntry(entry) {
		var record = entry.completion || {};
		(record.type = "normal"), delete record.arg, (entry.completion = record);
	}
	function Context(tryLocsList) {
		(this.tryEntries = [{ tryLoc: "root" }]), tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
	}
	function values(iterable) {
		if (iterable) {
			var iteratorMethod = iterable[iteratorSymbol];
			if (iteratorMethod) return iteratorMethod.call(iterable);
			if ("function" == typeof iterable.next) return iterable;
			if (!isNaN(iterable.length)) {
				var i = -1,
					next = function next() {
						for (; ++i < iterable.length; ) {
							if (hasOwn.call(iterable, i)) return (next.value = iterable[i]), (next.done = !1), next;
						}
						return (next.value = undefined), (next.done = !0), next;
					};
				return (next.next = next);
			}
		}
		return { next: doneResult };
	}
	function doneResult() {
		return { value: undefined, done: !0 };
	}
	return (
		(GeneratorFunction.prototype = GeneratorFunctionPrototype),
		define(Gp, "constructor", GeneratorFunctionPrototype),
		define(GeneratorFunctionPrototype, "constructor", GeneratorFunction),
		(GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction")),
		(exports.isGeneratorFunction = function (genFun) {
			var ctor = "function" == typeof genFun && genFun.constructor;
			return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
		}),
		(exports.mark = function (genFun) {
			return (
				Object.setPrototypeOf
					? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype)
					: ((genFun.__proto__ = GeneratorFunctionPrototype), define(genFun, toStringTagSymbol, "GeneratorFunction")),
				(genFun.prototype = Object.create(Gp)),
				genFun
			);
		}),
		(exports.awrap = function (arg) {
			return { __await: arg };
		}),
		defineIteratorMethods(AsyncIterator.prototype),
		define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
			return this;
		}),
		(exports.AsyncIterator = AsyncIterator),
		(exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
			void 0 === PromiseImpl && (PromiseImpl = Promise);
			var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
			return exports.isGeneratorFunction(outerFn)
				? iter
				: iter.next().then(function (result) {
						return result.done ? result.value : iter.next();
				  });
		}),
		defineIteratorMethods(Gp),
		define(Gp, toStringTagSymbol, "Generator"),
		define(Gp, iteratorSymbol, function () {
			return this;
		}),
		define(Gp, "toString", function () {
			return "[object Generator]";
		}),
		(exports.keys = function (object) {
			var keys = [];
			for (var key in object) {
				keys.push(key);
			}
			return (
				keys.reverse(),
				function next() {
					for (; keys.length; ) {
						var key = keys.pop();
						if (key in object) return (next.value = key), (next.done = !1), next;
					}
					return (next.done = !0), next;
				}
			);
		}),
		(exports.values = values),
		(Context.prototype = {
			constructor: Context,
			reset: function reset(skipTempReset) {
				if (
					((this.prev = 0),
					(this.next = 0),
					(this.sent = this._sent = undefined),
					(this.done = !1),
					(this.delegate = null),
					(this.method = "next"),
					(this.arg = undefined),
					this.tryEntries.forEach(resetTryEntry),
					!skipTempReset)
				)
					for (var name in this) {
						"t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
					}
			},
			stop: function stop() {
				this.done = !0;
				var rootRecord = this.tryEntries[0].completion;
				if ("throw" === rootRecord.type) throw rootRecord.arg;
				return this.rval;
			},
			dispatchException: function dispatchException(exception) {
				if (this.done) throw exception;
				var context = this;
				function handle(loc, caught) {
					return (
						(record.type = "throw"),
						(record.arg = exception),
						(context.next = loc),
						caught && ((context.method = "next"), (context.arg = undefined)),
						!!caught
					);
				}
				for (var i = this.tryEntries.length - 1; i >= 0; --i) {
					var entry = this.tryEntries[i],
						record = entry.completion;
					if ("root" === entry.tryLoc) return handle("end");
					if (entry.tryLoc <= this.prev) {
						var hasCatch = hasOwn.call(entry, "catchLoc"),
							hasFinally = hasOwn.call(entry, "finallyLoc");
						if (hasCatch && hasFinally) {
							if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
							if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
						} else if (hasCatch) {
							if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
						} else {
							if (!hasFinally) throw new Error("try statement without catch or finally");
							if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
						}
					}
				}
			},
			abrupt: function abrupt(type, arg) {
				for (var i = this.tryEntries.length - 1; i >= 0; --i) {
					var entry = this.tryEntries[i];
					if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
						var finallyEntry = entry;
						break;
					}
				}
				finallyEntry &&
					("break" === type || "continue" === type) &&
					finallyEntry.tryLoc <= arg &&
					arg <= finallyEntry.finallyLoc &&
					(finallyEntry = null);
				var record = finallyEntry ? finallyEntry.completion : {};
				return (
					(record.type = type),
					(record.arg = arg),
					finallyEntry
						? ((this.method = "next"), (this.next = finallyEntry.finallyLoc), ContinueSentinel)
						: this.complete(record)
				);
			},
			complete: function complete(record, afterLoc) {
				if ("throw" === record.type) throw record.arg;
				return (
					"break" === record.type || "continue" === record.type
						? (this.next = record.arg)
						: "return" === record.type
						? ((this.rval = this.arg = record.arg), (this.method = "return"), (this.next = "end"))
						: "normal" === record.type && afterLoc && (this.next = afterLoc),
					ContinueSentinel
				);
			},
			finish: function finish(finallyLoc) {
				for (var i = this.tryEntries.length - 1; i >= 0; --i) {
					var entry = this.tryEntries[i];
					if (entry.finallyLoc === finallyLoc)
						return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
				}
			},
			catch: function _catch(tryLoc) {
				for (var i = this.tryEntries.length - 1; i >= 0; --i) {
					var entry = this.tryEntries[i];
					if (entry.tryLoc === tryLoc) {
						var record = entry.completion;
						if ("throw" === record.type) {
							var thrown = record.arg;
							resetTryEntry(entry);
						}
						return thrown;
					}
				}
				throw new Error("illegal catch attempt");
			},
			delegateYield: function delegateYield(iterable, resultName, nextLoc) {
				return (
					(this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }),
					"next" === this.method && (this.arg = undefined),
					ContinueSentinel
				);
			},
		}),
		exports
	);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	try {
		var info = gen[key](arg);
		var value = info.value;
	} catch (error) {
		reject(error);
		return;
	}
	if (info.done) {
		resolve(value);
	} else {
		Promise.resolve(value).then(_next, _throw);
	}
}

function _asyncToGenerator(fn) {
	return function () {
		var self = this,
			args = arguments;
		return new Promise(function (resolve, reject) {
			var gen = fn.apply(self, args);
			function _next(value) {
				asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
			}
			function _throw(err) {
				asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
			}
			_next(undefined);
		});
	};
}

var LIQUIDITY_PROGRAM_ID_V4 = _constants.DEVNET_LIQUIDITY_PROGRAM_ID_V4;
var SERUM_PROGRAM_ID_V3 = _constants.DEVNET_SERUM_PROGRAM_ID_V3;

function getAssociatedId(_x) {
	return _getAssociatedId.apply(this, arguments);
}

function _getAssociatedId() {
	_getAssociatedId = _asyncToGenerator(
		/*#__PURE__*/ _regeneratorRuntime().mark(function _callee(_ref) {
			var programId, marketId, _yield$findProgramAdd, publicKey;

			return _regeneratorRuntime().wrap(function _callee$(_context) {
				while (1) {
					switch ((_context.prev = _context.next)) {
						case 0:
							(programId = _ref.programId), (marketId = _ref.marketId);
							_context.next = 3;
							return (0, _raydiumSdk.findProgramAddress)(
								[programId.toBuffer(), marketId.toBuffer(), Buffer.from("amm_associated_seed", "utf-8")],
								programId,
							);

						case 3:
							_yield$findProgramAdd = _context.sent;
							publicKey = _yield$findProgramAdd.publicKey;
							return _context.abrupt("return", publicKey);

						case 6:
						case "end":
							return _context.stop();
					}
				}
			}, _callee);
		}),
	);
	return _getAssociatedId.apply(this, arguments);
}

function getAssociatedAuthority(_x2) {
	return _getAssociatedAuthority.apply(this, arguments);
}

function _getAssociatedAuthority() {
	_getAssociatedAuthority = _asyncToGenerator(
		/*#__PURE__*/ _regeneratorRuntime().mark(function _callee2(_ref2) {
			var programId;
			return _regeneratorRuntime().wrap(function _callee2$(_context2) {
				while (1) {
					switch ((_context2.prev = _context2.next)) {
						case 0:
							programId = _ref2.programId;
							return _context2.abrupt(
								"return",
								(0, _raydiumSdk.findProgramAddress)(
									// new Uint8Array(Buffer.from('amm authority'.replace('\u00A0', ' '), 'utf-8'))
									[Buffer.from([97, 109, 109, 32, 97, 117, 116, 104, 111, 114, 105, 116, 121])],
									programId,
								),
							);

						case 2:
						case "end":
							return _context2.stop();
					}
				}
			}, _callee2);
		}),
	);
	return _getAssociatedAuthority.apply(this, arguments);
}

function getAssociatedBaseVault(_x3) {
	return _getAssociatedBaseVault.apply(this, arguments);
}

function _getAssociatedBaseVault() {
	_getAssociatedBaseVault = _asyncToGenerator(
		/*#__PURE__*/ _regeneratorRuntime().mark(function _callee3(_ref3) {
			var programId, marketId, _yield$findProgramAdd2, publicKey;

			return _regeneratorRuntime().wrap(function _callee3$(_context3) {
				while (1) {
					switch ((_context3.prev = _context3.next)) {
						case 0:
							(programId = _ref3.programId), (marketId = _ref3.marketId);
							_context3.next = 3;
							return (0, _raydiumSdk.findProgramAddress)(
								[programId.toBuffer(), marketId.toBuffer(), Buffer.from("coin_vault_associated_seed", "utf-8")],
								programId,
							);

						case 3:
							_yield$findProgramAdd2 = _context3.sent;
							publicKey = _yield$findProgramAdd2.publicKey;
							return _context3.abrupt("return", publicKey);

						case 6:
						case "end":
							return _context3.stop();
					}
				}
			}, _callee3);
		}),
	);
	return _getAssociatedBaseVault.apply(this, arguments);
}

function getAssociatedQuoteVault(_x4) {
	return _getAssociatedQuoteVault.apply(this, arguments);
}

function _getAssociatedQuoteVault() {
	_getAssociatedQuoteVault = _asyncToGenerator(
		/*#__PURE__*/ _regeneratorRuntime().mark(function _callee4(_ref4) {
			var programId, marketId, _yield$findProgramAdd3, publicKey;

			return _regeneratorRuntime().wrap(function _callee4$(_context4) {
				while (1) {
					switch ((_context4.prev = _context4.next)) {
						case 0:
							(programId = _ref4.programId), (marketId = _ref4.marketId);
							_context4.next = 3;
							return (0, _raydiumSdk.findProgramAddress)(
								[programId.toBuffer(), marketId.toBuffer(), Buffer.from("pc_vault_associated_seed", "utf-8")],
								programId,
							);

						case 3:
							_yield$findProgramAdd3 = _context4.sent;
							publicKey = _yield$findProgramAdd3.publicKey;
							return _context4.abrupt("return", publicKey);

						case 6:
						case "end":
							return _context4.stop();
					}
				}
			}, _callee4);
		}),
	);
	return _getAssociatedQuoteVault.apply(this, arguments);
}

function getAssociatedLpMint(_x5) {
	return _getAssociatedLpMint.apply(this, arguments);
}

function _getAssociatedLpMint() {
	_getAssociatedLpMint = _asyncToGenerator(
		/*#__PURE__*/ _regeneratorRuntime().mark(function _callee5(_ref5) {
			var programId, marketId, _yield$findProgramAdd4, publicKey;

			return _regeneratorRuntime().wrap(function _callee5$(_context5) {
				while (1) {
					switch ((_context5.prev = _context5.next)) {
						case 0:
							(programId = _ref5.programId), (marketId = _ref5.marketId);
							_context5.next = 3;
							return (0, _raydiumSdk.findProgramAddress)(
								[programId.toBuffer(), marketId.toBuffer(), Buffer.from("lp_mint_associated_seed", "utf-8")],
								programId,
							);

						case 3:
							_yield$findProgramAdd4 = _context5.sent;
							publicKey = _yield$findProgramAdd4.publicKey;
							return _context5.abrupt("return", publicKey);

						case 6:
						case "end":
							return _context5.stop();
					}
				}
			}, _callee5);
		}),
	);
	return _getAssociatedLpMint.apply(this, arguments);
}

function getAssociatedLpVault(_x6) {
	return _getAssociatedLpVault.apply(this, arguments);
}

function _getAssociatedLpVault() {
	_getAssociatedLpVault = _asyncToGenerator(
		/*#__PURE__*/ _regeneratorRuntime().mark(function _callee6(_ref6) {
			var programId, marketId, _yield$findProgramAdd5, publicKey;

			return _regeneratorRuntime().wrap(function _callee6$(_context6) {
				while (1) {
					switch ((_context6.prev = _context6.next)) {
						case 0:
							(programId = _ref6.programId), (marketId = _ref6.marketId);
							_context6.next = 3;
							return (0, _raydiumSdk.findProgramAddress)(
								[programId.toBuffer(), marketId.toBuffer(), Buffer.from("temp_lp_token_associated_seed", "utf-8")],
								programId,
							);

						case 3:
							_yield$findProgramAdd5 = _context6.sent;
							publicKey = _yield$findProgramAdd5.publicKey;
							return _context6.abrupt("return", publicKey);

						case 6:
						case "end":
							return _context6.stop();
					}
				}
			}, _callee6);
		}),
	);
	return _getAssociatedLpVault.apply(this, arguments);
}

function getAssociatedTargetOrders(_x7) {
	return _getAssociatedTargetOrders.apply(this, arguments);
}

function _getAssociatedTargetOrders() {
	_getAssociatedTargetOrders = _asyncToGenerator(
		/*#__PURE__*/ _regeneratorRuntime().mark(function _callee7(_ref7) {
			var programId, marketId, _yield$findProgramAdd6, publicKey;

			return _regeneratorRuntime().wrap(function _callee7$(_context7) {
				while (1) {
					switch ((_context7.prev = _context7.next)) {
						case 0:
							(programId = _ref7.programId), (marketId = _ref7.marketId);
							_context7.next = 3;
							return (0, _raydiumSdk.findProgramAddress)(
								[programId.toBuffer(), marketId.toBuffer(), Buffer.from("target_associated_seed", "utf-8")],
								programId,
							);

						case 3:
							_yield$findProgramAdd6 = _context7.sent;
							publicKey = _yield$findProgramAdd6.publicKey;
							return _context7.abrupt("return", publicKey);

						case 6:
						case "end":
							return _context7.stop();
					}
				}
			}, _callee7);
		}),
	);
	return _getAssociatedTargetOrders.apply(this, arguments);
}

function getAssociatedWithdrawQueue(_x8) {
	return _getAssociatedWithdrawQueue.apply(this, arguments);
}

function _getAssociatedWithdrawQueue() {
	_getAssociatedWithdrawQueue = _asyncToGenerator(
		/*#__PURE__*/ _regeneratorRuntime().mark(function _callee8(_ref8) {
			var programId, marketId, _yield$findProgramAdd7, publicKey;

			return _regeneratorRuntime().wrap(function _callee8$(_context8) {
				while (1) {
					switch ((_context8.prev = _context8.next)) {
						case 0:
							(programId = _ref8.programId), (marketId = _ref8.marketId);
							_context8.next = 3;
							return (0, _raydiumSdk.findProgramAddress)(
								[programId.toBuffer(), marketId.toBuffer(), Buffer.from("withdraw_associated_seed", "utf-8")],
								programId,
							);

						case 3:
							_yield$findProgramAdd7 = _context8.sent;
							publicKey = _yield$findProgramAdd7.publicKey;
							return _context8.abrupt("return", publicKey);

						case 6:
						case "end":
							return _context8.stop();
					}
				}
			}, _callee8);
		}),
	);
	return _getAssociatedWithdrawQueue.apply(this, arguments);
}

function getAssociatedOpenOrders(_x9) {
	return _getAssociatedOpenOrders.apply(this, arguments);
}

function _getAssociatedOpenOrders() {
	_getAssociatedOpenOrders = _asyncToGenerator(
		/*#__PURE__*/ _regeneratorRuntime().mark(function _callee9(_ref9) {
			var programId, marketId, _yield$findProgramAdd8, publicKey;

			return _regeneratorRuntime().wrap(function _callee9$(_context9) {
				while (1) {
					switch ((_context9.prev = _context9.next)) {
						case 0:
							(programId = _ref9.programId), (marketId = _ref9.marketId);
							_context9.next = 3;
							return (0, _raydiumSdk.findProgramAddress)(
								[programId.toBuffer(), marketId.toBuffer(), Buffer.from("open_order_associated_seed", "utf-8")],
								programId,
							);

						case 3:
							_yield$findProgramAdd8 = _context9.sent;
							publicKey = _yield$findProgramAdd8.publicKey;
							return _context9.abrupt("return", publicKey);

						case 6:
						case "end":
							return _context9.stop();
					}
				}
			}, _callee9);
		}),
	);
	return _getAssociatedOpenOrders.apply(this, arguments);
}

function getAssociatedPoolKeys(_x10) {
	return _getAssociatedPoolKeys.apply(this, arguments);
}

function _getAssociatedPoolKeys() {
	_getAssociatedPoolKeys = _asyncToGenerator(
		/*#__PURE__*/ _regeneratorRuntime().mark(function _callee10(_ref10) {
			var version,
				marketId,
				baseMint,
				quoteMint,
				programId,
				id,
				lpMint,
				_yield$getAssociatedA,
				authority,
				nonce,
				baseVault,
				quoteVault,
				lpVault,
				openOrders,
				targetOrders,
				withdrawQueue,
				serumVersion,
				serumProgramId,
				_yield$Market$getAsso,
				marketAuthority;

			return _regeneratorRuntime().wrap(function _callee10$(_context10) {
				while (1) {
					switch ((_context10.prev = _context10.next)) {
						case 0:
							(version = _ref10.version),
								(marketId = _ref10.marketId),
								(baseMint = _ref10.baseMint),
								(quoteMint = _ref10.quoteMint);
							programId = LIQUIDITY_PROGRAM_ID_V4;
							_context10.next = 4;
							return getAssociatedId({
								programId: programId,
								marketId: marketId,
							});

						case 4:
							id = _context10.sent;
							_context10.next = 7;
							return getAssociatedLpMint({
								programId: programId,
								marketId: marketId,
							});

						case 7:
							lpMint = _context10.sent;
							_context10.next = 10;
							return getAssociatedAuthority({
								programId: programId,
							});

						case 10:
							_yield$getAssociatedA = _context10.sent;
							authority = _yield$getAssociatedA.publicKey;
							nonce = _yield$getAssociatedA.nonce;
							_context10.next = 15;
							return getAssociatedBaseVault({
								programId: programId,
								marketId: marketId,
							});

						case 15:
							baseVault = _context10.sent;
							_context10.next = 18;
							return getAssociatedQuoteVault({
								programId: programId,
								marketId: marketId,
							});

						case 18:
							quoteVault = _context10.sent;
							_context10.next = 21;
							return getAssociatedLpVault({
								programId: programId,
								marketId: marketId,
							});

						case 21:
							lpVault = _context10.sent;
							_context10.next = 24;
							return getAssociatedOpenOrders({
								programId: programId,
								marketId: marketId,
							});

						case 24:
							openOrders = _context10.sent;
							_context10.next = 27;
							return getAssociatedTargetOrders({
								programId: programId,
								marketId: marketId,
							});

						case 27:
							targetOrders = _context10.sent;
							_context10.next = 30;
							return getAssociatedWithdrawQueue({
								programId: programId,
								marketId: marketId,
							});

						case 30:
							withdrawQueue = _context10.sent;
							serumVersion = 3;
							serumProgramId = SERUM_PROGRAM_ID_V3;
							_context10.next = 35;
							return _raydiumSdk.Market.getAssociatedAuthority({
								programId: serumProgramId,
								marketId: marketId,
							});

						case 35:
							_yield$Market$getAsso = _context10.sent;
							marketAuthority = _yield$Market$getAsso.publicKey;
							return _context10.abrupt("return", {
								// base
								id: id,
								baseMint: baseMint,
								quoteMint: quoteMint,
								lpMint: lpMint,
								// version
								version: version,
								programId: programId,
								// keys
								authority: authority,
								nonce: nonce,
								baseVault: baseVault,
								quoteVault: quoteVault,
								lpVault: lpVault,
								openOrders: openOrders,
								targetOrders: targetOrders,
								withdrawQueue: withdrawQueue,
								// market version
								marketVersion: serumVersion,
								marketProgramId: serumProgramId,
								// market keys
								marketId: marketId,
								marketAuthority: marketAuthority,
							});

						case 38:
						case "end":
							return _context10.stop();
					}
				}
			}, _callee10);
		}),
	);
	return _getAssociatedPoolKeys.apply(this, arguments);
}

function fetchAllPoolKeysDevnet(_x11, _x12) {
	return _fetchAllPoolKeysDevnet.apply(this, arguments);
}

function _fetchAllPoolKeysDevnet() {
	_fetchAllPoolKeysDevnet = _asyncToGenerator(
		/*#__PURE__*/ _regeneratorRuntime().mark(function _callee11(connection, config) {
			var supported,
				poolsAccountInfo,
				flatPoolsAccountInfo,
				tempPoolsKeys,
				_iterator,
				_step,
				_step$value,
				pubkey,
				accountInfo,
				version,
				programId,
				serumVersion,
				serumProgramId,
				LIQUIDITY_STATE_LAYOUT,
				_data,
				fields,
				status,
				nonce,
				baseMint,
				quoteMint,
				lpMint,
				openOrders,
				targetOrders,
				baseVault,
				quoteVault,
				marketId,
				withdrawQueue,
				lpVault,
				associatedPoolKeys,
				marketsInfo,
				poolsKeys,
				index,
				poolKeys,
				marketInfo,
				id,
				marketVersion,
				data,
				_Market$getLayouts,
				MARKET_STATE_LAYOUT,
				_MARKET_STATE_LAYOUT$,
				marketBaseVault,
				marketQuoteVault,
				marketBids,
				marketAsks,
				marketEventQueue;

			return _regeneratorRuntime().wrap(
				function _callee11$(_context11) {
					while (1) {
						switch ((_context11.prev = _context11.next)) {
							case 0:
								// supported versions
								supported = [
									{
										version: 4,
										programId: LIQUIDITY_PROGRAM_ID_V4,
										serumVersion: 3,
										serumProgramId: SERUM_PROGRAM_ID_V3,
										stateLayout: _raydiumSdk.LIQUIDITY_STATE_LAYOUT_V4,
									},
								];
								poolsAccountInfo = [];
								_context11.prev = 2;
								_context11.next = 5;
								return Promise.all(
									supported.map(function (_ref11) {
										var programId = _ref11.programId,
											version = _ref11.version,
											serumVersion = _ref11.serumVersion,
											serumProgramId = _ref11.serumProgramId,
											stateLayout = _ref11.stateLayout;
										return connection
											.getProgramAccounts(programId, {
												filters: [
													{
														dataSize: stateLayout.span,
													},
												],
											})
											.then(function (accounts) {
												return accounts.map(function (info) {
													return _objectSpread(_objectSpread({}, info), {
														version: version,
														programId: programId,
														serumVersion: serumVersion,
														serumProgramId: serumProgramId,
														stateLayout: stateLayout,
													});
												});
											});
									}),
								);

							case 5:
								poolsAccountInfo = _context11.sent;
								_context11.next = 10;
								break;

							case 8:
								_context11.prev = 8;
								_context11.t0 = _context11["catch"](2);

							case 10:
								flatPoolsAccountInfo = poolsAccountInfo.flat(); // temp pool keys without market keys

								tempPoolsKeys = [];
								_iterator = _createForOfIteratorHelper(flatPoolsAccountInfo);
								_context11.prev = 13;

								_iterator.s();

							case 15:
								if ((_step = _iterator.n()).done) {
									_context11.next = 30;
									break;
								}

								(_step$value = _step.value),
									(pubkey = _step$value.pubkey),
									(accountInfo = _step$value.account),
									(version = _step$value.version),
									(programId = _step$value.programId),
									(serumVersion = _step$value.serumVersion),
									(serumProgramId = _step$value.serumProgramId),
									(LIQUIDITY_STATE_LAYOUT = _step$value.stateLayout);
								_data = accountInfo.data;
								fields = LIQUIDITY_STATE_LAYOUT.decode(_data);
								(status = fields.status),
									(nonce = fields.nonce),
									(baseMint = fields.baseMint),
									(quoteMint = fields.quoteMint),
									(lpMint = fields.lpMint),
									(openOrders = fields.openOrders),
									(targetOrders = fields.targetOrders),
									(baseVault = fields.baseVault),
									(quoteVault = fields.quoteVault),
									(marketId = fields.marketId);
								(withdrawQueue = void 0), (lpVault = void 0);

								if (_raydiumSdk.Liquidity.isV4(fields)) {
									withdrawQueue = fields.withdrawQueue;
									lpVault = fields.lpVault;
								} else {
									withdrawQueue = _web.PublicKey.default;
									lpVault = _web.PublicKey.default;
								} // uninitialized

								if (!status.isZero()) {
									_context11.next = 24;
									break;
								}

								return _context11.abrupt("continue", 28);

							case 24:
								_context11.next = 26;
								return getAssociatedPoolKeys({
									version: version,
									baseMint: baseMint,
									quoteMint: quoteMint,
									marketId: marketId,
								});

							case 26:
								associatedPoolKeys = _context11.sent;
								// double check keys with on-chain data
								// logger.assert(Number(nonce) === associatedPoolKeys.nonce, "invalid nonce");
								tempPoolsKeys.push({
									id: pubkey,
									baseMint: baseMint,
									quoteMint: quoteMint,
									lpMint: lpMint,
									version: version,
									programId: programId,
									authority: associatedPoolKeys.authority,
									openOrders: openOrders,
									targetOrders: targetOrders,
									baseVault: baseVault,
									quoteVault: quoteVault,
									withdrawQueue: withdrawQueue,
									lpVault: lpVault,
									marketVersion: serumVersion,
									marketProgramId: serumProgramId,
									marketId: marketId,
									marketAuthority: associatedPoolKeys.marketAuthority,
								});

							case 28:
								_context11.next = 15;
								break;

							case 30:
								_context11.next = 35;
								break;

							case 32:
								_context11.prev = 32;
								_context11.t1 = _context11["catch"](13);

								_iterator.e(_context11.t1);

							case 35:
								_context11.prev = 35;

								_iterator.f();

								return _context11.finish(35);

							case 38:
								// fetch market keys
								marketsInfo = [];
								_context11.prev = 39;
								_context11.next = 42;
								return (0, _raydiumSdk.getMultipleAccountsInfo)(
									connection,
									tempPoolsKeys.map(function (_ref12) {
										var marketId = _ref12.marketId;
										return marketId;
									}),
									config,
								);

							case 42:
								marketsInfo = _context11.sent;
								_context11.next = 47;
								break;

							case 45:
								_context11.prev = 45;
								_context11.t2 = _context11["catch"](39);

							case 47:
								poolsKeys = [];

								for (index in marketsInfo) {
									poolKeys = tempPoolsKeys[index];
									marketInfo = marketsInfo[index];
									(id = poolKeys.id), (marketVersion = poolKeys.marketVersion); // @ts-ignore

									data = marketInfo.data;
									(_Market$getLayouts = _raydiumSdk.Market.getLayouts(marketVersion)),
										(MARKET_STATE_LAYOUT = _Market$getLayouts.state);
									(_MARKET_STATE_LAYOUT$ = MARKET_STATE_LAYOUT.decode(data)),
										(marketBaseVault = _MARKET_STATE_LAYOUT$.baseVault),
										(marketQuoteVault = _MARKET_STATE_LAYOUT$.quoteVault),
										(marketBids = _MARKET_STATE_LAYOUT$.bids),
										(marketAsks = _MARKET_STATE_LAYOUT$.asks),
										(marketEventQueue = _MARKET_STATE_LAYOUT$.eventQueue);
									poolsKeys.push(
										_objectSpread(_objectSpread({}, poolKeys), {
											marketBaseVault: marketBaseVault,
											marketQuoteVault: marketQuoteVault,
											marketBids: marketBids,
											marketAsks: marketAsks,
											marketEventQueue: marketEventQueue,
										}),
									);
								}

								return _context11.abrupt("return", poolsKeys);

							case 50:
							case "end":
								return _context11.stop();
						}
					}
				},
				_callee11,
				null,
				[
					[2, 8],
					[13, 32, 35, 38],
					[39, 45],
				],
			);
		}),
	);
	return _fetchAllPoolKeysDevnet.apply(this, arguments);
}

function fetchPoolKeysDevnet(_x13, _x14) {
	return _fetchPoolKeysDevnet.apply(this, arguments);
}

function _fetchPoolKeysDevnet() {
	_fetchPoolKeysDevnet = _asyncToGenerator(
		/*#__PURE__*/ _regeneratorRuntime().mark(function _callee12(connection, poolId) {
			var version,
				serumVersion,
				marketVersion,
				programId,
				serumProgramId,
				account,
				_Liquidity$getLayouts,
				LiquidityStateLayout,
				fields,
				status,
				baseMint,
				quoteMint,
				lpMint,
				openOrders,
				targetOrders,
				baseVault,
				quoteVault,
				marketId,
				withdrawQueue,
				lpVault,
				associatedPoolKeys,
				poolKeys,
				marketInfo,
				_Market$getLayouts2,
				MARKET_STATE_LAYOUT,
				market,
				marketBaseVault,
				marketQuoteVault,
				marketBids,
				marketAsks,
				marketEventQueue,
				_args12 = arguments;

			return _regeneratorRuntime().wrap(function _callee12$(_context12) {
				while (1) {
					switch ((_context12.prev = _context12.next)) {
						case 0:
							version = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : 4;
							// const version = 4
							serumVersion = 3;
							marketVersion = 3;
							programId = LIQUIDITY_PROGRAM_ID_V4;
							serumProgramId = SERUM_PROGRAM_ID_V3;
							_context12.next = 7;
							return connection.getAccountInfo(poolId);

						case 7:
							account = _context12.sent;
							(_Liquidity$getLayouts = _raydiumSdk.Liquidity.getLayouts(version)),
								(LiquidityStateLayout = _Liquidity$getLayouts.state); //@ts-ignore

							fields = LiquidityStateLayout.decode(Uint8Array.from(account.data));
							(status = fields.status),
								(baseMint = fields.baseMint),
								(quoteMint = fields.quoteMint),
								(lpMint = fields.lpMint),
								(openOrders = fields.openOrders),
								(targetOrders = fields.targetOrders),
								(baseVault = fields.baseVault),
								(quoteVault = fields.quoteVault),
								(marketId = fields.marketId);

							if (_raydiumSdk.Liquidity.isV4(fields)) {
								withdrawQueue = fields.withdrawQueue;
								lpVault = fields.lpVault;
							} else {
								withdrawQueue = _web.PublicKey.default;
								lpVault = _web.PublicKey.default;
							} // uninitialized
							// if (status.isZero()) {
							//   return ;
							// }

							_context12.next = 14;
							return getAssociatedPoolKeys({
								version: version,
								baseMint: baseMint,
								quoteMint: quoteMint,
								marketId: marketId,
							});

						case 14:
							associatedPoolKeys = _context12.sent;
							poolKeys = {
								id: poolId,
								baseMint: baseMint,
								quoteMint: quoteMint,
								lpMint: lpMint,
								version: version,
								programId: programId,
								authority: associatedPoolKeys.authority,
								openOrders: openOrders,
								targetOrders: targetOrders,
								baseVault: baseVault,
								quoteVault: quoteVault,
								withdrawQueue: withdrawQueue,
								lpVault: lpVault,
								marketVersion: serumVersion,
								marketProgramId: serumProgramId,
								marketId: marketId,
								marketAuthority: associatedPoolKeys.marketAuthority,
							};
							_context12.next = 18;
							return connection.getAccountInfo(marketId);

						case 18:
							marketInfo = _context12.sent;
							(_Market$getLayouts2 = _raydiumSdk.Market.getLayouts(marketVersion)),
								(MARKET_STATE_LAYOUT = _Market$getLayouts2.state); //@ts-ignore

							market = MARKET_STATE_LAYOUT.decode(Uint8Array.from(marketInfo.data));
							(marketBaseVault = market.baseVault),
								(marketQuoteVault = market.quoteVault),
								(marketBids = market.bids),
								(marketAsks = market.asks),
								(marketEventQueue = market.eventQueue); // const poolKeys: LiquidityPoolKeys;

							return _context12.abrupt(
								"return",
								_objectSpread(_objectSpread({}, poolKeys), {
									marketBaseVault: marketBaseVault,
									marketQuoteVault: marketQuoteVault,
									marketBids: marketBids,
									marketAsks: marketAsks,
									marketEventQueue: marketEventQueue,
								}),
							);

						case 23:
						case "end":
							return _context12.stop();
					}
				}
			}, _callee12);
		}),
	);
	return _fetchPoolKeysDevnet.apply(this, arguments);
}
//# sourceMappingURL=devnet-raydium-utils.js.map
