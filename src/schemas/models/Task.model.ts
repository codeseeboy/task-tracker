import mongoose, { Schema, type Document } from "mongoose"
import APP_CONSTANTS from "../../config/constants.config"

/**
 * Task interface
 */
export interface ITask extends Document {
  title: string
  description: string
  status: string
  projectId: mongoose.Types.ObjectId
  createdAt: Date
  completedAt?: Date
  updatedAt: Date
}

/**
 * Task schema
 */
const TaskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: [
        APP_CONSTANTS.TASK_STATUS.TODO,
        APP_CONSTANTS.TASK_STATUS.IN_PROGRESS,
        APP_CONSTANTS.TASK_STATUS.REVIEW,
        APP_CONSTANTS.TASK_STATUS.DONE,
      ],
      default: APP_CONSTANTS.TASK_STATUS.TODO,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<ITask>("Task", TaskSchema)
