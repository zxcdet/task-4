import express from 'express';
import * as usersService from './user.service.js';
import { toSave, UserSqlModel } from './user.model.js';
import status from 'http-status';
import { wrapAsync } from '../../common/wrap-async.js';
import { ResponseError } from '../../common/handler-error.js';
import { validateMiddleware } from '../../middlewares/validate-middleware.js';
import { userSchema } from './user.schema.js';
import { paramSchema } from '../../common/param.schema.js';

const router = express.Router();
const userSqlModel = new UserSqlModel();
router
  .route('/')
  .get(
    wrapAsync(async (req, res) => {
      const user = await usersService.getAll();
      if (user.length > 0) {
        res.json(user);
      } else {
        res.json([]);
      }
    })
  )
  .post(
    validateMiddleware(userSchema),
    wrapAsync(async (req, res) => {
      const data = await toSave(req.body);
      const user = await usersService.create(data);
      if (user.length) {
        res.json(userSqlModel.toResponse(...user));
      } else {
        throw new ResponseError(status.NOT_FOUND);
      }
    })
  );

router
  .route('/:id')
  .get(
    validateMiddleware(paramSchema, 'params'),
    wrapAsync(async (req, res) => {
      const id = req.params.id;
      const user = await usersService.findById(id);
      if (user) {
        res.json(userSqlModel.toResponse(...user));
      } else {
        throw new ResponseError(status.NOT_FOUND);
      }
    })
  )
  .put(
    validateMiddleware(paramSchema, 'params'),
    validateMiddleware(userSchema),
    wrapAsync(async (req, res) => {
      const id = req.params.id;
      const data = await toSave(req.body);
      const user = await usersService.updateUserById(data, id);
      if (user) {
        res.json(userSqlModel.toResponse(...user));
      } else {
        throw new ResponseError(status.NOT_FOUND);
      }
    })
  )
  .delete(
    validateMiddleware(paramSchema, 'params'),
    wrapAsync(async (req, res) => {
      const id = req.params.id;
      const user = await usersService.deleteById(id);
      if (user.length) {
        res.sendStatus(status.NO_CONTENT);
      } else {
        throw new ResponseError(status.NOT_FOUND);
      }
    })
  );

const userRouter = router;

export { userRouter };
