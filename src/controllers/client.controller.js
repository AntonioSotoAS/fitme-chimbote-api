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


export const getAllClientsWithLatestMembership = async (req, res) => {
  try {
    const clientsWithLatestMembership = await Client.aggregate([
      {
        $lookup: {
          from: "memberships", // Nombre de la colección de membresías
          localField: "_id",
          foreignField: "Client",
          as: "memberships",
        },
      },
      {
        $unwind: "$memberships", // Divide los documentos para que cada uno represente una membresía individual
      },
      {
        $sort: { "memberships.start_date": 1 }, // Ordena por fecha de inicio en orden ascendente
      },
      {
        $group: {
          _id: "$_id",
          Client: { $first: "$$ROOT" }, // Conserva la información del cliente
          latestMembership: { $last: "$memberships" }, // Conserva la membresía más reciente
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: ["$Client", { latestMembership: "$latestMembership" }] }, // Combina información del cliente y membresía más reciente
        },
      },
      {
        $project: {
          "memberships": 0, // Excluye el objeto "memberships"
        },
      },
    ]);

    res.json(clientsWithLatestMembership);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};