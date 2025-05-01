import { Router } from "express"
import AuthController from "../controller/Auth.controller"

// Create instance of the "AuthController" class
const authController = new AuthController()

// Route to hold the routes related to "Auth"
const AuthRouter = Router()

// Register routes
AuthRouter.post("/register", authController.signup)
AuthRouter.post("/login", authController.login)

export default AuthRouter
