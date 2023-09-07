import { Schema, model, mongoose } from "mongoose";

const membershipSchema = new mongoose.Schema(
  {
    Client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
    Shift: {
      type: Schema.Types.ObjectId,
      ref: "Shift",
    },
    TypeMembership: {
      type: Schema.Types.ObjectId,
      ref: "MembershipType",
    },
    amount: {
      type: Number,
      requiered: true,
    },
    attendance: {
      type: Number,
      requiered: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    state: {
      type: Boolean,
      requiered: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Membership", membershipSchema);
