import { createContext, useContext, useEffect, useState } from "react";
import {
  getShiftRequest,
  shiftRequest,
  updateShiftRequest,
  deleteShiftRequest,
} from "../api/shift"; // Importa las funciones para las solicitudes de los turnos

const ShiftContext = createContext();

export const useShifts = () => {
  const context = useContext(ShiftContext);

  if (!context) {
    throw new Error("useShifts must be used within a ShiftProvider");
  }
  return context;
};

export function ShiftProvider({ children }) {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realiza una solicitud para obtener la lista de turnos y actualiza el estado
        const response = await getShiftRequest();
        setShifts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de turnos:", error);
      }
    };

    fetchData(); // Llama a la función una vez al cargar el componente
  }, []);

  const createShift = async (shift) => {
    try {
      // Realiza una solicitud para crear un turno y actualiza el estado
      const response = await shiftRequest(shift);
      setShifts([...shifts, response.data]);
      return response; // Devuelve la respuesta completa
    } catch (error) {
      console.error("Error al crear el turno:", error);
      throw error; // Puedes manejar el error aquí o dejar que se propague
    }
  };

  const updateShift = async (shiftId, shift) => {
    try {
      // Realiza una solicitud para actualizar un turno y actualiza el estado
      const response = await updateShiftRequest(shiftId, shift);
      const updatedShifts = shifts.map((s) =>
        s._id === shiftId ? response.data : s
      );
      setShifts(updatedShifts);
      return response; // Devuelve la respuesta completa
    } catch (error) {
      console.error("Error al actualizar el turno:", error);
      throw error; // Puedes manejar el error aquí o dejar que se propague
    }
  };

  const deleteShift = async (shiftId) => {
    try {
      // Realiza una solicitud para eliminar un turno y actualiza el estado
      await deleteShiftRequest(shiftId);
      const updatedShifts = shifts.filter((s) => s._id !== shiftId);
      setShifts(updatedShifts);
    } catch (error) {
      console.error("Error al eliminar el turno:", error);
      throw error; // Puedes manejar el error aquí o dejar que se propague
    }
  };

  return (
    <ShiftContext.Provider
      value={{
        shifts,
        createShift,
        updateShift,
        deleteShift,
      }}
    >
      {children}
    </ShiftContext.Provider>
  );
}
