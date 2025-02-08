import express from 'express';
import * as boardService from './board.service.js';
import status from 'http-status';
import { wrapAsync } from '../../common/wrap-async.js';
import { ResponseError } from '../../common/handler-error.js';
import { BoardModel } from './board.model.js';
import { validateMiddleware } from '../../middlewares/validate-middleware.js';
import { boardSchema } from './board.schema.js';
import { paramSchema } from '../../common/param.schema.js';

const router = express.Router();
const boardModel = new BoardModel();
router
  .route('/')
  .get(
    wrapAsync(async (req, res) => {
      const boards = await boardService.getAll();
      if (boards.length > 0) {
        res.json(
          boards.map(board => {
            return {
              ...board,
              id: board.id.toString()
            };
          })
        );
      } else {
        res.json([]);
      }
    })
  )
  .post(
    validateMiddleware(boardSchema),
    wrapAsync(async (req, res) => {
      const board = await boardService.create(req.body);
      if (board) {
        res.json(boardModel.toResponse(board));
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
      if (board) {
        res.json(boardModel.toResponse(board));
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
      const board = await boardService.updateById(req.body, id);
      if (board) {
        res.json(boardModel.toResponse(board));
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
      if (board) {
        res.sendStatus(status.OK);
      } else {
        throw new ResponseError(status.NOT_FOUND);
      }
    })
  );

const boardRouter = router;

export { boardRouter };
