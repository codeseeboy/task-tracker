import Task from "../schemas/models/Task.model"
import type { TaskCreateDto } from "../dto/Task.dto"

/**
 * TaskDao
 *
 * Class to handle task related database operations
 */
class TaskDao {
  /**
   * createTask
   *
   * Create a new task
   *
   * @param {TaskCreateDto} taskDto - Task data
   * @returns {Promise<any>} - Created task
   */
  async createTask(taskDto: TaskCreateDto & { createdAt: Date }): Promise<any> {
    try {
      const task = new Task(taskDto)
      return await task.save()
    } catch (error) {
      throw error
    }
  }

  /**
   * getTasksByProjectId
   *
   * Get all tasks for a project
   *
   * @param {string} projectId - Project ID
   * @returns {Promise<any[]>} - List of tasks
   */
  async getTasksByProjectId(projectId: string): Promise<any[]> {
    try {
      return await Task.find({ projectId })
    } catch (error) {
      throw error
    }
  }

  /**
   * getTasksByProjectIds
   *
   * Get all tasks for multiple projects
   *
   * @param {string[]} projectIds - Array of Project IDs
   * @returns {Promise<any[]>} - List of tasks
   */
  async getTasksByProjectIds(projectIds: string[]): Promise<any[]> {
    try {
      return await Task.find({ projectId: { $in: projectIds } })
    } catch (error) {
      throw error
    }
  }

  /**
   * getTaskById
   *
   * Get a task by ID
   *
   * @param {string} taskId - Task ID
   * @returns {Promise<any>} - Task data
   */
  async getTaskById(taskId: string): Promise<any> {
    try {
      return await Task.findById(taskId)
    } catch (error) {
      throw error
    }
  }

  /**
   * updateTask
   *
   * Update a task
   *
   * @param {string} taskId - Task ID
   * @param {TaskUpdateDto} taskDto - Task update data
   * @returns {Promise<any>} - Updated task
   */
  async updateTask(taskId: string, taskDto: any): Promise<any> {
    try {
      return await Task.findByIdAndUpdate(taskId, { $set: taskDto }, { new: true })
    } catch (error) {
      throw error
    }
  }

  /**
   * deleteTask
   *
   * Delete a task
   *
   * @param {string} taskId - Task ID
   * @returns {Promise<void>}
   */
  async deleteTask(taskId: string): Promise<void> {
    try {
      await Task.findByIdAndDelete(taskId)
    } catch (error) {
      throw error
    }
  }
}

export default new TaskDao()