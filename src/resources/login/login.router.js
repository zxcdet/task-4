import express from 'express';
import { validateMiddleware } from '../../middlewares/validate-middleware.js';
import { wrapAsync } from '../../common/wrap-async.js';
import { loginSchema } from './login.schema.js';
import * as loginService from './login.service.js';
import { ResponseError } from '../../common/handler-error.js';
import status from 'http-status';
import jwt from 'jsonwebtoken';
import { config } from '../../common/config.js';

const router = express.Router();
router.route('/').post(
  validateMiddleware(loginSchema),
  wrapAsync(async (req, res) => {
    const login = await loginService.login(req.body);
    if (login) {
      const token = jwt.sign(
        { login: req.body.login, userId: login.id },
        config.JWT_SECRET_KEY,
        { expiresIn: '20h' }
      );
      return res.json({ token });
    }
    throw new ResponseError(status.NOT_FOUND);
  })
);

const loginRouter = router;
export { loginRouter };
