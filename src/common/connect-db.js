import { sequelize } from './sql-db.js';

export const connectDb = () => {
  return sequelize.authenticate();
};
