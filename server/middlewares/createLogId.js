module.exports = async function (ctx, next) {
  const logId = Date.now() + '_' + parseInt(Math.random() * 100000);
  logger.info({type: 'pageview', data: JSON.stringify({
    logId: logId,
    url: ctx.originalUrl,
    userAgent: ctx.get('User-Agent'),
  })}, { logId: logId });
  ctx.logId = logId;
  await next();
}