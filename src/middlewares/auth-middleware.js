import jwt from 'jsonwebtoken';
import { config } from '../common/config.js';
import status from 'http-status';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, config.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(status.UNAUTHORIZED);
      }
      req.user = user;
      next();
    });
  } else {
    return res.sendStatus(status.UNAUTHORIZED);
  }
};
export { authMiddleware };
