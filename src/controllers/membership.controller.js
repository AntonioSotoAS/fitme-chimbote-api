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
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all memberships
export const getAllMembership = async (req, res) => {
  try {
    const memberships = await Membership.find()
      .populate("Client")
      .populate("Shift")
      .populate("TypeMembership");

    res.json(memberships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
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
      return res.status(404).json({ message: "Membership not found" });
    }

    res.json(updatedMembership);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a membership by ID
export const deleteMembership = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMembership = await Membership.findByIdAndRemove(id);

    if (!deletedMembership) {
      return res.status(404).json({ message: "Membership not found" });
    }

    res.json({ message: "Membership deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Nuevo método para obtener membresías dentro de un rango de fechas
export const getMembershipsInDateRange = async (req, res) => {
  const personalizadoTypeId = "64f96399cf1f6c86401b66ab";
  const crossfitTypeId = "64f963b0cf1f6c86401b66ad";

  const turno7AMId = "64f95656b72a0443a0096dd9";
  const turno8AMId = "64f961993d039bfef2ed0fb5";
  const turno9AMId = "64f9619e3d039bfef2ed0fb7";
  const turno10AMId = "64f961a93d039bfef2ed0fb9";
  const turno11AMId = "65110daeae2a6e240ca25e09";
  const turno5PMId = "64f961b03d039bfef2ed0fbb";
  const turno6PMId = "64f961b23d039bfef2ed0fbd";
  const turno7PMId = "64f961b53d039bfef2ed0fbf";
  const turno8PMId = "64f961b83d039bfef2ed0fc1";
  const turno9PMId = "65110d84ae2a6e240ca25e06";
  const turnoLibreId = "64f969fb599791cdc8b157b2";

  try {
    const { startDate, endDate } = req.body;

    // Parsea las fechas de inicio y fin desde el cuerpo JSON
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    // Encuentra todas las membresías que tienen alguna parte dentro del rango
    const memberships = await Membership.find({
      $or: [
        {
          startDate: { $lte: parsedEndDate },
          endDate: { $gte: parsedStartDate },
        },
        {
          startDate: { $gte: parsedStartDate, $lte: parsedEndDate },
        },
        {
          endDate: { $gte: parsedStartDate, $lte: parsedEndDate },
        },
      ],
    });

    // Inicializa variables para las métricas
    let totalAmount = 0;
    let personalizadoAmount = 0;
    let crossfitAmount = 0;
    const turnosAmount = {};

    // Procesa las membresías para calcular las métricas
    memberships.forEach((membership) => {
      const { TypeMembership, Shift, amount } = membership;

      // Calcula el total sumando los amounts de todas las membresías
      totalAmount += amount;

      // Comprueba el TypeMembership y agrega el amount correspondiente
      if (TypeMembership.toString() === personalizadoTypeId) {
        personalizadoAmount += amount;
      } else if (TypeMembership.toString() === crossfitTypeId) {
        crossfitAmount += amount;
      }

      // Comprueba el turno y agrega el amount correspondiente al objeto de turnos
      if (!turnosAmount[Shift]) {
        turnosAmount[Shift] = 0;
      }
      turnosAmount[Shift] += amount;
    });

    // Crea un objeto con las métricas calculadas
    const metrics = {
      total: totalAmount,
      personalizado: personalizadoAmount,
      crossfit: crossfitAmount,
      turno7AM: turnosAmount[turno7AMId] || 0,
      turno8AM: turnosAmount[turno8AMId] || 0,
      turno9AM: turnosAmount[turno9AMId] || 0,
      turno10AM: turnosAmount[turno10AMId] || 0,
      turno11AM: turnosAmount[turno11AMId] || 0,
      turno5PM: turnosAmount[turno5PMId] || 0,
      turno6PM: turnosAmount[turno6PMId] || 0,
      turno7PM: turnosAmount[turno7PMId] || 0,
      turno8PM: turnosAmount[turno8PMId] || 0,
      turno9PM: turnosAmount[turno9PMId] || 0,
      turnoLibreId: turnosAmount[turnoLibreId] || 0,
    };

    res.json(metrics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
