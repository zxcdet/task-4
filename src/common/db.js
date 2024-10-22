import mongoose from 'mongoose';
import { config } from './config.js';
import { User } from '../resources/users/user.model.js';
import { logger } from './logger.js';

export const connectDb = () => {
  mongoose
    .connect(config.MONGO_CONNECTION_STRING)
    .then(() => {
      const db = mongoose.connection;

      db.dropDatabase()
        .then(() => {
          User.create({ login: 'admin', password: 'admin' });
          console.log('Database dropped.');
          console.log('MongoDB connected.');
        })
        .catch(error => {
          console.log('Error dropping database:', error);
          logger.error({
            level: 'error',
            message: `Db error: ${error}`
          });
        });
    })
    .catch(error => {
      console.log(error);
      logger.error({
        level: 'error',
        message: `Db error: ${error}`
      });
    });
};
