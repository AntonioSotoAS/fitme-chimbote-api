import { mongoose } from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    dni: {
      type: Number,
      requiered: true,
    },
    firstName: {
      type: String,
      trim: true,
      requiered: true,
    },
    secondName: {
      type: String,
      trim: true,
    },
    surName: {
      type: String,
      trim: true,
      requiered: true,
    },
    secondSurName: {
      type: String,
      trim: true,
      requiered: true,
    },
    photo: {
      type: String,
      trim: true,
      requiered: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Client", clientSchema);
