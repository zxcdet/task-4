import { sequelize } from '../../common/sql-db.js';
import { QueryTypes } from 'sequelize';

const getAll = async () => {
  return await sequelize.query('SELECT id, title, columns FROM boards', {
    type: QueryTypes.SELECT
  });
};

const getById = async id => {
  return await sequelize.query(
    'SELECT id, title, columns FROM boards WHERE id = :id',
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
    'INSERT INTO boards (title, columns) VALUES (:title, :columns)',
    {
      replacements: {
        title: body.title,
        columns: body.columns
      },
      type: QueryTypes.INSERT
    }
  );
  return await sequelize.query(
    'SELECT id, title, columns FROM boards WHERE id = :id',
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
    'SELECT id, title, columns FROM boards WHERE id = :id',
    {
      replacements: {
        id
      },
      type: QueryTypes.SELECT
    }
  );

  await sequelize.query('DELETE FROM boards WHERE id = :id', {
    replacements: {
      id
    },
    type: QueryTypes.DELETE
  });
  return result;
};

const updateById = async (body, id) => {
  await sequelize.query(
    'UPDATE boards SET title = :title, columns = :columns WHERE id = :id',
    {
      replacements: {
        title: body.title,
        columns: body.columns,
        id
      },
      type: QueryTypes.UPDATE
    }
  );

  return await sequelize.query(
    'SELECT id, title, columns FROM boards WHERE id = :id',
    {
      replacements: {
        id
      },
      type: QueryTypes.SELECT
    }
  );
};

export { getAll, create, getById, deleteById, updateById };
