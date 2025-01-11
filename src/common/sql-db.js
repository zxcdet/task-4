import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
  process.env.MYDB_NAME,
  process.env.MYDB_USER,
  process.env.MYDB_PASSWORD,
  {
    host: process.env.MYDB_HOST,
    dialect: process.env.MYDB_DIALECT,
    logging: false
  }
);
