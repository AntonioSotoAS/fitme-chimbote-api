import { createContext, useContext, useEffect, useState } from "react";
import { getClientRequest, registerClientRequest } from "../api/client";

const ClientContext = createContext();

export const useClients = () => {
  const context = useContext(ClientContext);

  if (!context) {
    throw new Error("useClients must be used within a ClientProvider");
  }
  return context;
};

export function ClientProvider({ children }) {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Obtener todos los clientes al cargar el contexto
    const fetchClients = async () => {
      try {
        const response = await getClientRequest();
        setClients(response.data); // Actualizar el estado con los clientes
      } catch (error) {
        console.error("Error al obtener la lista de clientes:", error);
      }
    };

    fetchClients();
  }, []);

  const createClient = async (client) => {
    try {
      const res = await registerClientRequest(client);
      return res; // Devuelve la respuesta completa
    } catch (error) {
      console.error("Error al crear el cliente:", error);
      throw error; // Puedes manejar el error aquí o dejar que se propague
    }
  };

  return (
    <ClientContext.Provider value={{ clients, createClient, setClients }}>
      {children}
    </ClientContext.Provider>
  );
}
