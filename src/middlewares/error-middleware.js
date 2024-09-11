import { ResponseError } from '../common/handler-error.js';
import status from 'http-status';
import { logger } from '../common/logger.js';

export function errorMiddleware() {
  return (err, req, res, next) => {
    if (err instanceof ResponseError) {
      res.sendStatus(err.statusCode);
    } else {
      res.sendStatus(status[status.INTERNAL_SERVER_ERROR]);
      logger.error({
        level: 'error',
        status: status[status.INTERNAL_SERVER_ERROR],
        message: err.message,
        stack: err.stack,
        query: req.query,
        url: req.url,
        params: req.params,
        code: req.statusCode,
        body: req.body.password ? { ...req.body, password: '***' } : req.body,
        reason: err.reason || 'Unknown'
      });
      next();
    }
  };
}
