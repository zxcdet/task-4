import { User } from './user.model.js';
import { Task } from '../tasks/task.model.js';

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
  await Task.updateMany({ userId: id }, { userId: null });
  return User.findByIdAndDelete(id);
};
const updateById = async (body, id) => {
  return User.findByIdAndUpdate(id, body);
};

export { getAll, create, getById, deleteById, updateById };
