import Joi from "joi";

const paramSchema = Joi.object({
    id: Joi.string().required().min(5).lowercase().max(50),
})
export {paramSchema}