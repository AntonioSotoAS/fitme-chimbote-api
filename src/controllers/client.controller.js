import Client from "../models/Client.js";

export const registerClient = async (req, res) => {
  const { dni, firstName, secondName, surName, secondSurName, photo } =
    req.body;

  try {
    const newClient = new Client({
      dni,
      firstName,
      secondName,
      surName,
      secondSurName,
      photo,
    });

    await newClient.save();
    res.send("register");
  } catch (error) {
    console.log(error);
  }
};
