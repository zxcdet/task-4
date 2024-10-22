import * as usersRepo from './user.memory.repository.js';

const getAll = () => usersRepo.getAll();
const create = body => {
  return usersRepo.create(body);
};
const findOne = entity => usersRepo.findOne(entity);
const deleteById = id => usersRepo.deleteById(id);
const updateUserById = (body, id) => usersRepo.updateById(body, id);

export { getAll, create, findOne, deleteById, updateUserById };
