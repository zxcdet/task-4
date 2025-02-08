import { prisma } from '../../common/prisma-client.js';

const getAll = async () => {
  return prisma.user.findMany();
};
const findByLogin = async login => {
  return prisma.user.findFirst({
    where: { login }
  });
};
const findOneUser = async id => {
  return prisma.user.findUnique({
    where: { id }
  });
};
const create = async body => {
  return prisma.user.create({
    data: {
      ...body
    }
  });
};
const deleteById = async id => {
  return prisma.user.delete({
    where: { id }
  });
};
const updateById = async (body, id) => {
  return prisma.user.update({
    data: {
      ...body
    },
    where: { id }
  });
};

export { getAll, create, findByLogin, deleteById, updateById, findOneUser };
