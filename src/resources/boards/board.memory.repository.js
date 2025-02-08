import { prisma } from '../../common/prisma-client.js';

const getAll = async () => {
  return prisma.board.findMany();
};
const getById = async id => {
  return prisma.board.findUnique({
    where: { id }
  });
};
const create = async body => {
  return prisma.board.create({
    data: {
      title: body.title,
      columns: body.columns
    }
  });
};
const deleteById = async id => {
  return prisma.board.delete({
    where: { id }
  });
};
const updateById = async (body, id) => {
  return prisma.board.update({
    data: {
      ...body
    },
    where: { id }
  });
};

export { getAll, create, getById, deleteById, updateById };
