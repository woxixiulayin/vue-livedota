'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Huyaspider = undefined;

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

var Huyaspider = function (_Spider) {
    (0, _inherits3.default)(Huyaspider, _Spider);

    function Huyaspider() {
        (0, _classCallCheck3.default)(this, Huyaspider);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Huyaspider).call(this));
    }

    //具体的爬取策略


    (0, _createClass3.default)(Huyaspider, [{
        key: 'pickInfo',
        value: function pickInfo(html) {
            var infoarray = [],
                liveinfos = {},
                parse = $.load(html),
                list = parse("li.video-list-item"),
                category = parse("div.box-hd h3").text(),
                website = "虎牙";
            list.each(function (i, ele) {
                var name = $(ele).find("i.nick").text(),
                    nums = $(ele).find("i.js-num").text(),
                    title = $(ele).find("div.all_live_tit a").text(),
                    link = $(ele).find("a").attr("href"),
                    img = $(ele).find("img.pic").attr("src"),
                    live = new _models.Live(name, nums, title, link, category, img, website);
                infoarray.push(live);
                // log(live);
            });
            liveinfos = new _models.Liveinfos(website, infoarray);
            return liveinfos;
        }
    }]);
    return Huyaspider;
}(_spider.Spider);

//以下做测试
// let huya = new Huyaspider();
// let url = 'http://www.huya.com/g/6';
// huya.parseUrl(url);

exports.Huyaspider = Huyaspider;