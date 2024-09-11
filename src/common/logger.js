import winston from 'winston';
import morgan from 'morgan';

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.prettyPrint()
  ),
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.printf(
        ({ message, timestamp }) => `${timestamp} ${message}`
      )
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    })
  ]
});

morgan.token('time', () => new Date().toLocaleString());
morgan.token('body', req => {
  if (req.body && req.body.password) {
    const sanitizedBody = {
      ...req.body,
      password: req.body.password.replace(/./g, '*')
    };
    return JSON.stringify(sanitizedBody);
  }
  return JSON.stringify(req.body);
});
morgan.token('params', req => JSON.stringify(req.params));
morgan.token('query', req => JSON.stringify(req.query));
morgan.token('reason', (req, res) => {
  return res.locals.errorMessage || '';
});
const stream = (logger.stream = {
  write: message => logger.info(message.trim())
});

const morganMiddleware = morgan(
  ':time :method :url :status :response-time ms - Body: :body - Params: :params - Query: :query - Reason: :reason',
  { stream }
);

export { logger, morganMiddleware };
