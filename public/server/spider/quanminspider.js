'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Quanminspider = undefined;

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
var prelink = "http://www.quanmin.tv/v/";

var Quanminspider = function (_Spider) {
    (0, _inherits3.default)(Quanminspider, _Spider);

    function Quanminspider() {
        (0, _classCallCheck3.default)(this, Quanminspider);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Quanminspider).call(this));
    }

    //具体的爬取策略，全名TV页面是动态生成的，需要找到数据请求的url来获取json


    (0, _createClass3.default)(Quanminspider, [{
        key: 'pickInfo',
        value: function pickInfo(html) {
            var infoarray = [],
                liveinfos = {},

            //获取到的是json数据，直接转成对象进行处理
            list = JSON.parse(html).data,
                website = "全民";
            [].forEach.call(list, function (ele, i) {
                var name = ele.nick,
                    nums = ele.view,
                    title = ele.title,
                    link = prelink + ele.uid,
                    img = ele.thumb,
                    category = ele.category_name,
                    live = new _models.Live(name, nums, title, link, category, img, website);
                infoarray.push(live);
                // log(live);
            });
            liveinfos = new _models.Liveinfos(website, infoarray);
            return liveinfos;
        }
    }]);
    return Quanminspider;
}(_spider.Spider);

//以下做测试
// let quanmin = new Quanminspider();
// let url = 'http://www.quanmin.tv/json/categories/dota2/list.json';
// quanmin.parseUrl(url);

exports.Quanminspider = Quanminspider;