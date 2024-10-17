import * as usersRepo from './user.memory.repository.js';
import { hashSync } from 'bcrypt';

const getAll = () => usersRepo.getAll();
const create = body => {
  const mapBody = { ...body, password: hashSync(body.password, 5) };
  return usersRepo.create(mapBody);
};
const getById = id => usersRepo.getById(id);
const deleteById = id => usersRepo.deleteById(id);
const updateUserById = (body, id) => usersRepo.updateById(body, id);

export { getAll, create, getById, deleteById, updateUserById };
