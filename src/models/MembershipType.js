import { mongoose } from "mongoose";

const membershipTypeSchema = new mongoose.Schema(
  {
    typeMembership: {
      type: String,
      requiered: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("MembershipType", membershipTypeSchema);
