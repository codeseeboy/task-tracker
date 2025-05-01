import type { ProjectCreateDto, ProjectUpdateDto } from "../dto/Project.dto"
import ProjectDao from "../dao/Project.dao"
import { BaseError, NotFoundError } from "../utils/errors.util"
import APP_CONSTANTS from "../config/constants.config"
import HttpStatusCode from "../utils/http-codes.util"

/**
 * ProjectService
 *
 * Class to handle project related operations
 */
class ProjectService {
  /**
   * createProject
   *
   * Create a new project
   *
   * @param {string} userId - User ID
   * @param {ProjectCreateDto} projectDto - Project data
   * @returns {Promise<object>} - Created project
   */
  async createProject(userId: string, projectDto: ProjectCreateDto): Promise<object> {
    try {
      // Check if user has reached project limit
      const projects = await ProjectDao.getProjectsByUserId(userId)
      if (projects.length >= APP_CONSTANTS.PROJECT_LIMIT) {
        throw new BaseError(
          `User can have a maximum of ${APP_CONSTANTS.PROJECT_LIMIT} projects`,
          HttpStatusCode.BAD_REQUEST_400,
        )
      }

      // Create project
      const project = await ProjectDao.createProject(userId, projectDto)

      // Return project data
      return project
    } catch (error) {
      throw error
    }
  }

  /**
   * getProjectsByUserId
   *
   * Get all projects for a user
   *
   * @param {string} userId - User ID
   * @returns {Promise<object[]>} - List of projects
   */
  async getProjectsByUserId(userId: string): Promise<object[]> {
    try {
      // Get projects
      const projects = await ProjectDao.getProjectsByUserId(userId)

      // Return projects
      return projects
    } catch (error) {
      throw error
    }
  }

  /**
   * getProjectById
   *
   * Get a project by ID
   *
   * @param {string} userId - User ID
   * @param {string} projectId - Project ID
   * @returns {Promise<object>} - Project data
   */
  async getProjectById(userId: string, projectId: string): Promise<object> {
    try {
      // Get project
      const project = await ProjectDao.getProjectById(projectId)
      if (!project) {
        throw new NotFoundError("Project not found")
      }

      // Check if project belongs to user
      if (project.userId.toString() !== userId) {
        throw new NotFoundError("Project not found")
      }

      // Return project data
      return project
    } catch (error) {
      throw error
    }
  }

  /**
   * updateProject
   *
   * Update a project
   *
   * @param {string} userId - User ID
   * @param {string} projectId - Project ID
   * @param {ProjectUpdateDto} projectDto - Project update data
   * @returns {Promise<object>} - Updated project
   */
  async updateProject(userId: string, projectId: string, projectDto: ProjectUpdateDto): Promise<object> {
    try {
      // Check if project exists
      const existingProject = await ProjectDao.getProjectById(projectId)
      if (!existingProject) {
        throw new NotFoundError("Project not found")
      }

      // Check if project belongs to user
      if (existingProject.userId.toString() !== userId) {
        throw new NotFoundError("Project not found")
      }

      // Update project
      const project = await ProjectDao.updateProject(projectId, projectDto)

      // Return project data
      return project
    } catch (error) {
      throw error
    }
  }

  /**
   * deleteProject
   *
   * Delete a project
   *
   * @param {string} userId - User ID
   * @param {string} projectId - Project ID
   * @returns {Promise<void>}
   */
  async deleteProject(userId: string, projectId: string): Promise<void> {
    try {
      // Check if project exists
      const existingProject = await ProjectDao.getProjectById(projectId)
      if (!existingProject) {
        throw new NotFoundError("Project not found")
      }

      // Check if project belongs to user
      if (existingProject.userId.toString() !== userId) {
        throw new NotFoundError("Project not found")
      }

      // Delete project
      await ProjectDao.deleteProject(projectId)
    } catch (error) {
      throw error
    }
  }
}

export default new ProjectService()
