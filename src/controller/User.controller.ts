import type { Request, Response, NextFunction } from "express"
import UserService from "../service/User.service"
import type { UserUpdateDto } from "../dto/User.dto"
import { userUpdateValidation } from "../schemas/User.schema"
import { RequestValidationError } from "../utils/errors.util"
import HttpStatusCode from "../utils/http-codes.util"

/**
 * UserController
 *
 * Class to handle user related operations
 */
class UserController {
  /**
   * getProfile
   *
   * Get user profile
   *
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   */
  getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get user ID from token
      const userId = res.locals.userId

      // Get user profile
      const result = await UserService.getUserById(userId)

      // Send response
      res.status(HttpStatusCode.OK_200).json(result)
    } catch (error: any) {
      next(error)
    }
  }

  /**
   * updateProfile
   *
   * Update user profile
   *
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   */
  updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get user ID from token
      const userId = res.locals.userId

      // User update details
      const requestBody: UserUpdateDto = req.body

      // Validate the user input
      const { error, value: userDto } = userUpdateValidation.validate(requestBody, { abortEarly: false })
      if (error) {
        throw new RequestValidationError(error)
      }

      // Update user
      const result = await UserService.updateUser(userId, userDto)

      // Send response
      res.status(HttpStatusCode.OK_200).json(result)
    } catch (error: any) {
      next(error)
    }
  }
}

export default UserController
