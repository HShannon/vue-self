const router = require('koa-router')();
const fs = require('fs');
const Path = require('path');
const uc = require('../middlewares/uc');
router.get('/index.html', uc(false), async (ctx, next) => {
  var path = Path.join(__dirname, '../../public/static/index.html');
  ctx.response.status = 200
  ctx.set('Cache-Control', 'no-store');
  ctx.response.type = Path.extname(path);
  ctx.body = fs.createReadStream(path);
})
module.exports = router;