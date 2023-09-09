import Shift from "../models/Shift.js";

// Create a new shift
export const registerShift = async (req, res) => {
  try {
    const { capacity, shift } = req.body;

    const newShift = new Shift({
      capacity,
      shift,
    });

    await newShift.save();
    res.status(201).json(newShift);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all shifts
export const getAllShift = async (req, res) => {
  try {
    const shifts = await Shift.find();
    res.json(shifts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a shift by ID
export const updateShift = async (req, res) => {
  try {
    const { id } = req.params;
    const { capacity, shift } = req.body;

    const updatedShift = await Shift.findByIdAndUpdate(
      id,
      {
        capacity,
        shift,
      },
      { new: true }
    );

    if (!updatedShift) {
      return res.status(404).json({ message: "Shift not found" });
    }

    res.json(updatedShift);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a shift by ID
export const deleteShift = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedShift = await Shift.findByIdAndRemove(id);

    if (!deletedShift) {
      return res.status(404).json({ message: "Shift not found" });
    }

    res.json({ message: "Shift deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
