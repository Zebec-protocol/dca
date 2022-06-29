"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true,
});

var _constants = require("./constants");

Object.keys(_constants).forEach(function (key) {
	if (key === "default" || key === "__esModule") return;
	if (key in exports && exports[key] === _constants[key]) return;
	Object.defineProperty(exports, key, {
		enumerable: true,
		get: function get() {
			return _constants[key];
		},
	});
});

var _instruction = require("./instruction");

Object.keys(_instruction).forEach(function (key) {
	if (key === "default" || key === "__esModule") return;
	if (key in exports && exports[key] === _instruction[key]) return;
	Object.defineProperty(exports, key, {
		enumerable: true,
		get: function get() {
			return _instruction[key];
		},
	});
});

var _models = require("./models");

Object.keys(_models).forEach(function (key) {
	if (key === "default" || key === "__esModule") return;
	if (key in exports && exports[key] === _models[key]) return;
	Object.defineProperty(exports, key, {
		enumerable: true,
		get: function get() {
			return _models[key];
		},
	});
});

var _utils = require("./utils");

Object.keys(_utils).forEach(function (key) {
	if (key === "default" || key === "__esModule") return;
	if (key in exports && exports[key] === _utils[key]) return;
	Object.defineProperty(exports, key, {
		enumerable: true,
		get: function get() {
			return _utils[key];
		},
	});
});

var _clients = require("./clients");

Object.keys(_clients).forEach(function (key) {
	if (key === "default" || key === "__esModule") return;
	if (key in exports && exports[key] === _clients[key]) return;
	Object.defineProperty(exports, key, {
		enumerable: true,
		get: function get() {
			return _clients[key];
		},
	});
});
console.log("Its running");
//# sourceMappingURL=index.js.map
