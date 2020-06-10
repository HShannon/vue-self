const {generateUcAPIURL, generateUcURL} = require('../utils/urlhelper');
const {fetch} = require('../utils/axios');
const isLogin = function (isXhr = true) {
  return  async (ctx, next) => {
    if (/.*\.(js|css)/.test(ctx.url)) {
      await next();
      return;
    }  
    let cookies = ctx.cookies;
    let lxsession;
    if (ctx.lxsession) {
      lxsession = ctx.lxsession;
    } else {
      if (cookies.get) {
        lxsession = cookies.get('LX_SESSION_ID');
        ctx.LX_SESSION_ID = lxsession;
      }
    }
    if (ctx.url == '/index.html') {
      ctx.url = '/';
    }
    let refer = ctx.origin ? encodeURIComponent(ctx.origin + ctx.url) : null;
    let loginUrl = generateUcURL('/login') + (refer ? `?callback=${refer}` : '');
    if (!lxsession) {
      if (isXhr) {
        throw new Error('请登录');
      } else {
        ctx.redirect(loginUrl);
        return;
      }
    }
    let ucApiUrl = generateUcAPIURL(`/status/check/session?LX_SESSION_ID=${lxsession}`);
    let rets = await fetch(ctx, ucApiUrl);
    if (rets.data && rets.data[0]) {
      let user = rets.data[0];
      if (user.userId) { 
        ctx.LX_SESSION_ID = user.sessionId;
      } else {
        if (isXhr) {
          throw new Error('请登录');
        } else {
          ctx.redirect(loginUrl);
          return;
        }
      }
    } else {
      if (isXhr) {
        throw new Error('请登录');
      } else {
        ctx.redirect(loginUrl);
        return;
      }
    }
    await next();
  }
}
module.exports = isLogin;