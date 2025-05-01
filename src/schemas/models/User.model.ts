import mongoose, { Schema, type Document } from "mongoose"

/**
 * User interface
 */
export interface IUser extends Document {
  name: string
  email: string
  password: string
  country: string
  createdAt: Date
  updatedAt: Date
}

/**
 * User schema
 */
const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IUser>("User", UserSchema)
