const axios = require('axios');
axios.defaults.timeout = 10000;
axios.interceptors.request.use(config => {
  let logId = config.headers.logId;
  logger.info("请求路径: %s", config.url, { logId: logId });
  logger.silly("请求参数: %s", JSON.stringify(config.data || {}), { logId: logId });
  let _config = {}
  _config.headers = {
    accept: config.headers.accept,
  }
  if (config.headers.cookie) {
    _config.headers.cookie = config.headers.cookie;
  }
  config.headers = _config.headers;
  return config;
})

axios.interceptors.response.use(res => {
  let {error} = res.data;
  if (error && Array.isArray(error)) {
    let [errorObj] = error;
    let errorInfo = errorObj;
    if (errorInfo) {
      errorObj.msg = errorInfo.msg;
    }
    res.data.error = errorObj;
  }
  
  logger.info("请求数据响应: %s", JSON.stringify(res.data), {logId: res.headers.logId});
  return res;
});

module.exports = {
  fetch: async (ctx, url, data = {}, type = 'get') => {
    const t = type.toLocaleLowerCase();
    let result = null;
    if (t === 'put' || t === 'post' || t === 'patch') {
      if (data.data || data.params) {
        result = await axios({
          method: type,
          url,
          data: data.data || {},
          params: data.params || {},
          headers: Object.assign({}, ctx.headers, {logId: ctx.logId || 0})
        });
      } else {
        result = await axios({
          method: type,
          url,
          data,
          headers: Object.assign({}, ctx.headers, {logId: ctx.logId || 0})
        });
      }
    } else {
      result = await axios({
        method: type,
        url,
        params: data,
        headers: Object.assign({}, ctx.headers, {logId: ctx.logId || 0})
      });
    }
    return result.data;
  }
}