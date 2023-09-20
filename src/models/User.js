import { Schema, mongoose } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    dni: {
      type: String,
      trim: true,
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
    password: {
      type: String,
      trim: true,
      requiered: true,
    },
    photo: {
      type: String,
      trim: true,
      requiered: true,
    },
    username: {
      type: String,
      trim: true,
      requiered: true,
    },
    email: {
      type: String,
      trim: true,
      requiered: true,
    },
    Role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
