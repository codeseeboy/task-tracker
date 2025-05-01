import type { Request, Response, NextFunction } from "express"
import ProjectService from "../service/Project.service"
import type { ProjectCreateDto, ProjectUpdateDto } from "../dto/Project.dto"
import { projectCreateValidation, projectUpdateValidation } from "../schemas/Project.schema"
import { RequestValidationError } from "../utils/errors.util"
import HttpStatusCode from "../utils/http-codes.util"

/**
 * ProjectController
 *
 * Class to handle project related operations
 */
class ProjectController {
  /**
   * createProject
   *
   * Create a new project
   *
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   */
  createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get user ID from token
      const userId = res.locals.userId

      // Project details
      const requestBody: ProjectCreateDto = req.body

      // Validate the project input
      const { error, value: projectDto } = projectCreateValidation.validate(requestBody, { abortEarly: false })
      if (error) {
        throw new RequestValidationError(error)
      }

      // Create project
      const result = await ProjectService.createProject(userId, projectDto)

      // Send response
      res.status(HttpStatusCode.CREATED_201).json(result)
    } catch (error: any) {
      next(error)
    }
  }

  /**
   * getProjects
   *
   * Get all projects for a user
   *
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   */
  getProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get user ID from token
      const userId = res.locals.userId

      // Get projects
      const result = await ProjectService.getProjectsByUserId(userId)

      // Send response
      res.status(HttpStatusCode.OK_200).json(result)
    } catch (error: any) {
      next(error)
    }
  }

  /**
   * getProjectById
   *
   * Get a project by ID
   *
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   */
  getProjectById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get user ID from token
      const userId = res.locals.userId

      // Get project ID from params
      const projectId = req.params.projectId

      console.log("Fetching project with ID:", projectId)
      console.log("User ID:", userId)
      // Get project
      const result = await ProjectService.getProjectById(userId, projectId)

      // Send response
      res.status(HttpStatusCode.OK_200).json(result)
    } catch (error: any) {
      next(error)
    }
  }

  /**
   * updateProject
   *
   * Update a project
   *
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   */
  updateProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get user ID from token
      const userId = res.locals.userId

      // Get project ID from params
      const projectId = req.params.projectId

      // Project update details
      const requestBody: ProjectUpdateDto = req.body

      // Validate the project input
      const { error, value: projectDto } = projectUpdateValidation.validate(requestBody, { abortEarly: false })
      if (error) {
        throw new RequestValidationError(error)
      }

      // Update project
      const result = await ProjectService.updateProject(userId, projectId, projectDto)

      // Send response
      res.status(HttpStatusCode.OK_200).json(result)
    } catch (error: any) {
      next(error)
    }
  }

  /**
   * deleteProject
   *
   * Delete a project
   *
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   */
  deleteProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get user ID from token
      const userId = res.locals.userId

      // Get project ID from params
      const projectId = req.params.projectId

      // Delete project
      await ProjectService.deleteProject(userId, projectId)

      // Send response
      res.status(HttpStatusCode.NO_CONTENT_204).send()
    } catch (error: any) {
      next(error)
    }
  }
}

export default ProjectController
