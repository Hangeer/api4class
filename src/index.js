const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert');
const controller = require('./middlewares/controller');
const colors = require('./utils/colors');

const app = new Koa();
const port = 9623;

app.use(convert(bodyParser()));
app.use(convert(controller()));

app.use(async (ctx, next) => {
    console.info(`${ctx.request.method}: ${ctx.request.url}`.info);
    await next();
});

app.listen(port);
console.info(`app running at port ${port}`.warn);