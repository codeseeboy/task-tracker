import { Router, Request, Response } from "express";

const HealthRouter = Router();

// Simple health check endpoint
HealthRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    message: "Server is healthy",
    timestamp: new Date().toISOString()
  });
});

export default HealthRouter;
