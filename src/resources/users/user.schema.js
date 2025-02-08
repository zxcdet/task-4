import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string()
    .max(30)
    .min(1),
  login: Joi.string()
    .required()
    .max(30)
    .min(1),
  password: Joi.string()
    .required()
    .max(30)
    .min(1),
  id: Joi.string()
    .lowercase()
    .max(50)
});

export { userSchema };
