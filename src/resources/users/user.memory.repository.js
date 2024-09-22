import { User } from './user.model.js';

const getAll = async () => {
  return User.find();
};
const getById = async id => {
  return User.findById(id);
};
const create = async body => {
  return User.create(body);
};
const deleteById = async id => {
  return User.findByIdAndDelete(id);
};
const updateById = async (body, id) => {
  return User.findByIdAndUpdate(id, body);
};

export { getAll, create, getById, deleteById, updateById };
