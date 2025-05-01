import Joi from "joi"

/**
 * User signup validation schema
 */
export const userSignupValidation = Joi.object({
  name: Joi.string().required().min(3).max(50),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
  country: Joi.string().required(),
})

/**
 * User login validation schema
 */
export const userLoginValidation = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
})

/**
 * User update validation schema
 */
export const userUpdateValidation = Joi.object({
  name: Joi.string().min(3).max(50),
  country: Joi.string(),
}).min(1)
