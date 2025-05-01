import Joi from "joi"
import APP_CONSTANTS from "../config/constants.config"

/**
 * Task creation validation schema
 */
export const taskCreateValidation = Joi.object({
  title: Joi.string().required().min(3).max(100),
  description: Joi.string().required().min(3).max(500),
  status: Joi.string().valid(
    APP_CONSTANTS.TASK_STATUS.TODO,
    APP_CONSTANTS.TASK_STATUS.IN_PROGRESS,
    APP_CONSTANTS.TASK_STATUS.REVIEW,
    APP_CONSTANTS.TASK_STATUS.DONE,
  ),
  projectId: Joi.string().required(),
})

/**
 * Task update validation schema
 */
export const taskUpdateValidation = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(3).max(500),
  status: Joi.string().valid(
    APP_CONSTANTS.TASK_STATUS.TODO,
    APP_CONSTANTS.TASK_STATUS.IN_PROGRESS,
    APP_CONSTANTS.TASK_STATUS.REVIEW,
    APP_CONSTANTS.TASK_STATUS.DONE,
  ),
}).min(1)
