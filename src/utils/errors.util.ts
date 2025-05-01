import HttpStatusCode from "./http-codes.util"

/**
 * BaseError
 *
 * Base error class
 */
export class BaseError extends Error {
  public readonly name: string
  public readonly httpCode: HttpStatusCode
  public readonly isOperational: boolean

  /**
   * constructor
   *
   * @param {string} message - Error message
   * @param {HttpStatusCode} httpCode - HTTP status code
   * @param {boolean} isOperational - Is error operational
   */
  constructor(
    message: string,
    httpCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR_500,
    isOperational = true,
  ) {
    super(message)
    this.name = this.constructor.name
    this.httpCode = httpCode
    this.isOperational = isOperational

    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * NotFoundError
 *
 * Error for resource not found
 */
export class NotFoundError extends BaseError {
  /**
   * constructor
   *
   * @param {string} message - Error message
   */
  constructor(message: string) {
    super(message, HttpStatusCode.NOT_FOUND_404)
  }
}

/**
 * BadRequestError
 *
 * Error for bad request
 */
export class BadRequestError extends BaseError {
  /**
   * constructor
   *
   * @param {string} message - Error message
   */
  constructor(message: string) {
    super(message, HttpStatusCode.BAD_REQUEST_400)
  }
}

/**
 * UnauthorizedError
 *
 * Error for unauthorized access
 */
export class UnauthorizedError extends BaseError {
  /**
   * constructor
   *
   * @param {string} message - Error message
   */
  constructor(message: string) {
    super(message, HttpStatusCode.UNAUTHORIZED_401)
  }
}

/**
 * ForbiddenError
 *
 * Error for forbidden access
 */
export class ForbiddenError extends BaseError {
  /**
   * constructor
   *
   * @param {string} message - Error message
   */
  constructor(message: string) {
    super(message, HttpStatusCode.FORBIDDEN_403)
  }
}

/**
 * RequestValidationError
 *
 * Error for request validation
 */
export class RequestValidationError extends BaseError {
  /**
   * constructor
   *
   * @param {any} error - Validation error
   */
  constructor(error: any) {
    const message = error.details ? error.details.map((detail: any) => detail.message).join(", ") : "Validation error"
    super(message, HttpStatusCode.BAD_REQUEST_400)
  }
}
