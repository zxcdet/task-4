import { ResponseError } from '../common/handler-error.js';
import status from 'http-status';
import { logger } from '../common/logger.js';

export function errorMiddleware() {
  return (err, req, res, next) => {
    if (err instanceof ResponseError) {
      res.sendStatus(err.statusCode);
    } else {
      logger.error({
        level: 'error',
        message: `Error: ${status[status.INTERNAL_SERVER_ERROR]}`
      });
      next();
    }
  };
}
