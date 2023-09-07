import Role from "../models/Role.js";

export const registerRol = async (req, res) => {
    const {typeRole} = req.body;
  
    try {
      const newRole = new Role({typeRole});
  
      await newRole.save();
      res.send("register");
    } catch (error) {
      console.log(error);
    }
  };