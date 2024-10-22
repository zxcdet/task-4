import express from 'express';
import * as usersService from './user.service.js';
import { UserModel } from './user.model.js';
import status from 'http-status';
import { wrapAsync } from '../../common/wrap-async.js';
import { ResponseError } from '../../common/handler-error.js';
import { validateMiddleware } from '../../middlewares/validate-middleware.js';
import { userSchema } from './user.schema.js';
import { paramSchema } from '../../common/param.schema.js';

const router = express.Router();
const userModel = new UserModel();
router
  .route('/')
  .get(
    wrapAsync(async (req, res) => {
      const user = await usersService.getAll();
      if (user.length > 0) {
        res.json(
          user.map(value => {
            return { name: value.name, id: value.id, login: value.login };
          })
        );
      } else {
        res.json([]);
      }
    })
  )
  .post(
    validateMiddleware(userSchema),
    wrapAsync(async (req, res) => {
      const user = await usersService.create(req.body);
      if (user) {
        res.json(userModel.toResponse(user));
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
      const user = await usersService.findOne({ _id: id });
      if (user) {
        res.json(userModel.toResponse(user));
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
      const user = await usersService.updateUserById(req.body, id);
      if (user) {
        res.json(userModel.toResponse(user));
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
      if (user) {
        res.sendStatus(status.NO_CONTENT);
      } else {
        throw new ResponseError(status.NOT_FOUND);
      }
    })
  );

const userRouter = router;

export { userRouter };
