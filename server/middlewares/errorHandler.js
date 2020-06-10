var errorHandler =  async (ctx, next) => {
  try {
    ctx.type = 'application/json';
    await next();
  } catch (err) {
    logger.error("请求路径: %s, 请求错误: %s", ctx.url, err.message);
    ctx.status = 200;
    ctx.body = {
      error: err.message
    }
  }
};
module.exports = errorHandler;