const API_URL = require('../env/index.js');

const generateURL = function (host, path = '', search = '') {
  if (search) {
    return `${host}${path}${search}`;
  }
  return `${host}${path}`;
}

module.exports = {
  generateUcAPIURL (path = '', search = '') {
    return generateURL(API_URL.ucNewInterfaceUrl, path, search);
  },

  generateUcURL (path = '', search = '') {
    return generateURL(API_URL.ucUrl, path, search);
  },
}