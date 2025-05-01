import Project from "../schemas/models/Project.model"
import type { ProjectCreateDto, ProjectUpdateDto } from "../dto/Project.dto"

/**
 * ProjectDao
 *
 * Class to handle project related database operations
 */
class ProjectDao {
  /**
   * createProject
   *
   * Create a new project
   *
   * @param {string} userId - User ID
   * @param {ProjectCreateDto} projectDto - Project data
   * @returns {Promise<any>} - Created project
   */
  async createProject(userId: string, projectDto: ProjectCreateDto): Promise<any> {
    try {
      const project = new Project({
        ...projectDto,
        userId,
      })
      return await project.save()
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
   * @returns {Promise<any[]>} - List of projects
   */
  async getProjectsByUserId(userId: string): Promise<any[]> {
    try {
      return await Project.find({ userId })
    } catch (error) {
      throw error
    }
  }

  /**
   * getProjectById
   *
   * Get a project by ID
   *
   * @param {string} projectId - Project ID
   * @returns {Promise<any>} - Project data
   */
  async getProjectById(projectId: string): Promise<any> {
    try {
      return await Project.findById(projectId)
    } catch (error) {
      throw error
    }
  }

  /**
   * updateProject
   *
   * Update a project
   *
   * @param {string} projectId - Project ID
   * @param {ProjectUpdateDto} projectDto - Project update data
   * @returns {Promise<any>} - Updated project
   */
  async updateProject(projectId: string, projectDto: ProjectUpdateDto): Promise<any> {
    try {
      return await Project.findByIdAndUpdate(projectId, { $set: projectDto }, { new: true })
    } catch (error) {
      throw error
    }
  }

  /**
   * deleteProject
   *
   * Delete a project
   *
   * @param {string} projectId - Project ID
   * @returns {Promise<void>}
   */
  async deleteProject(projectId: string): Promise<void> {
    try {
      await Project.findByIdAndDelete(projectId)
    } catch (error) {
      throw error
    }
  }
}

export default new ProjectDao()
