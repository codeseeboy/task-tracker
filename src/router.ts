import { Router } from "express"

// Import routers
import AuthRouter from "./router/Auth.router"
import UserRouter from "./router/User.router"
import ProjectRouter from "./router/Project.router"
import TaskRouter from "./router/Task.router"
import HealthRouter from "./router/Health.router"

// Router that contains all the routes/endpoints in the application
const router = Router()

// Register the "Auth" routers
router.use("/auth", AuthRouter)

// Register the "User" routers
router.use("/users", UserRouter)

// Register the "Project" routers
router.use("/projects", ProjectRouter)

// Register the "Task" routers
router.use("/tasks", TaskRouter)

// Register the "Task" routers
router.use("/health", HealthRouter)

// Export the router
export default router
