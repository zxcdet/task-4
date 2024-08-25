import Joi from 'joi';

const boardSchema = Joi.object({
  title: Joi.string()
    .required()
    .max(30)
    .min(1)
    .lowercase(),
  columns: Joi.array().items(
    Joi.object({
      title: Joi.string()
        .required()
        .min(1)
        .alphanum()
        .lowercase(),
      order: Joi.number()
        .required()
        .integer()
        .min(1),
      id: Joi.string()
        .min(5)
        .lowercase()
        .max(50)
    })
  ),
  id: Joi.string()
    .min(5)
    .lowercase()
    .max(50)
});
export { boardSchema };
