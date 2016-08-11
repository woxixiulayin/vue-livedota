"use strict";

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _main = require("./server/main.js");

var _config = require("./server/config.js");

var _utils = require("./server/utils/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Koa = require('koa');
var send = require('koa-send');
var serve = require('koa-static');
var app = new Koa();

app.use(serve(__dirname + "/src"));

app.use(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!('/' === ctx.path)) {
                            _context.next = 2;
                            break;
                        }

                        return _context.abrupt("return", send(ctx, "./src/html/index.html"));

                    case 2:
                        _context.next = 4;
                        return next();

                    case 4:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

app.use(function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        if (!(ctx.path === "/search")) {
                            _context2.next = 3;
                            break;
                        }

                        _context2.next = 3;
                        return (0, _main.runJobs)(_config.jobs).then(function (infos) {
                            ctx.body = (0, _stringify2.default)(infos);
                        });

                    case 3:
                        _context2.next = 5;
                        return next();

                    case 5:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());

app.listen(8080);