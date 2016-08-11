"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var rankNumber = 15;

var parseLive = function parseLive(live) {
    var nums = live.nums;
    live.nums = nums > 10000 ? (nums / 10000).toFixed(1) + "万" : nums;
};

var getRankinfo = function getRankinfo(liveinfos) {
    var lives = [],
        orderedlives = [];

    //取出所有直播信息拼成大数组
    liveinfos.forEach(function (item, i) {
        lives = lives.concat(item.lives);
    });

    orderedlives = lives.sort(function (pre, after) {
        return after.nums - pre.nums;
    });
    orderedlives = orderedlives.slice(0, rankNumber);
    orderedlives.forEach(function (live) {
        parseLive(live);
    });

    return orderedlives;
};

var getliveinfos = function getliveinfos() {
    return new Promise(function (resolve, reject) {
        fetch("/search", {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    resolve(data);
                });
            }
        });
    });
};

var globaldata = {
    liveinfos: {},
    ranklives: [],
    siteindex: 0
};

var websites = new Vue({
    el: "#websites",
    data: {
        liveinfos: [{
            website: '熊猫'
        }, {
            website: '战旗'
        }, {
            website: '斗鱼'
        }, {
            website: '虎牙'
        }, {
            website: '全民'
        }],
        checknum: globaldata.siteindex
    },
    methods: {
        getWebsitelive: function getWebsitelive(e) {
            if (e.target.tagName === 'LI') {
                var ele = e.target;
                this.checknum = ele.getAttribute('index');
                console.log(_typeof(this.checknum));
            }
        }
    }
});

//获取直播信息
(function run() {
    getliveinfos().then(function (data) {
        globaldata.liveinfos = data;
        globaldata.ranklives = getRankinfo(data);
        console.log(data);
    });
})();