import Client from "../models/Client.js";

// Create a new client
export const registerClient = async (req, res) => {
  try {
    const { dni, firstName, secondName, surName, secondSurName, photo } =
      req.body;

    const newClient = new Client({
      dni,
      firstName,
      secondName,
      surName,
      secondSurName,
      photo,
    });

    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all clients
export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a client by ID
export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { dni, firstName, secondName, surName, secondSurName, photo } =
      req.body;

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      {
        dni,
        firstName,
        secondName,
        surName,
        secondSurName,
        photo,
      },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(updatedClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a client by ID
export const deleteByIdClient = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedClient = await Client.findByIdAndRemove(id);

    if (!deletedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
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
          newRoot: {
            $mergeObjects: [
              "$Client",
              { latestMembership: "$latestMembership" },
            ],
          }, // Combina información del cliente y membresía más reciente
        },
      },
      {
        $project: {
          memberships: 0, // Excluye el objeto "memberships"
        },
      },
    ]);

    res.json(clientsWithLatestMembership);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};
