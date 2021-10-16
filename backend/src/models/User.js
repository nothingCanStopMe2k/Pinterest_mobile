import mongoose from "mongoose";
import { AppEnum } from "../constant/AppEnum";

export const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true.value, default: "GOOGLE" },
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number, maxlength: 3 },
    profilePhoto: { type: String },
    status: {
      type: String,
      enum: AppEnum.UserState,
      default: AppEnum.UserState.ACTIVED,
    },
    type: {
      type: String,
      enum: AppEnum.UserType,
    },
    role: {
      type: String,
      enum: AppEnum.UserRole,
      default: AppEnum.UserRole.USER,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
