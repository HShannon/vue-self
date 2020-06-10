const Router = require('koa-router');
const mainRouter = new Router();
const glob = require('glob');
const path = require('path')
const fs = require('fs')
const uc = require('../middlewares/uc')
const error = require('../middlewares/errorHandler');
const controllersFiles = glob.sync(path.resolve(__dirname, '../controllers/*.js'));
const PATH_LIST = [];
controllersFiles.forEach(file => {
  let module = require(file);
  let fileName = path.parse(file).name;
  let routerMethods = Object.getOwnPropertyNames(module).filter(prop => {
    return /^_router/.test(prop) && typeof module[prop] == 'function' ;
  });
  var _router = require('koa-router')();
  routerMethods.forEach(m => {
    let [, first, second] =  m.match(/_router_([^_]*)_?([^_]*)?/);
    let methods = 'get', router = '', middlewares = [];
    if (!second) {
      router = first;
    } else {
      methods = first;
      router = second;
    }
    let options = module[m].options;
    if (options) {
      router = options.router || router;
      methods = options.methods || methods;
      middlewares = options.middlewares || middlewares;
    }
    if (!/^\//.test(router)) {
      router = '/' + router;
    }
    if (middlewares.length) {
      _router[methods](router, ...middlewares, module[m])
    } else {
      _router[methods](router, module[m])
    }
    PATH_LIST.push({
      [`${fileName}${router}`.replace('/', '_').toUpperCase()]: `/api/${fileName}${router}`
    });
    console.log(`${fileName}${router}`);
  })
  mainRouter.use(`/api/${fileName}`, error, uc(), _router.routes(), _router.allowedMethods());
});

function createInterfaceFile () {
  var strs = ['export default {'];
  PATH_LIST.forEach(it => {
    strs.push(`  ${JSON.stringify(it)},`.replace(/[\{\}]/g, '').replace(':', ': '));
  })
  strs.push('}');
  strs = strs.join('\n');
  fs.writeFileSync(path.resolve(__dirname, '../../src/api/index.js'), strs);
}


module.exports = function (app) {
  if (app.env == 'development') {
    createInterfaceFile();
  }
  app.use(mainRouter.routes()).use(mainRouter.allowedMethods());
}
