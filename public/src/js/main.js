"use strict";

var rankNumber = 15;

//通用函数
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

//全局变量设置
var globaldata = new Vue({
    data: {
        liveinfos: {},
        ranklives: [],
        websites: ['熊猫', '战旗', '斗鱼', '虎牙', '全民'],
        siteindex: 0
    }
});

//组件申明
var websitesul = new Vue({
    el: ".websites",
    computed: {
        websites: function websites() {
            return globaldata.websites;
        },
        checknum: {
            get: function get() {
                return globaldata.siteindex;
            },
            set: function set(index) {
                globaldata.siteindex = index;
            }
        }
    },
    methods: {
        getWebsitelive: function getWebsitelive(e) {
            if (e.target.tagName === 'A') {
                var ele = e.target.parentNode;
                this.checknum = ele.getAttribute('index');
            }
        }
    }
});

var livelist = new Vue({
    el: ".ul-live-list",
    computed: {
        lives: function lives() {
            return globaldata.liveinfos[globaldata.siteindex].lives;
        }
    }
});

var liverank = new Vue({
    el: ".live-rank",
    data: {
        checknum: -1
    },
    computed: {
        lives: function lives() {
            return globaldata.ranklives;
        }
    },
    methods: {
        showbrief: function showbrief(e) {
            this.checknum = e.currentTarget.getAttribute('index');
        },
        closebrief: function closebrief(e) {
            this.checknum = -1;
        }
    }
});

var toast = new Vue({
    el: ".tip",
    data: {
        show: false,
        content: ""
    },
    // computed: {
    //     content: {
    //         set: function(value)  {
    //             let that = this;
    //             this.show = true;
    //             setTimeout(()=>{
    //                 that.show = false;
    //             }, 3000);
    //             console.log(value);
    //             return value;
    //         }
    //     }
    // },
    methods: {
        close: function close() {
            this.show = false;
            this.content = '';
        }
    },
    watch: {
        content: function content() {
            if (this.content === '') return;
            var that = this;
            this.show = true;
            setTimeout(function () {
                that.close();
            }, 3000);
        }
    }
});

var refreshdata = function refreshdata() {
    getliveinfos().then(function (data) {
        globaldata.liveinfos = data;
        globaldata.ranklives = getRankinfo(data);
        toast.content = "刷新完成";
    });
};

var btn_refresh = document.getElementsByClassName("btn-refresh")[0];
btn_refresh.onclick = function (e) {
    var _this = this;

    var that = this;
    this.blur();
    if (this.disabled && this.disabled == true) return false;
    //更新数据
    refreshdata();
    this.disabled = true;
    //5秒内禁止刷新
    setTimeout(function () {
        _this.disabled = false;
    }, 5000);
    return false;
};

//live ul自适应居中
window.onresize = function () {
    var pageWidth = window.innerWidth;
    var liveul_margin = (pageWidth - 500 - Math.floor((pageWidth - 500) / 290) * 290) / 2 - 10 + "px";
    document.querySelector(".ul-live-list").style.marginLeft = liveul_margin;
};
window.onresize();
//刷新页面
refreshdata();