import MembershipType from "../models/MembershipType.js";

// Create a new membership type
export const registerMembershipType = async (req, res) => {
  try {
    const { typeMembership } = req.body;

    const newMembershipType = new MembershipType({
      typeMembership,
    });

    await newMembershipType.save();
    res.status(201).json(newMembershipType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all membership types
export const getAllMembershipType = async (req, res) => {
  try {
    const membershipTypes = await MembershipType.find();
    res.json(membershipTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateMembershipType = async (req, res) => {
  try {
    const { id } = req.params;
    const { typeMembership } = req.body;

    const updatedMembershipType = await MembershipType.findByIdAndUpdate(
      id,
      {
        typeMembership,
      },
      { new: true }
    );

    if (!updatedMembershipType) {
      return res.status(404).json({ message: 'Membership type not found' });
    }

    res.json(updatedMembershipType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteMembershipType = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMembershipType = await MembershipType.findByIdAndRemove(id);

    if (!deletedMembershipType) {
      return res.status(404).json({ message: 'Membership type not found' });
    }

    res.json({ message: 'Membership type deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};