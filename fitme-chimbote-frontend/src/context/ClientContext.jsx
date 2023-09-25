import { createContext, useContext, useEffect, useState } from "react";
import {
  getClientRequest,
  registerClientRequest,
  updateClientRequest,
} from "../api/client";

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
  const [client, setClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getClientRequest();
        setClients(response.data);

        // Filtrar la lista de clientes en función del término de búsqueda
        const filtered = response.data.filter((client) =>
          client.dni.includes(searchTerm)
        );
        console.log("searchTerm:", searchTerm);

        setFilteredClients(filtered);
        console.log("Número de clientes filtrados:", filteredClients.length);
      } catch (error) {
        console.error("Error al obtener la lista de clientes:", error);
      }
    };

    fetchData(); // Llama a la función una vez al cargar el componente
  }, [searchTerm]);

  const createClient = async (client) => {
    try {
      const res = await registerClientRequest(client);
      return res; // Devuelve la respuesta completa
    } catch (error) {
      console.error("Error al crear el cliente:", error);
      throw error; // Puedes manejar el error aquí o dejar que se propague
    }
  };

  const updateClient = async (clientId, client) => {
    try {
      console.log("entradndo a id  " + clientId);
      console.log("entradndo a client:", JSON.stringify(client, null, 2));

      const res = await updateClientRequest(clientId, client);
      return res; // Devuelve la respuesta completa
    } catch (error) {
      console.error("Error al crear el cliente:", error);
      throw error; // Puedes manejar el error aquí o dejar que se propague
    }
  };

  return (
    <ClientContext.Provider
      value={{
        clients,
        createClient,
        setClients,
        updateClient,
        client,
        setClient,
        searchTerm, // Agrega searchTerm
        setSearchTerm, // Agrega setSearchTerm
        filteredClients, // Agrega filteredClients
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
