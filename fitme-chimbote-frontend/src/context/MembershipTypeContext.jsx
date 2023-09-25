import { createContext, useContext, useEffect, useState } from "react";
import {
  getMembershipTypeRequest,
  membershipTypeRequest,
  updateMembershipTypeRequest,
  deleteMembershipTypeRequest,
} from "../api/typeMembership"; // Importa las funciones para las solicitudes de tipos de membresía

const MembershipTypeContext = createContext();

export const useMembershipTypes = () => {
  const context = useContext(MembershipTypeContext);

  if (!context) {
    throw new Error(
      "useMembershipTypes must be used within a MembershipTypeProvider"
    );
  }
  return context;
};

export function MembershipTypeProvider({ children }) {
  const [membershipTypes, setMembershipTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realiza una solicitud para obtener la lista de tipos de membresía y actualiza el estado
        const response = await getMembershipTypeRequest();
        console.log(response.data);
        setMembershipTypes(response.data);
      } catch (error) {
        console.error(
          "Error al obtener la lista de tipos de membresía:",
          error
        );
      }
    };

    fetchData(); // Llama a la función una vez al cargar el componente
  }, []);

  const createMembershipType = async (membershipType) => {
    try {
      // Realiza una solicitud para crear un tipo de membresía y actualiza el estado
      const response = await membershipTypeRequest(membershipType);
      setMembershipTypes([...membershipTypes, response.data]);
      return response; // Devuelve la respuesta completa
    } catch (error) {
      console.error("Error al crear el tipo de membresía:", error);
      throw error; // Puedes manejar el error aquí o dejar que se propague
    }
  };

  const updateMembershipType = async (membershipTypeId, membershipType) => {
    try {
      // Realiza una solicitud para actualizar un tipo de membresía y actualiza el estado
      const response = await updateMembershipTypeRequest(
        membershipTypeId,
        membershipType
      );
      const updatedMembershipTypes = membershipTypes.map((mt) =>
        mt._id === membershipTypeId ? response.data : mt
      );
      setMembershipTypes(updatedMembershipTypes);
      return response; // Devuelve la respuesta completa
    } catch (error) {
      console.error("Error al actualizar el tipo de membresía:", error);
      throw error; // Puedes manejar el error aquí o dejar que se propague
    }
  };

  const deleteMembershipType = async (membershipTypeId) => {
    try {
      // Realiza una solicitud para eliminar un tipo de membresía y actualiza el estado
      await deleteMembershipTypeRequest(membershipTypeId);
      const updatedMembershipTypes = membershipTypes.filter(
        (mt) => mt._id !== membershipTypeId
      );
      setMembershipTypes(updatedMembershipTypes);
    } catch (error) {
      console.error("Error al eliminar el tipo de membresía:", error);
      throw error; // Puedes manejar el error aquí o dejar que se propague
    }
  };

  return (
    <MembershipTypeContext.Provider
      value={{
        membershipTypes,
        createMembershipType,
        updateMembershipType,
        deleteMembershipType,
      }}
    >
      {children}
    </MembershipTypeContext.Provider>
  );
}
