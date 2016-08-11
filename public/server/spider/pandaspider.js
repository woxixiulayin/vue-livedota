'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Pandaspider = undefined;

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
var prelink = "http://www.panda.tv";

var Pandaspider = function (_Spider) {
    (0, _inherits3.default)(Pandaspider, _Spider);

    function Pandaspider() {
        (0, _classCallCheck3.default)(this, Pandaspider);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Pandaspider).call(this));
    }

    //具体的爬取策略


    (0, _createClass3.default)(Pandaspider, [{
        key: 'pickInfo',
        value: function pickInfo(html) {
            var infoarray = [],
                liveinfos = {},
                parse = $.load(html),
                list = parse("a.video-list-item-wrap"),
                category = parse("div.main-header h3").text(),
                website = "熊猫";
            list.each(function (i, ele) {
                var name = $(ele).find("span.video-nickname").text(),
                    nums = $(ele).find("span.video-number").text(),
                    title = $(ele).find("div.video-title").text(),
                    link = prelink + $(ele).attr("href"),
                    img = $(ele).find("img.video-img").attr("data-original"),
                    live = new _models.Live(name, nums, title, link, category, img, website);
                infoarray.push(live);
                // log(live);
            });
            liveinfos = new _models.Liveinfos(website, infoarray);
            return liveinfos;
        }
    }]);
    return Pandaspider;
}(_spider.Spider);

//以下做测试
// let panda = new Pandaspider();
// let url = 'http://www.panda.tv/cate/dota2';
// panda.parseUrl(url);

exports.Pandaspider = Pandaspider;