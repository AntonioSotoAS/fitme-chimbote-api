import { mongoose } from "mongoose";

const shiftSchema = new mongoose.Schema(
  {
    capacity: {
      type: Number,
      require: true,
    },
    shift: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Shift", shiftSchema);
