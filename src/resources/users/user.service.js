import * as usersRepo from './user.memory.repository.js';

const getAll = () => usersRepo.getAll();
const create = body => {
  return usersRepo.create(body);
};
const findLogin = login => usersRepo.findByLogin(login);
const findOneUser = id => usersRepo.findOneUser(id);
const deleteById = id => usersRepo.deleteById(id);
const updateUserById = (body, id) => usersRepo.updateById(body, id);

export { getAll, create, findLogin, deleteById, updateUserById, findOneUser };
