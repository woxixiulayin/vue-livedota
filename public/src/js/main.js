'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

//创建根实例
// let content =  new Vue ({
//     el: '#content'
// });


var websites = new Vue({
    el: "#websites",
    data: {
        liveinfos: [{ website: '熊猫' }, { website: '虎牙' }],
        checknum: 0
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