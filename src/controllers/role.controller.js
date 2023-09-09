import Role from "../models/Role.js";

// Create a new role
export const registerRol = async (req, res) => {
  try {
    const { typeRole } = req.body;

    const newRole = new Role({
      typeRole,
    });

    await newRole.save();
    res.status(201).json(newRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all roles
export const getAllRol = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a role by ID
export const updateRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { typeRole } = req.body;

    const updatedRole = await Role.findByIdAndUpdate(
      id,
      {
        typeRole,
      },
      { new: true }
    );

    if (!updatedRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.json(updatedRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a role by ID
export const deleteRol = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRole = await Role.findByIdAndRemove(id);

    if (!deletedRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
