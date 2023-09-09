import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const {
    dni,
    firstName,
    secondName,
    surName,
    secondSurName,
    password,
    photo,
    username,
    Role,
  } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      dni,
      firstName,
      secondName,
      surName,
      secondSurName,
      password: passwordHash,
      photo,
      username,
      Role,
    });

    const userSave = await newUser.save();
    const token = await createAccessToken({ id: userSave._id });
    res.cookie("token", token);

    res.json({
      id: userSave._id,
      dni: userSave.dni,
      firstName: userSave.firstName,
      secondName: userSave.secondName,
      surName: userSave.surName,
      secondSurName: userSave.secondName,
      photo: userSave.photo,
      username: userSave.username,
      Role: userSave.Role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userFound = await User.findOne({ username });

    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) return res.status(400).json({ message: "Password Incorret" });

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);

    res.json({
      id: userFound._id,
      dni: userFound.dni,
      firstName: userFound.firstName,
      secondName: userFound.secondName,
      surName: userFound.surName,
      secondSurName: userFound.secondName,
      photo: userFound.photo,
      username: userFound.username,
      Role: userFound.Role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json({ message: "User not found" });

  return res.json({
    id: userFound._id,
    dni: userFound.dni,
    firstName: userFound.firstName,
    secondName: userFound.secondName,
    surName: userFound.surName,
    secondSurName: userFound.secondName,
    username: userFound.username,
    photo: userFound.photo,
    Rol: userFound.Rol,
  });
};
