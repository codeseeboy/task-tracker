import type { Request, Response, NextFunction } from "express"
import TaskService from "../service/Task.service"
import type { TaskCreateDto, TaskUpdateDto } from "../dto/Task.dto"
import { taskCreateValidation, taskUpdateValidation } from "../schemas/Task.schema"
import { RequestValidationError } from "../utils/errors.util"
import HttpStatusCode from "../utils/http-codes.util"

/**
 * TaskController
 *
 * Class to handle task related operations
 */
class TaskController {
  /**
   * createTask
   *
   * Create a new task
   *
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   */
  createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get user ID from token
      const userId = res.locals.userId

      // Task details
      const requestBody: TaskCreateDto = req.body

      // Validate the task input
      const { error, value: taskDto } = taskCreateValidation.validate(requestBody, { abortEarly: false })
      if (error) {
        throw new RequestValidationError(error)
      }

      // Create task
      const result = await TaskService.createTask(userId, taskDto)

      // Send response
      res.status(HttpStatusCode.CREATED_201).json(result)
    } catch (error: any) {
      next(error)
    }
  }

  /**
   * getTasks
   *
   * Get all tasks for a project
   *
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   */
  getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get user ID from token
      const userId = res.locals.userId

      // Get project ID from query if it exists
      const projectId = req.query.projectId as string | undefined
      
      let result;
      
      // If projectId is provided, get tasks for that project
      // Otherwise, get all tasks for the user
      if (projectId) {
        result = await TaskService.getTasksByProjectId(userId, projectId)
      } else {
        result = await TaskService.getAllUserTasks(userId)
      }

      // Send response
      res.status(HttpStatusCode.OK_200).json(result)
    } catch (error: any) {
      next(error)
    }
  }

  /**
   * getTaskById
   *
   * Get a task by ID
   *
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   */
  getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get user ID from token
      const userId = res.locals.userId

      // Get task ID from params
      const taskId = req.params.taskId

      // Get task
      const result = await TaskService.getTaskById(userId, taskId)

      // Send response
      res.status(HttpStatusCode.OK_200).json(result)
    } catch (error: any) {
      next(error)
    }
  }

  /**
   * updateTask
   *
   * Update a task
   *
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   */
  updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get user ID from token
      const userId = res.locals.userId

      // Get task ID from params
      const taskId = req.params.taskId

      // Task update details
      const requestBody: TaskUpdateDto = req.body

      // Validate the task input
      const { error, value: taskDto } = taskUpdateValidation.validate(requestBody, { abortEarly: false })
      if (error) {
        throw new RequestValidationError(error)
      }

      // Update task
      const result = await TaskService.updateTask(userId, taskId, taskDto)

      // Send response
      res.status(HttpStatusCode.OK_200).json(result)
    } catch (error: any) {
      next(error)
    }
  }

  /**
   * deleteTask
   *
   * Delete a task
   *
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   */
  deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get user ID from token
      const userId = res.locals.userId

      // Get task ID from params
      const taskId = req.params.taskId

      // Delete task
      await TaskService.deleteTask(userId, taskId)

      // Send response
      res.status(HttpStatusCode.NO_CONTENT_204).send()
    } catch (error: any) {
      next(error)
    }
  }
}

export default TaskController
