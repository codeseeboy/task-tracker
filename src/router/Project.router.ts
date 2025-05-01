import { Router } from "express"
import ProjectController from "../controller/Project.controller"
import { authenticateToken } from "../middlewares/auth.middleware"

// Create instance of the "ProjectController" class
const projectController = new ProjectController()

// Route to hold the routes related to "Project"
const ProjectRouter = Router()

// Register routes
ProjectRouter.post("/", authenticateToken, projectController.createProject)
ProjectRouter.get("/", authenticateToken, projectController.getProjects)
ProjectRouter.get("/:projectId", authenticateToken, projectController.getProjectById)
ProjectRouter.put("/:projectId", authenticateToken, projectController.updateProject)
ProjectRouter.delete("/:projectId", authenticateToken, projectController.deleteProject)

export default ProjectRouter
