import { Task } from './task.model.js';

const getAll = async id => {
  return Task.find({ boardId: id });
};
const getById = async (id, taskId) => {
  return Task.findOne({ boardId: id, id: taskId });
};
const create = async (body, id) => {
  return Task.create({ ...body, boardId: id });
};
const deleteById = async (id, taskId) => {
  return Task.findByIdAndDelete({ boardId: id, _id: taskId });
};
const updateById = async (body, id, taskId) => {
  return Task.findOneAndUpdate({ boardId: id, _id: taskId }, body);
};

export { getAll, create, getById, deleteById, updateById };
