import { logger } from '../common/logger.js';
import morgan from 'morgan';

const stream = (logger.stream = {
  write: message => logger.info(message.trim())
});

export const morganMiddleware = morgan('tiny', { stream });
