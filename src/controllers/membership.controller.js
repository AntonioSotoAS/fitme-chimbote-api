import Membership from "../models/Membership.js";

// Create a new membership
export const membershipRegister = async (req, res) => {
  try {
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
    res.status(201).json(newMembership);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get all memberships
export const getAllMembership = async (req, res) => {
  try {
    const memberships = await Membership.find();
    res.json(memberships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateMembership = async (req, res) => {
  try {
    const { id } = req.params;
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

    const updatedMembership = await Membership.findByIdAndUpdate(
      id,
      {
        Client,
        Shift,
        TypeMembership,
        amount,
        attendance,
        startDate,
        endDate,
        state,
      },
      { new: true }
    );

    if (!updatedMembership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    res.json(updatedMembership);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a membership by ID
export const deleteMembership = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMembership = await Membership.findByIdAndRemove(id);

    if (!deletedMembership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    res.json({ message: 'Membership deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
