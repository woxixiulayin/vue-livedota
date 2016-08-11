const rankNumber = 15;

let parseLive = live => {
        let nums = live.nums;
        live.nums = nums > 10000 ? (nums/10000).toFixed(1) + "万" : nums;
};

let getRankinfo = (liveinfos) => {
    let lives = [],
        orderedlives = [];

    //取出所有直播信息拼成大数组
    liveinfos.forEach( (item, i) => {
        lives = lives.concat(item.lives);
    });


    orderedlives = lives.sort( (pre, after) => {
        return after.nums - pre.nums;
    });
    orderedlives = orderedlives.slice(0, rankNumber);
    orderedlives.forEach( live => {
        parseLive(live);
    });

    return orderedlives;
};


let getliveinfos = () => {
    return new Promise((resolve, reject) => {
        fetch("/search", {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            }).then((res) => {
            if (res.ok) {
                res.json().then(data => {
                    resolve(data);
                })
            }
        });
    })
};

let globaldata = {
    liveinfos: {},
    ranklives: [],
    siteindex: 0
}

let websites = new Vue({
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
        getWebsitelive: function(e) {
            if (e.target.tagName === 'LI') {
                let ele = e.target;
                this.checknum = ele.getAttribute('index');
                console.log(typeof this.checknum);
            }
        }
    }
});

//获取直播信息
(function run() {
    getliveinfos().then( (data) => {
        globaldata.liveinfos = data;
        globaldata.ranklives = getRankinfo(data);
        console.log(data);
    });
})();