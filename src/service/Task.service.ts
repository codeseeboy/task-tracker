import type { TaskCreateDto, TaskUpdateDto } from "../dto/Task.dto"
import TaskDao from "../dao/Task.dao"
import ProjectDao from "../dao/Project.dao"
import { NotFoundError } from "../utils/errors.util"
import APP_CONSTANTS from "../config/constants.config"

/**
 * TaskService
 *
 * Class to handle task related operations
 */
class TaskService {
  /**
   * createTask
   *
   * Create a new task
   *
   * @param {string} userId - User ID
   * @param {TaskCreateDto} taskDto - Task data
   * @returns {Promise<object>} - Created task
   */
  async createTask(userId: string, taskDto: TaskCreateDto): Promise<object> {
    try {
      // Check if project exists
      const project = await ProjectDao.getProjectById(taskDto.projectId)
      if (!project) {
        throw new NotFoundError("Project not found")
      }

      // Check if project belongs to user
      if (project.userId.toString() !== userId) {
        throw new NotFoundError("Project not found")
      }

      // Create task
      const task = await TaskDao.createTask({
        ...taskDto,
        status: taskDto.status || APP_CONSTANTS.TASK_STATUS.TODO,
        createdAt: new Date(),
      })

      // Return task data
      return task
    } catch (error) {
      throw error
    }
  }

  /**
   * getTasksByProjectId
   *
   * Get all tasks for a project
   *
   * @param {string} userId - User ID
   * @param {string} projectId - Project ID
   * @returns {Promise<object[]>} - List of tasks
   */
  async getTasksByProjectId(userId: string, projectId: string): Promise<object[]> {
    try {
      // Check if project exists
      const project = await ProjectDao.getProjectById(projectId)
      if (!project) {
        throw new NotFoundError("Project not found")
      }

      // Check if project belongs to user
      if (project.userId.toString() !== userId) {
        throw new NotFoundError("Project not found")
      }

      // Get tasks
      const tasks = await TaskDao.getTasksByProjectId(projectId)

      // Return tasks
      return tasks
    } catch (error) {
      throw error
    }
  }

  /**
   * getAllUserTasks
   *
   * Get all tasks for a user across all their projects
   *
   * @param {string} userId - User ID
   * @returns {Promise<object[]>} - List of tasks
   */
  async getAllUserTasks(userId: string): Promise<object[]> {
    try {
      // Get all projects for the user
      const projects = await ProjectDao.getProjectsByUserId(userId)
      
      // Get project IDs
      const projectIds = projects.map(project => project._id.toString())
      
      // Get all tasks for these projects
      const tasks = await TaskDao.getTasksByProjectIds(projectIds)
      
      // Return tasks
      return tasks
    } catch (error) {
      throw error
    }
  }

  /**
   * getTaskById
   *
   * Get a task by ID
   *
   * @param {string} userId - User ID
   * @param {string} taskId - Task ID
   * @returns {Promise<object>} - Task data
   */
  async getTaskById(userId: string, taskId: string): Promise<object> {
    try {
      // Get task
      const task = await TaskDao.getTaskById(taskId)
      if (!task) {
        throw new NotFoundError("Task not found")
      }

      // Get project
      const project = await ProjectDao.getProjectById(task.projectId)
      if (!project) {
        throw new NotFoundError("Project not found")
      }

      // Check if project belongs to user
      if (project.userId.toString() !== userId) {
        throw new NotFoundError("Task not found")
      }

      // Return task data
      return task
    } catch (error) {
      throw error
    }
  }

  /**
   * updateTask
   *
   * Update a task
   *
   * @param {string} userId - User ID
   * @param {string} taskId - Task ID
   * @param {TaskUpdateDto} taskDto - Task update data
   * @returns {Promise<object>} - Updated task
   */
  async updateTask(userId: string, taskId: string, taskDto: TaskUpdateDto): Promise<object> {
    try {
      // Get task
      const existingTask = await TaskDao.getTaskById(taskId)
      if (!existingTask) {
        throw new NotFoundError("Task not found")
      }

      // Get project
      const project = await ProjectDao.getProjectById(existingTask.projectId)
      if (!project) {
        throw new NotFoundError("Project not found")
      }

      // Check if project belongs to user
      if (project.userId.toString() !== userId) {
        throw new NotFoundError("Task not found")
      }

      // Update task
      const updateData: any = { ...taskDto }

      // Set completedAt if status is changed to completed
      if (
        taskDto.status === APP_CONSTANTS.TASK_STATUS.DONE &&
        existingTask.status !== APP_CONSTANTS.TASK_STATUS.DONE
      ) {
        updateData.completedAt = new Date()
      }

      // Remove completedAt if status is changed from completed
      if (
        taskDto.status &&
        taskDto.status !== APP_CONSTANTS.TASK_STATUS.DONE &&
        existingTask.status === APP_CONSTANTS.TASK_STATUS.DONE
      ) {
        updateData.completedAt = null
      }

      const task = await TaskDao.updateTask(taskId, updateData)

      // Return task data
      return task
    } catch (error) {
      throw error
    }
  }

  /**
   * deleteTask
   *
   * Delete a task
   *
   * @param {string} userId - User ID
   * @param {string} taskId - Task ID
   * @returns {Promise<void>}
   */
  async deleteTask(userId: string, taskId: string): Promise<void> {
    try {
      // Get task
      const task = await TaskDao.getTaskById(taskId)
      if (!task) {
        throw new NotFoundError("Task not found")
      }

      // Get project
      const project = await ProjectDao.getProjectById(task.projectId)
      if (!project) {
        throw new NotFoundError("Project not found")
      }

      // Check if project belongs to user
      if (project.userId.toString() !== userId) {
        throw new NotFoundError("Task not found")
      }

      // Delete task
      await TaskDao.deleteTask(taskId)
    } catch (error) {
      throw error
    }
  }
}

export default new TaskService()