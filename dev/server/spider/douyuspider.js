import {Live, Liveinfos} from '../model/models.js';
import {Spider} from './spider.js';
import {log} from '../utils/utils.js';

const $ = require("cheerio");
const prelink = "http://www.douyu.com";

class Douyuspider extends Spider {
    constructor () {
        super();
    }

    //具体的爬取策略
    pickInfo (html) {
        let infoarray = [],
            liveinfos = {},
            parse = $.load(html),
            list = parse("#live-list-contentbox li a"),
            category = parse("div.mainbody div.real-title").text(),
            website = "斗鱼";

        list.each((i, ele) => {
            let name = $(ele).find("div.mes span.dy-name").text(),
                nums = $(ele).find("div.mes span.dy-num").text(),
                title = $(ele).find("h3").text(),
                link = prelink + $(ele).attr("href"),
                img = $(ele).find("span.imgbox img").attr("data-original"),
                live = new Live(name, nums, title, link, category, img, website);
                infoarray.push(live);
            // log(live);
        })
        liveinfos = new Liveinfos(website, infoarray);
        return liveinfos;
    }
}

//以下做测试
// let spider = new Douyuspider();
// let url = 'www.douyu.com/directory/game/DOTA2';
// spider.parseUrl(url);

export {Douyuspider};