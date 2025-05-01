import dotenv from "dotenv"
dotenv.config();

// Load the npm packages
import express, { Express, Request, Response, NextFunction } from "express"
import cors from "cors"

// Import configs
import { connectDB } from "./config/db.config"

// Import the routes
import routes from "./router"

// Import Utils
import { errorHandler } from "./utils/error-handler.util"

class App {
  /**
   * app
   *
   * Express server object
   */
  public app: Express

  /**
   * constructor
   *
   * To initialise the required properties.
   */
  constructor() {
    // Load environment variables
    // dotenv.config()

    // Create express server
    this.app = express()

    // Call the register methods to do their work
    this.initDatabaseConfig()
    this.registerMiddleWares()
    this.registerAppRoutes()
    this.registerErrorHandlingRoutes()

    // Logger message
    console.info("Application is initialised successfully.")
  }

  /**
   * initDatabaseConfig
   *
   * Initialise the database configurations
   */
  initDatabaseConfig() {
    connectDB()
  }

  /**
   * Register Middlewares
   *
   * This method registers the required middlewares to handle/customise the requests, responses, etc.
   */
  registerMiddleWares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  /**
   * Register Application Routes
   *
   * This method registers the application routes exposed outside by the application, to allow the users/clients to access the routes/resources.
   */
  registerAppRoutes() {
    this.app.use("/api", routes)
  }

  /**
   * Error Handling Routes
   *
   * This method registers the error handling routes like 404, exception handling, etc to the "express".
   */
  registerErrorHandlingRoutes() {
    // Route to handle the 404 Not Found error/exception
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      console.error(`The endpoint '${req.originalUrl}' not found.`)
      res.status(404).json({ message: "Resource not found" })
    })

    // Route to handle the exceptions
    this.app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
      // Check if it is trusted/known/expected error, meaning known to the developer.
      if (errorHandler.isTrustedError(err)) {
        // Handle the error manually
        return errorHandler.handleError(err, res)
      }

      // Otherwise pass the error to the express and the error would be handled by the express exception handler
      // It will throw error back to the user as it is an unhandled exception.
      console.error("Unhandled error:", err)
      return res.status(500).json({ message: "Internal server error" })
    })

    // Handle error/exception on the "unhandledRejection" event
    process.on("unhandledRejection", (error: Error, promise: Promise<any>) => {
      console.error("Unhandled Rejection:", error)
      errorHandler.handleError(error)
    })

    // Handle error/exception on the "uncaughtException" event
    process.on("uncaughtException", (error: Error) => {
      console.error("Uncaught Exception:", error)
      errorHandler.handleError(error)
      process.exit(1)
    })
  }
}

export default new App().app
