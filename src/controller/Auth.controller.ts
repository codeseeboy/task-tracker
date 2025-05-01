import type { Request, Response, NextFunction } from "express"
import type { UserSignupDto, UserLoginDto } from "../dto/User.dto"
import AuthService from "../service/Auth.service"
import { userSignupValidation, userLoginValidation } from "../schemas/User.schema"
import { RequestValidationError } from "../utils/errors.util"
import HttpStatusCode from "../utils/http-codes.util"

/**
 * AuthController
 *
 * Class to handle authentication related operations
 */
class AuthController {
  /**
   * signup
   *
   * Register a new user
   *
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   */
  signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // User signup details
      const requestBody: UserSignupDto = req.body

      // Validate the user input
      const { error, value: userDto } = userSignupValidation.validate(requestBody, { abortEarly: false })
      if (error) {
        throw new RequestValidationError(error)
      }

      // Create user
      const result = await AuthService.signup(userDto)

      // Send response
      res.status(HttpStatusCode.CREATED_201).json(result)
    } catch (error: any) {
      next(error)
    }
  }

  /**
   * login
   *
   * Authenticate a user
   *
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   */
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // User login details
      const requestBody: UserLoginDto = req.body

      // Validate the user input
      const { error, value: userDto } = userLoginValidation.validate(requestBody, { abortEarly: false })
      if (error) {
        throw new RequestValidationError(error)
      }

      // Authenticate user
      const result = await AuthService.login(userDto)

      // Send response
      res.status(HttpStatusCode.OK_200).json(result)
    } catch (error: any) {
      next(error)
    }
  }
}

export default AuthController
