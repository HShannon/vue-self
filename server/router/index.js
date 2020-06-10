const Router = require('koa-router');
const router = new Router();
const home = require('./home');
const helper = require('../utils/urlhelper');
module.exports = function (app) {
  require('./apiRouter')(app);
  // app.use(router.routes()).use(router.allowedMethods());
  app.use(home.routes()).use(home.allowedMethods());
}