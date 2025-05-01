/**
 * Application constants
 */
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("JWT_SECRET environment variable is not defined");
  throw new Error("JWT_SECRET environment variable is not defined");
}

const APP_CONSTANTS = {
  JWT: {
    SECRET: process.env.JWT_SECRET as string,
    EXPIRES_IN: "24h",
  },
  ROLES: {
    USER: "user",
    ADMIN: "admin",
  },
  TASK_STATUS: {
    TODO: "TODO",
    IN_PROGRESS: "IN_PROGRESS",
    REVIEW: "REVIEW",
    DONE: "DONE"
  },
  PROJECT_LIMIT: 4,
}

export default APP_CONSTANTS
