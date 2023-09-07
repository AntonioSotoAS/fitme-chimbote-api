import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/fitme-chimbote");
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};
