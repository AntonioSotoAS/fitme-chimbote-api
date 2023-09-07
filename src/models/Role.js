import { mongoose } from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    typeRole: {
      type: String,
      trim: true,
      requiered: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Role", roleSchema);
