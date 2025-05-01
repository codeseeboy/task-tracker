import type { Response } from "express"
import { BaseError } from "./errors.util"
import HttpStatusCode from "./http-codes.util"

/**
 * ErrorHandler
 *
 * Class to handle errors
 */
class ErrorHandler {
  /**
   * isTrustedError
   *
   * Check if error is trusted
   *
   * @param {Error} error - Error object
   * @returns {boolean} - True if error is trusted
   */
  isTrustedError(error: Error): boolean {
    if (error instanceof BaseError) {
      return error.isOperational
    }
    return false
  }

  /**
   * handleError
   *
   * Handle error
   *
   * @param {Error} error - Error object
   * @param {Response} [res] - Express response object
   */
  handleError(error: Error, res?: Response): void {
    if (res && error instanceof BaseError) {
      this.handleTrustedError(error, res)
    } else {
      this.handleCriticalError(error, res)
    }
  }

  /**
   * handleTrustedError
   *
   * Handle trusted error
   *
   * @param {BaseError} error - Error object
   * @param {Response} res - Express response object
   */
  handleTrustedError(error: BaseError, res: Response): void {
    res.status(error.httpCode).json({
      message: error.message,
    })
  }

  /**
   * handleCriticalError
   *
   * Handle critical error
   *
   * @param {Error} error - Error object
   * @param {Response} [res] - Express response object
   */
  handleCriticalError(error: Error, res?: Response): void {
    if (res) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR_500).json({
        message: "Internal server error",
      })
    }

    console.error("Critical error:", error)
  }
}

export const errorHandler = new ErrorHandler()
