import type { UserUpdateDto } from "../dto/User.dto"
import UserDao from "../dao/User.dao"
import { NotFoundError } from "../utils/errors.util"

/**
 * UserService
 *
 * Class to handle user related operations
 */
class UserService {
  /**
   * getUserById
   *
   * Get user by ID
   *
   * @param {string} userId - User ID
   * @returns {Promise<object>} - User data
   */
  async getUserById(userId: string): Promise<object> {
    try {
      // Get user
      const user = await UserDao.getUserById(userId)
      if (!user) {
        throw new NotFoundError("User not found")
      }

      // Return user data
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        country: user.country,
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * updateUser
   *
   * Update user
   *
   * @param {string} userId - User ID
   * @param {UserUpdateDto} userDto - User update data
   * @returns {Promise<object>} - Updated user data
   */
  async updateUser(userId: string, userDto: UserUpdateDto): Promise<object> {
    try {
      // Check if user exists
      const existingUser = await UserDao.getUserById(userId)
      if (!existingUser) {
        throw new NotFoundError("User not found")
      }

      // Update user
      const user = await UserDao.updateUser(userId, userDto)

      // Return user data
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        country: user.country,
      }
    } catch (error) {
      throw error
    }
  }
}

export default new UserService()
