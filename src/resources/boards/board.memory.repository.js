import { Board } from './board.model.js';
import { Task } from '../tasks/task.model.js';

const getAll = async () => {
  return Board.find();
};
const getById = async id => {
  return Board.findById(id);
};
const create = async body => {
  return Board.create(body);
};
const deleteById = async id => {
  await Task.deleteMany({ boardId: id });
  return Board.findByIdAndDelete(id);
};
const updateById = async (body, id) => {
  return Board.findByIdAndUpdate(id, body);
};

export { getAll, create, getById, deleteById, updateById };
