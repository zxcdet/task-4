import { prisma } from '../../common/prisma-client.js';

const getAll = async id => {
  return prisma.task.findMany({
    where: {
      boardId: id
    }
  });
};
const getById = async (id, taskId) => {
  return prisma.task.findUnique({
    where: {
      id: taskId,
      boardId: id
    }
  });
};
const create = async (body, id) => {
  return prisma.task.create({
    data: {
      ...body,
      boardId: id
    }
  });
};
const deleteById = async (id, taskId) => {
  return prisma.task.deleteMany({
    where: {
      id: taskId,
      boardId: id
    }
  });
};
const updateById = async (body, id, taskId) => {
  return prisma.task.update({
    where: {
      id: taskId,
      boardId: id
    },
    data: body
  });
};

export { getAll, create, getById, deleteById, updateById };
