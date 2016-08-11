//创建根实例
// let content =  new Vue ({
//     el: '#content'
// });


var websites = new Vue ({
    el: "#websites",
    data: {
        liveinfos: [
            {website:'熊猫'},
            {website: '虎牙'}
        ],
        checknum: 0
    },
    methods: {
        getWebsitelive: function (e) {
            if(e.target.tagName === 'LI') {
                let ele = e.target;
                this.checknum = ele.getAttribute('index');
                console.log(typeof this.checknum);
            }
        }
    }
});