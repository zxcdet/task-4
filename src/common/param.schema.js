import Joi from 'joi';

const paramSchema = Joi.object({
  id: Joi.string()
    .required()
    .lowercase()
    .max(50)
});
export { paramSchema };
