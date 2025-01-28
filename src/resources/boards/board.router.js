import express from 'express';
import * as boardService from './board.service.js';
import status from 'http-status';
import { wrapAsync } from '../../common/wrap-async.js';
import { ResponseError } from '../../common/handler-error.js';
import { validateMiddleware } from '../../middlewares/validate-middleware.js';
import { boardSchema } from './board.schema.js';
import { paramSchema } from '../../common/param.schema.js';
import { BoardModel } from './board.model.js';

const router = express.Router();
const boardModel = new BoardModel();
router
  .route('/')
  .get(
    wrapAsync(async (req, res) => {
      const boards = await boardService.getAll();
      if (boards.length) {
        const result = boards.map(board => boardModel.toResponse(board));
        res.json(result);
      } else {
        res.json([]);
      }
    })
  )
  .post(
    validateMiddleware(boardSchema),
    wrapAsync(async (req, res) => {
      const saveData = boardModel.toSave(req.body);
      const board = await boardService.create(saveData);
      if (board) {
        res.json(boardModel.toResponse(...board));
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
      const board = await boardService.getById(id);
      if (board.length) {
        res.json(boardModel.toResponse(...board));
      } else {
        throw new ResponseError(status.NOT_FOUND);
      }
    })
  )
  .put(
    validateMiddleware(paramSchema, 'params'),
    validateMiddleware(boardSchema),
    wrapAsync(async (req, res) => {
      const id = req.params.id;
      const saveData = {
        ...req.body,
        columns: JSON.stringify(req.body.columns)
      };
      const board = await boardService.updateById(saveData, id);
      if (board.length) {
        res.json(boardModel.toResponse(...board));
      } else {
        throw new ResponseError(status.NOT_FOUND);
      }
    })
  )
  .delete(
    validateMiddleware(paramSchema, 'params'),
    wrapAsync(async (req, res) => {
      const id = req.params.id;
      const board = await boardService.deleteById(id);
      if (board[0].id) {
        res.sendStatus(status.OK);
      } else {
        throw new ResponseError(status.NOT_FOUND);
      }
    })
  );

const boardRouter = router;

export { boardRouter };
