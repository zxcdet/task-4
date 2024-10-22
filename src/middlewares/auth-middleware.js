import jwt from 'jsonwebtoken';
import { config } from '../common/config.js';
import status from 'http-status';
import { wrapAsync } from '../common/wrap-async.js';
import { ResponseError } from '../common/handler-error.js';

const authMiddleware = wrapAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.replace('Bearer ', '') : '';
  jwt.verify(token, config.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      throw new ResponseError(status.UNAUTHORIZED);
    } else {
      req.user = user;
      next();
    }
  });
});
export { authMiddleware };
