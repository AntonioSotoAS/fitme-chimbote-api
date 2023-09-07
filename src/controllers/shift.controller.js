import Shift from "../models/Shift.js";

export const registerShift = async (req, res) => {
  const { capacity, shift } = req.body;

  try {
    const newShift = new Shift({ capacity, shift });

    await newShift.save();
    res.send("register");
  } catch (error) {
    console.log(error);
  }
};
