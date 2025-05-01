import mongoose, { Schema, type Document } from "mongoose"

/**
 * Project interface
 */
export interface IProject extends Document {
  name: string
  description: string
  userId: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

/**
 * Project schema
 */
const ProjectSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IProject>("Project", ProjectSchema)
