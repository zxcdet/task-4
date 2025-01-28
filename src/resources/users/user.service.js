import * as usersRepo from './user.memory.repository.js';

const getAll = () => usersRepo.getAll();
const create = body => {
  return usersRepo.create(body);
};
const findByLogin = login => usersRepo.findByLogin(login);
const findById = id => usersRepo.findOneById(id);
const deleteById = id => usersRepo.deleteById(id);
const updateUserById = (body, id) => usersRepo.updateById(body, id);

export { getAll, create, findByLogin, deleteById, updateUserById, findById };
