import User from "../schemas/models/User.model"
import type { UserSignupDto, UserUpdateDto } from "../dto/User.dto"

/**
 * UserDao
 *
 * Class to handle user related database operations
 */
class UserDao {
  /**
   * createUser
   *
   * Create a new user
   *
   * @param {UserSignupDto} userDto - User data
   * @returns {Promise<any>} - Created user
   */
  async createUser(userDto: UserSignupDto): Promise<any> {
    try {
      const user = new User(userDto)
      return await user.save()
    } catch (error) {
      throw error
    }
  }

  /**
   * getUserByEmail
   *
   * Get user by email
   *
   * @param {string} email - User email
   * @returns {Promise<any>} - User data
   */
  async getUserByEmail(email: string): Promise<any> {
    try {
      return await User.findOne({ email })
    } catch (error) {
      throw error
    }
  }

  /**
   * getUserById
   *
   * Get user by ID
   *
   * @param {string} userId - User ID
   * @returns {Promise<any>} - User data
   */
  async getUserById(userId: string): Promise<any> {
    try {
      return await User.findById(userId)
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
   * @returns {Promise<any>} - Updated user
   */
  async updateUser(userId: string, userDto: UserUpdateDto): Promise<any> {
    try {
      return await User.findByIdAndUpdate(userId, { $set: userDto }, { new: true })
    } catch (error) {
      throw error
    }
  }
}

export default new UserDao()
