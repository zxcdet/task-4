import * as taskService from './task.service.js';
import express from 'express';
import status from 'http-status';
import { wrapAsync } from '../../common/wrap-async.js';
import { ResponseError } from '../../common/handler-error.js';
import { validateMiddleware } from '../../middlewares/validate-middleware.js';
import {
  paramBoardSchema,
  paramBoardTaskSchema,
  taskSchema
} from './task.schema.js';

const router = express.Router({ mergeParams: true });
router
  .route('/')
  .get(
    validateMiddleware(paramBoardSchema, 'params'),
    wrapAsync(async (req, res) => {
      const id = req.params.boardId;
      const tasks = await taskService.getAll(id);
      if (tasks.length > 0) {
        res.json(tasks);
      } else {
        throw new ResponseError(status.NOT_FOUND);
      }
    })
  )
  .post(
    validateMiddleware(paramBoardSchema, 'params'),
    validateMiddleware(taskSchema),
    wrapAsync(async (req, res) => {
      const id = req.params.boardId;
      const tasks = await taskService.create(req.body, id);
      if (tasks) {
        res.json(tasks);
      } else {
        throw new ResponseError(status.NOT_FOUND);
      }
    })
  );

router
  .route('/:taskId')
  .get(
    validateMiddleware(paramBoardTaskSchema, 'params'),
    wrapAsync(async (req, res) => {
      const { boardId, taskId } = req.params;
      const task = await taskService.getById(boardId, taskId);
      if (task) {
        res.json(task);
      } else {
        throw new ResponseError(status.NOT_FOUND);
      }
    })
  )
  .put(
    validateMiddleware(paramBoardTaskSchema, 'params'),
    validateMiddleware(taskSchema),
    wrapAsync(async (req, res) => {
      const { boardId, taskId } = req.params;
      const tasks = await taskService.updateById(req.body, boardId, taskId);
      if (tasks) {
        res.json(tasks);
      } else {
        throw new ResponseError(status.NOT_FOUND);
      }
    })
  )
  .delete(
    validateMiddleware(paramBoardTaskSchema, 'params'),
    wrapAsync(async (req, res) => {
      const { boardId, taskId } = req.params;
      const tasks = await taskService.deleteById(boardId, taskId);
      if (tasks) {
        res.sendStatus(status.OK);
      } else {
        throw new ResponseError(status.NOT_FOUND);
      }
    })
  );
const taskRouter = router;
export { taskRouter };
