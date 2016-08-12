const rankNumber = 15;


//通用函数
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

//全局变量设置
let globaldata = new Vue({
    data: {
            liveinfos: {},
            ranklives: [],
            websites: ['熊猫', '战旗', '斗鱼', '虎牙', '全民'],
            siteindex: 0
        }
});

//组件申明
let websitesul = new Vue({
    el: ".websites",
    computed: {
        websites: () => (globaldata.websites),
        checknum: {
            get: () => (globaldata.siteindex),
            set: (index) => {
                globaldata.siteindex = index;
            }
        }
    },
    methods: {
        getWebsitelive: function(e) {
            if (e.target.tagName === 'A') {
                let ele = e.target.parentNode;
                this.checknum = ele.getAttribute('index');
            }
        }
    }
});

let livelist = new Vue({
    el: ".ul-live-list",
    computed: {
        lives: () => (globaldata.liveinfos[globaldata.siteindex].lives)
    }
});

let liverank = new Vue({
    el: ".live-rank",
    data: {
        checknum: -1
    },
    computed: {
        lives: () => (globaldata.ranklives)
    },
    methods: {
        showbrief: function(e) {    
                this.checknum = e.currentTarget.getAttribute('index');
        },
        closebrief: function(e) {
                this.checknum = -1;
        }
    }
});

let toast = new Vue ({
    el: ".tip",
    data:{
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
        close: function() {
            this.show = false;
            this.content = '';
        }
    },
    watch: {
        content: function () {
            if (this.content === '') return;
                let that = this;
                this.show = true;
                setTimeout(()=>{
                    that.close();
                }, 3000);
        }
    }
});

let refreshdata = () => {
    getliveinfos().then( (data) => {
        globaldata.liveinfos = data;
        globaldata.ranklives = getRankinfo(data);
        toast.content = "刷新完成";
    });
};

let btn_refresh = document.getElementsByClassName("btn-refresh")[0];
btn_refresh.onclick = function(e) {
    let that = this;
    this.blur();
    if(this.disabled && this.disabled == true) return false;
    //更新数据
    refreshdata();
    this.disabled = true;
    //5秒内禁止刷新
    setTimeout(()=>{
        this.disabled = false;
    }, 5000);
    return false;
};


 //live ul自适应居中
 window.onresize = function () {
     let pageWidth = window.innerWidth;
    let liveul_margin = ((pageWidth - 500) - Math.floor((pageWidth - 500) / 290) * 290) / 2 - 10 + "px";
    document.querySelector(".ul-live-list").style.marginLeft = liveul_margin;
 }
 window.onresize()
//刷新页面
refreshdata();