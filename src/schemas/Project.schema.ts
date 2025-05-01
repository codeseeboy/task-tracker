import Joi from "joi"

/**
 * Project creation validation schema
 */
export const projectCreateValidation = Joi.object({
  name: Joi.string().required().min(3).max(50),
  description: Joi.string().required().min(3).max(500),
})

/**
 * Project update validation schema
 */
export const projectUpdateValidation = Joi.object({
  name: Joi.string().min(3).max(50),
  description: Joi.string().min(3).max(500),
}).min(1)
