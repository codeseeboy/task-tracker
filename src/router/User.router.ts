import { Router } from "express"
import UserController from "../controller/User.controller"
import { authenticateToken } from "../middlewares/auth.middleware"

// Create instance of the "UserController" class
const userController = new UserController()

// Route to hold the routes related to "User"
const UserRouter = Router()

// Register routes
UserRouter.get("/profile", authenticateToken, userController.getProfile)
UserRouter.put("/profile", authenticateToken, userController.updateProfile)

export default UserRouter
