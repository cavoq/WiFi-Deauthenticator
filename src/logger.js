/* eslint-disable new-cap */

/**
 * Configurations of logger.
 */

const winston = require('winston');
const winstonRotator = require('winston-daily-rotate-file');

const consoleConfig = [
  new winston.transports.Console({
    colorize: true,
  }),
];

const createLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.timestamp({ format: 'MM/DD/YYYY hh:mm:ss.SSS' }),
    winston.format.json(),
    winston.format.printf((info) => `${info.timestamp} [${info.level}] : ${info.message}`),
  ),
  transports: consoleConfig,
});

const successLogger = createLogger;
successLogger.add(new winstonRotator({
  name: 'access-file',
  level: 'info',
  filename: './logs/access.log',
  json: false,
  datePattern: 'yyyy-MM-dd-',
  prepend: true,
}));

const errorLogger = createLogger;
errorLogger.add(new winstonRotator({
  name: 'error-file',
  level: 'error',
  filename: './logs/error.log',
  json: false,
  datePattern: 'yyyy-MM-dd-',
  prepend: true,
}));

module.exports = {
  successlog: successLogger,
  errorlog: errorLogger,
};
