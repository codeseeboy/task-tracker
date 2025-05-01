import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import APP_CONSTANTS from "../config/constants.config"
import { UnauthorizedError } from "../utils/errors.util"

/**
 * authenticateToken
 *
 * Middleware to authenticate JWT token
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get authorization header
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    // Check if token exists
    if (!token) {
      throw new UnauthorizedError("Access token is required")
    }

    // Verify token
    jwt.verify(token, APP_CONSTANTS.JWT.SECRET, (err: any, decoded: any) => {
      if (err) {
        throw new UnauthorizedError("Invalid or expired token")
      }

      // Set user ID in response locals
      res.locals.userId = decoded.userId
      next()
    })
  } catch (error) {
    next(error)
  }
}
