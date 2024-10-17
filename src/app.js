import swaggerUI from 'swagger-ui-express';
import express from 'express';
import path from 'path';
import YAML from 'yamljs';
import { fileURLToPath } from 'url';
import { userRouter } from './resources/users/user.router.js';
import { boardRouter } from './resources/boards/board.router.js';
import { taskRouter } from './resources/tasks/task.router.js';
import { errorMiddleware } from './middlewares/error-middleware.js';
import { logger, morganMiddleware } from './common/logger.js';
import { handlerGlobalError } from './middlewares/handler-global-error.js';
import mongoose from 'mongoose';
import { config } from './common/config.js';
import { loginRouter } from './resources/login/login.router.js';
import { authMiddleware } from './middlewares/auth-middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
mongoose
  .connect(config.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log('MongoDB connected.');
  })
  .catch(error => {
    console.log(error);
    logger.error({
      level: 'error',
      message: `Db error: ${error}`
    });
  });

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
handlerGlobalError();
app.use('/login', loginRouter);
app.use(authMiddleware);
app.use(morganMiddleware);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);
app.use(errorMiddleware());

export { app };
