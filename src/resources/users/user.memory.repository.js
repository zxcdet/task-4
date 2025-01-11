import { QueryTypes } from 'sequelize';
import { sequelize } from '../../common/sql-db.js';

const getAll = async () => {
  return await sequelize.query('SELECT id, name, login FROM users', {
    type: QueryTypes.SELECT
  });
};
const findByLogin = async login => {
  return await sequelize.query(
    'SELECT id, name, login, password FROM users WHERE login = :login',
    {
      replacements: {
        login
      },
      type: QueryTypes.SELECT
    }
  );
};
const findOneById = async id => {
  return await sequelize.query(
    'SELECT id, name, login FROM users WHERE id = :id',
    {
      replacements: {
        id
      },
      type: QueryTypes.SELECT
    }
  );
};
const create = async body => {
  const id = await sequelize.query(
    'INSERT INTO users (name, login, password) VALUES (:name, :login, :password)',
    {
      replacements: {
        name: body.name,
        login: body.login,
        password: body.password
      },
      type: QueryTypes.INSERT
    }
  );
  return await sequelize.query(
    'SELECT id, name, login FROM users WHERE id = :id',
    {
      replacements: {
        id: id[0]
      },
      type: QueryTypes.SELECT
    }
  );
};
const deleteById = async id => {
  const result = await sequelize.query(
    'SELECT id, name, login FROM users WHERE id = :id',
    {
      replacements: {
        id
      },
      type: QueryTypes.SELECT
    }
  );
  await sequelize.query('DELETE FROM users WHERE id = :id', {
    replacements: {
      id
    },
    type: QueryTypes.DELETE
  });
  return result;
};
const updateById = async (body, id) => {
  await sequelize.query(
    'UPDATE users SET name = :name, login = :login, password = :password WHERE id = :id',
    {
      replacements: {
        name: body.name,
        login: body.login,
        password: body.password,
        id
      },
      type: QueryTypes.UPDATE
    }
  );
  return await sequelize.query(
    'SELECT id, name, login FROM users WHERE id = :id',
    {
      replacements: {
        id
      },
      type: QueryTypes.SELECT
    }
  );
};

export { getAll, create, findByLogin, deleteById, updateById, findOneById };
