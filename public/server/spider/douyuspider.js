'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Douyuspider = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _models = require('../model/models.js');

var _spider = require('./spider.js');

var _utils = require('../utils/utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = require("cheerio");
var prelink = "http://www.douyu.com";

var Douyuspider = function (_Spider) {
    (0, _inherits3.default)(Douyuspider, _Spider);

    function Douyuspider() {
        (0, _classCallCheck3.default)(this, Douyuspider);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Douyuspider).call(this));
    }

    //具体的爬取策略


    (0, _createClass3.default)(Douyuspider, [{
        key: 'pickInfo',
        value: function pickInfo(html) {
            var infoarray = [],
                liveinfos = {},
                parse = $.load(html),
                list = parse("#live-list-contentbox li a"),
                category = parse("div.mainbody div.real-title").text(),
                website = "斗鱼";

            list.each(function (i, ele) {
                var name = $(ele).find("div.mes span.dy-name").text(),
                    nums = $(ele).find("div.mes span.dy-num").text(),
                    title = $(ele).find("h3").text(),
                    link = prelink + $(ele).attr("href"),
                    img = $(ele).find("span.imgbox img").attr("data-original"),
                    live = new _models.Live(name, nums, title, link, category, img, website);
                infoarray.push(live);
                // log(live);
            });
            liveinfos = new _models.Liveinfos(website, infoarray);
            return liveinfos;
        }
    }]);
    return Douyuspider;
}(_spider.Spider);

//以下做测试
// let spider = new Douyuspider();
// let url = 'www.douyu.com/directory/game/DOTA2';
// spider.parseUrl(url);

exports.Douyuspider = Douyuspider;