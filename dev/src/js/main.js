const rankNumber = 15;


let globaldata = {
    liveinfos: {},
    ranklives: [],
    websites: ['熊猫', '战旗', '斗鱼', '虎牙', '全民'],
    siteindex: 0
}


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

let websitesul = new Vue({
    el: ".websites",
    data: {
        websites: globaldata.websites,
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

let livelist = new Vue({
    el: ".ul-live-list",
    data: {
        lives: []
    }
});

//获取直播信息
(function run() {
    getliveinfos().then( (data) => {
        globaldata.liveinfos = data;
        globaldata.ranklives = getRankinfo(data);
        livelist.lives = globaldata.liveinfos[globaldata.siteindex].lives;
        console.log(livelist.lives);
    });
})();