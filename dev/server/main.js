import {Huyaspider} from "./spider/huyaspider.js";
import {Pandaspider} from "./spider/pandaspider.js";
import {Quanminspider} from "./spider/quanminspider.js";
import {Zhanqispider} from "./spider/zhanqispider.js";
import {Douyuspider} from "./spider/douyuspider.js";
import {jobs, DEBUG} from "./config.js";
import {log} from "./utils/utils.js";

let huya = new Huyaspider(),
    panda = new Pandaspider(),
    quanmin = new Quanminspider(),
    zhanqi = new Zhanqispider(),
    douyu = new Douyuspider();

let spiders = [panda, zhanqi, douyu, huya, quanmin];

let runJobs = function (jobs, callback) {
    let promises = []
    spiders.forEach((spider, index) => {
        //使用类名作为job的属性名，直接获取要爬取的url
        let spidername = spider.constructor.name,
            url = jobs[spidername];
        promises.push(spider.parseUrl(url));
    });
    return Promise.all(promises);
};


// 以下做测试
// runJobs(jobs, infos => {
//     log("done");
// })

export {runJobs};