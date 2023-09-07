import Membership from "../models/Membership.js";

export const registerMembership = async (req, res) => {
  const {
    Client,
    Shift,
    TypeMembership,
    amount,
    attendance,
    startDate,
    endDate,
    state,
  } = req.body;

  try {
    const newMembership = new Membership({
      Client,
      Shift,
      TypeMembership,
      amount,
      attendance,
      startDate,
      endDate,
      state,
    });

    await newMembership.save();
    res.send("register");
  } catch (error) {
    console.log(error);
  }
};
