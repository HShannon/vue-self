module.exports = function () {
  let env = process.env.NODE_ENV || 'production';
  logger.info(`NODE_ENV IS ${env}`);
  try {
    return require(`./${env}.js`);
  } catch(e) {
    throw Error(e);
  }
}();