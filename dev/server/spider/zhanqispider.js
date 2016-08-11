import {Live, Liveinfos} from '../model/models.js';
import {Spider} from './spider.js';
import {log} from '../utils/utils.js';

const $ = require("cheerio");
const prelink = "http://www.zhanqi.tv/";

class Zhanqispider extends Spider {
    constructor () {
        super();
    }

    //具体的爬取策略
    pickInfo (html) {
        let infoarray = [],
            liveinfos = {},
            parse = $.load(html),
            list = parse("a.js-jump-link"),
            category = list.find("span.game-name").text(),
            website = "战旗";
        list.each((i, ele) => {
            let name = $(ele).find("span.anchor").text(),
                nums = $(ele).find("div.meat span.views span.dv").text(),
                title = $(ele).find("span.name").text(),
                link = prelink + $(ele).attr("href"),
                img = $(ele).find("div.imgBox img").attr("src"),
                live = new Live(name, nums, title, link, category, img, website);
                infoarray.push(live);
            // log(live);
        })
        liveinfos = new Liveinfos(website, infoarray);
        return liveinfos;
    }
}

//以下做测试
// let spider = new Zhanqispider();
// let url = 'www.zhanqi.tv/games/dota2';
// panda.parseUrl(url);

export {Zhanqispider};