const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const router = require('koa-router');
const { historyApiFallback } = require('koa2-connect-history-api-fallback');
const staticCache = require('koa-static-cache')
const path = require('path');
const IMGDIR = __dirname + '/tmpDir/images/';
const staticPath = '../public/static/';
const logId = require('./middlewares/createLogId');
global.logger = require('./log')
const helmet = require("koa-helmet");
const compress = require('koa-compress');
const compressOptions = { threshold: 2048 };
app.use(helmet());
app.use(compress(compressOptions));


app.context.env = app.env;
app.use(historyApiFallback({
  whiteList: ['/api/*']
}));
app.use(logId)
app.use(koaBody({
  formLimit: 1048576,  // 最大1M
  textLimit: 1048576,
  formidable: {
    keepExtensions: true, // 带拓展名上传，否则上传的会是二进制文件而不是>    图片文件
    onFileBegin(name, file) {
      file.path = IMGDIR + new Date().getTime() + path.extname(file.name);
    },
    uploadDir: IMGDIR
  }, 
  multipart: true,
  onError: function () {
    console.log('koa-body error:');
  }
}));
require('./router')(app);
app.use(staticCache(
  path.join( __dirname,  staticPath), {
    maxAge: 30 * 86400 * 1000
  }
));
app.listen(3207);