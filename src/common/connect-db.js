import { sequelize } from './sql-db.js';

export const connectDb = () => {
  sequelize
    .authenticate()
    .then(() => {
      try {
        console.log('Mysql connect!');
      } catch (error) {
        console.log('error', error);
      }
    })
    .catch(err => {
      console.error('mysql error', err);
    });
};
