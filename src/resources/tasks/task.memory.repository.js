import { sequelize } from '../../common/sql-db.js';
import { QueryTypes } from 'sequelize';

const getAll = async id => {
  return await sequelize.query(
    'SELECT id, title, `order`, description, userId, boardId , columnId FROM tasks WHERE boardId = :id',
    {
      replacements: {
        id
      },
      type: QueryTypes.SELECT
    }
  );
};

const getById = async (id, taskId) => {
  return await sequelize.query(
    'SELECT id, title, `order`, description, userId, boardId , columnId FROM tasks WHERE boardId = :id AND id = :taskId',
    {
      replacements: {
        id,
        taskId
      },
      type: QueryTypes.SELECT
    }
  );
};

const create = async (body, boardId) => {
  const id = await sequelize.query(
    'INSERT INTO tasks (title,  `order`,description, userId,boardId) VALUES (:title, :order, :description, :userId, :boardId)',
    {
      replacements: {
        title: body.title,
        order: body.order,
        description: body.description,
        userId: body.userId,
        boardId
      },
      type: QueryTypes.INSERT
    }
  );

  return await sequelize.query(
    'SELECT id, title, `order`, description, userId, boardId , columnId FROM tasks WHERE id = :id',
    {
      replacements: {
        id: id[0]
      },
      type: QueryTypes.SELECT
    }
  );
};

const deleteById = async (id, taskId) => {
  const result = await sequelize.query(
    'SELECT id, title, `order`, description, userId, boardId , columnId FROM tasks WHERE boardId = :id AND id = :taskId',
    {
      replacements: {
        id,
        taskId
      },
      type: QueryTypes.SELECT
    }
  );
  await sequelize.query(
    'DELETE FROM tasks WHERE boardId = :id AND id = :taskId',
    {
      replacements: {
        id,
        taskId
      },
      type: QueryTypes.DELETE
    }
  );
  return result;
};

const updateById = async (body, id, taskId) => {
  await sequelize.query(
    'UPDATE tasks SET title = :title, `order` = :order, description = :description, userId = :userId, boardId = :boardId  WHERE boardId = :id AND id = :taskId',
    {
      replacements: {
        title: body.title,
        columns: body.columns,
        order: body.order,
        description: body.description,
        userId: body.userId,
        boardId: body.boardId,
        id,
        taskId
      },
      type: QueryTypes.UPDATE
    }
  );

  return await sequelize.query(
    'SELECT id, title, `order`, description, userId, boardId , columnId FROM tasks WHERE boardId = :id AND id = :taskId',
    {
      replacements: {
        id,
        taskId
      },
      type: QueryTypes.SELECT
    }
  );
};

export { getAll, create, getById, deleteById, updateById };
