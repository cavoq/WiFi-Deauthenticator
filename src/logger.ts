/**
 * Configurations of logger.
 */

import path from 'node:path';
import winston from 'winston';
import winstonRotator from 'winston-daily-rotate-file';

const createLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.timestamp({ format: 'MM/DD/YYYY hh:mm:ss.SSS' }),
    winston.format.json(),
    winston.format.printf((info) => `${info.timestamp} [${info.level}] : ${info.message}`),
  ),
  transports: new winston.transports.Console({}),
});

const successLogger = createLogger;
successLogger.add(new winstonRotator({
  name: 'access-file',
  level: 'info',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  filename: path.join(__dirname, '../../logs/access.log'),
  json: false,
  datePattern: 'yyyy-MM-dd-',
  prepend: true,
}));

const errorLogger = createLogger;
errorLogger.add(new winstonRotator({
  name: 'error-file',
  level: 'error',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  filename: path.join(__dirname, '../../logs/error.log'),
  json: false,
  datePattern: 'yyyy-MM-dd-',
  prepend: true,
}));

export {errorLogger as errorlog, successLogger as successlog};
