import express from 'express';
import { wrapAsync } from '../../common/wrap-async.js';
import { ResponseError } from '../../common/handler-error.js';
import status from 'http-status';
import jwt from 'jsonwebtoken';
import { config } from '../../common/config.js';
import * as userService from '../users/user.service.js';
import bcrypt from 'bcrypt';

const router = express.Router();
router.route('/').post(
  wrapAsync(async (req, res) => {
    const { login, password } = req.body;
    const entity = await userService.findByLogin(login);
    const isCorrect = await bcrypt.compare(password, entity[0].password);
    if (isCorrect) {
      const token = jwt.sign(
        { login: req.body.login, userId: entity[0].id },
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
