import User from "../models/User.js";

export const register = async (req, res) => {
  const {
    dni,
    firstName,
    secondName,
    surName,
    secondSurName,
    photo,
    username,
    idRole,
  } = req.body;

  try {
    const newUser = new User({
      dni,
      firstName,
      secondName,
      surName,
      secondSurName,
      photo,
      username,
      idRole,
    });

    await newUser.save();
    res.send("register");
  } catch (error) {
    console.log(error);
  }
};

export const login = (req, res) => res.send("login");
