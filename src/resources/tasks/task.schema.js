import Joi from "joi";

const taskSchema = Joi.object({
    title: Joi.string().required().max(30).min(1),
    order: Joi.number().required().integer(),
    description: Joi.string().required().max(30).min(1),
    userId:  Joi.string().max(50).min(5).lowercase().allow(null),
    boardId:  Joi.string().max(50).min(5).lowercase().allow(null),
    columnId:  Joi.string().max(50).min(5).lowercase().allow(null),
    id: Joi.string().min(5).lowercase().max(50),
});

const paramBoardSchema = Joi.object({
    boardId: Joi.string().required().min(5).lowercase().max(50),
})

const paramBoardTaskSchema = Joi.object({
    boardId: Joi.string().required().min(5).lowercase().max(50),
    taskId: Joi.string().required().min(5).lowercase().max(50),
})

export {taskSchema,paramBoardSchema,paramBoardTaskSchema}