import {runJobs} from "./server/main.js";
import {jobs} from "./server/config.js";
import {log} from "./server/utils/utils.js";

const  Koa = require('koa');
const  send = require('koa-send');
const  serve = require('koa-static');
const  app = new Koa();

app.use(serve((__dirname + "/src")));

app.use(async (ctx, next) => {
  if ('/' === ctx.path)  return send(ctx, "./src/html/index.html");
  await next();
});

app.use(async  (ctx, next) => {
    if (ctx.path === "/search") {
        await runJobs(jobs)
                .then(infos => {
                    ctx.body = JSON.stringify(infos);
                });
    }
    await next();
});

app.listen(8080);