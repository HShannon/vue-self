const winston = require('winston');
const config = require('winston/lib/winston/config');
require('winston-daily-rotate-file');
const moment = require('moment');
const path = require('path');

const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
const stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;

function getLogPosition (belowFn) {
  const data = {};
  const err = {};
  const oldLimit = Error.stackTraceLimit;
  Error.stackTraceLimit = 50;
  Error.captureStackTrace(err, belowFn || getLogPosition);
  Error.stackTraceLimit = oldLimit;
  let stacklist = err.stack.split('\n').slice(2);
  let s = stacklist[0];
  let sp = stackReg.exec(s) || stackReg2.exec(s);
  if (sp && sp.length === 5) {
      data.method = sp[1];
      data.path = sp[2];
      data.line = sp[3];
      data.column = sp[4];
      data.file = path.basename(data.path);
      data.stack = err.stack;
  }
  return data;
};

const format = function(opts) {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
  const arr = [];
  const { logId, feature, logPosition } = opts.meta;
  arr.push(`[${timestamp}]`);
  arr.push(`[${opts.level}]`);
  arr.push(`[${logId || 0}]`);
  if (feature) {
    arr.push(`[${feature}]`);
  }
  arr.push(`${logPosition.file}:${logPosition.line}:${logPosition.column}`);
  arr.push(opts.message);
  return arr.join(' ');
};

const logRoot = path.join(__dirname, '../../logs');

const logger = new (winston.Logger)({
  rewriters: [function (level, msg, meta, self) {
    const logPos = {
      logPosition: getLogPosition(self.log)
    }
    return meta ? Object.assign({}, meta, logPos) : logPos
  }],
  transports: [
    new (winston.transports.Console)({
      level: 'silly',
      formatter: function (opts) {
        const str = format(opts);
        return config.colorize(opts.level, str);
      }
    }),
    new (winston.transports.DailyRotateFile)({
      name: 'daily-error-file',
      filename: path.join(logRoot, './lingxiII.error'),
      formatter: opts => format(opts),
      datePattern: '.yyyy-MM-dd.log',
      localTime: true,
      maxDays: 31,
      level: 'error',
      json: false,
    }),
    new (winston.transports.DailyRotateFile)({
      name: 'daily-info-file',
      filename: path.join(logRoot, './lingxiII.info'),
      formatter: opts => format(opts),
      datePattern: '.yyyy-MM-dd.log',
      localTime: true,
      maxDays: 31,
      level: 'info',
      json: false,
    }),
    new (winston.transports.DailyRotateFile)({
      name: 'daily-silly-file',
      filename: path.join(logRoot, './lingxiII.silly'),
      formatter: opts => format(opts),
      datePattern: '.yyyy-MM-dd.log',
      localTime: true,
      level: 'silly',
      json: false,
      maxsize: 100 * 1024 * 1024 
    })
  ]
});

module.exports = logger;