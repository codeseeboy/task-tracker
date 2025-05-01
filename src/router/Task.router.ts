import { Router } from "express"
import TaskController from "../controller/Task.controller"
import { authenticateToken } from "../middlewares/auth.middleware"

// Create instance of the "TaskController" class
const taskController = new TaskController()

// Route to hold the routes related to "Task"
const TaskRouter = Router()

// Register routes
TaskRouter.post("/", authenticateToken, taskController.createTask)
TaskRouter.get("/", authenticateToken, taskController.getTasks)
TaskRouter.get("/:taskId", authenticateToken, taskController.getTaskById)
TaskRouter.put("/:taskId", authenticateToken, taskController.updateTask)
TaskRouter.delete("/:taskId", authenticateToken, taskController.deleteTask)

export default TaskRouter
