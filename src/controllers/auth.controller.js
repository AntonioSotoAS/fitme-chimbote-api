import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken"; 
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  console.log(req.body);
  const {
    dni,
    firstName,
    secondName,
    surName,
    secondSurName,
    password,
    photo,
    username,
    email,
    Role,
  } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound)
      return res.status(400).json({ message: ["the email is already in use"] });
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
      email,
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
      email: userSave.email,
      Role: userSave.Role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(400).json({ message: "Email not found" });

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
      email: userFound.email,
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
    email: userFound.email,
    photo: userFound.photo,
    Rol: userFound.Rol,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
