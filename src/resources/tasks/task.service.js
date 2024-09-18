import * as taskRepo from './task.memory.repository.js';

const getAll = id => taskRepo.getAll(id);
const create = (body, id) => taskRepo.create(body, id);
const getById = (id, taskId) => taskRepo.getById(id, taskId);
const deleteById = (id, taskId) => taskRepo.deleteById(id, taskId);
const updateById = (body, id, taskId) => taskRepo.updateById(body, id, taskId);

export { getAll, create, getById, deleteById, updateById };
