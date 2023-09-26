import { createContext, useContext, useEffect, useState } from "react";
import {
  getMembershipRequest,
  membershipRequest,
  updateMembershipRequest,
  deleteMembershipRequest,
} from "../api/membership";

const MembershipContext = createContext();

export const useMemberships = () => {
  const context = useContext(MembershipContext);

  if (!context) {
    throw new Error("useMemberships must be used within a MembershipProvider");
  }
  return context;
};

export function MembershipProvider({ children }) {
  const [memberships, setMemberships] = useState([]);
  const [membership, setMembership] = useState([]);
  const [selectedMembership, setSelectedMembership] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMembershipRequest();
        console.log(response.data);
        setMemberships(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de membresías:", error);
      }
    };

    fetchData();
  }, []);

  const createMembership = async (membership) => {
    try {
      console.log("create membership: " + JSON.stringify(membership));

      const response = await membershipRequest(membership);
      setMemberships([...memberships, response.data]);
      return response;
    } catch (error) {
      console.error("Error al crear la membresía:", error);
      throw error;
    }
  };

  const updateMembership = async (membershipId, membership) => {
    try {
      const response = await updateMembershipRequest(membershipId, membership);
      const updatedMemberships = memberships.map((m) =>
        m.id === membershipId ? response.data : m
      );
      setMemberships(updatedMemberships);
      return response;
    } catch (error) {
      console.error("Error al actualizar la membresía:", error);
      throw error;
    }
  };

  const deleteMembership = async (membershipId) => {
    try {
      const response = await deleteMembershipRequest(membershipId);
      const updatedMemberships = memberships.filter(
        (m) => m.id !== membershipId
      );
      setMemberships(updatedMemberships);
      return response;
    } catch (error) {
      console.error("Error al eliminar la membresía:", error);
      throw error;
    }
  };

  return (
    <MembershipContext.Provider
      value={{
        memberships,
        createMembership,
        updateMembership,
        deleteMembership, // Agregar la función de eliminación
        selectedMembership,
        setSelectedMembership,
        setMemberships,
        setMembership,
        membership,
      }}
    >
      {children}
    </MembershipContext.Provider>
  );
}
