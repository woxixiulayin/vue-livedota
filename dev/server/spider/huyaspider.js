import {Live, Liveinfos} from '../model/models.js';
import {Spider} from './spider.js';
import {log} from '../utils/utils.js';

const $ = require("cheerio");

class Huyaspider extends Spider {
    constructor () {
        super();
    }

    //具体的爬取策略
    pickInfo (html) {
        let infoarray = [],
            liveinfos = {},
            parse = $.load(html),
            list = parse("li.video-list-item"),
            category = parse("div.box-hd h3").text(),
            website = "虎牙";
        list.each((i, ele) => {
            let name = $(ele).find("i.nick").text(),
                nums = $(ele).find("i.js-num").text(),
                title = $(ele).find("div.all_live_tit a").text(),
                link = $(ele).find("a").attr("href"),
                img = $(ele).find("img.pic").attr("src"),
                live = new Live(name, nums, title, link, category, img, website);
                infoarray.push(live);
            // log(live);
        })
        liveinfos = new Liveinfos(website, infoarray);
        return liveinfos;
    }
}

//以下做测试
// let huya = new Huyaspider();
// let url = 'http://www.huya.com/g/6';
// huya.parseUrl(url);

export {Huyaspider};