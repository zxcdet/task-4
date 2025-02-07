import Joi from 'joi';

const taskSchema = Joi.object({
  title: Joi.string()
    .required()
    .max(30)
    .min(1),
  order: Joi.number()
    .required()
    .integer(),
  description: Joi.string()
    .required()
    .max(30)
    .min(1),
  userId: Joi.string()
    .lowercase()
    .allow(null),
  boardId: Joi.string()
    .lowercase()
    .allow(null),
  columnId: Joi.string()
    .lowercase()
    .allow(null),
  id: Joi.string().lowercase()
});

const paramBoardSchema = Joi.object({
  boardId: Joi.required()
});

const paramBoardTaskSchema = Joi.object({
  boardId: Joi.string()
    .required()
    .lowercase()
    .max(50),
  taskId: Joi.string()
    .required()
    .lowercase()
    .max(50)
});

export { taskSchema, paramBoardSchema, paramBoardTaskSchema };
