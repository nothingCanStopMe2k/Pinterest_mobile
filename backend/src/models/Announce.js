import mongoose from "mongoose";
import { AppEnum } from "../constant/AppEnum";

export const AnnouneSchema = new mongoose.Schema(
  {
    userID: { type: String, require },
    ownerNameAction: { type: String, require },
    ownerIDAction: { type: String, require },
    linkAvatar: { type: String },
    typeAction: { type: String, enum: AppEnum.ActionType },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Announce", AnnouneSchema);
