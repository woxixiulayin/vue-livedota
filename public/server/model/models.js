'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Liveinfos = exports.Live = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//直播信息实例
// category:"魔兽 DOTA1"
// img:"http://screenshot.dwstatic.com/yysnapshot/c86e624a58f03e087a3d4235967bed865b44e0cf?imageview/4/0/w/280/h/158/blur/1"
// link:"http://www.huya.com/guai"
// name:"乖"
// nums:"23655"
// title:"单排模式！"
// website:"虎牙"

//直播信息

var Live = function Live(name, nums, title, link, category, img, website) {
    (0, _classCallCheck3.default)(this, Live);

    this.name = name || '';
    this.nums = nums || '';
    this.title = title || '';
    this.link = link || '';
    this.category = category || '';
    this.img = img || '';
    this.website = website || '';
};

var Liveinfos = function Liveinfos(website, lives) {
    (0, _classCallCheck3.default)(this, Liveinfos);

    this.website = website;
    this.lives = lives;
};

var LiveDota = function (_Live) {
    (0, _inherits3.default)(LiveDota, _Live);

    function LiveDota(name, nums, title, category, img, website) {
        (0, _classCallCheck3.default)(this, LiveDota);

        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(LiveDota).call(this, name, nums, title, link, category, img, website));

        _this.category = "Dota";
        return _this;
    }

    return LiveDota;
}(Live);

exports.Live = Live;
exports.Liveinfos = Liveinfos;