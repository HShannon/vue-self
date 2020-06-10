class Test {
  static _router_m1 (ctx, next) {
    ctx.body = '123123123'
  }

  static _router_m222 (ctx, next) {
    ctx.body = 'xxx'
  }

  static _router_xxx (ctx, next) {
    ctx.body = 'xxx001111'
  }
}
Test._router_m1.options = {
  router: '/oooppp',
  
}
module.exports = Test;