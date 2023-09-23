import React from "react";
import { Avatar } from "@mui/material";
import { useState } from "react";
import ClientForm from "./ClientForm";
import { useClients } from "../../context/ClientContext";
import ClientViewModal from "./ClientViewModal";
import ClientEditModal from "./ClientEditModal";

function TableClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const { clients } = useClients();

  const openViewModal = (client) => {
    setSelectedClient(client);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };

  const openEditModal = (client) => {
    setSelectedClient(client);
    console.log("Cliente seleccionado para editar:", client);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };


  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  function EstadoActivoInactivo({ activo }) {
    return (
      <div
        className={`whitespace-nowrap px-6 py-4 flex items-center justify-center`}
      >
        <div
          className={`w-16 h-8 rounded-full flex flex-col items-center justify-center font-bold ${
            activo ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {activo ? "Activo" : "Inactivo"}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto pt-16">
      {/* Botón para abrir el modal */}
      <button
        onClick={openModal}
        className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm sm:text-base hover:bg-blue-600"
      >
        Agregar Cliente
      </button>

      {/* Modal de registro de cliente */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 bg-zinc-800 p-4 rounded-md">
            <ClientForm onClose={closeModal} />
          </div>
        </div>
      )}

      {/* Modal de vista de cliente */}
      {isViewModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 bg-zinc-800 p-4 rounded-md">
            <ClientViewModal
              client={selectedClient}
              onClose={closeViewModal}
            />
          </div>
        </div>
      )}
      {/* Modal de edición de cliente */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 bg-zinc-800 p-4 rounded-md">
            <ClientEditModal
              client={selectedClient}
              onClose={closeEditModal}
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Foto
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Dni
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Nombres
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Apellidos
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Membresia
                  </th>
                  <th scope="col" className="px-6 py-4"></th>
                  <th scope="col" className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {/* Mapear y renderizar las filas de clientes */}
                {clients
                  .filter((client) => client) // Filtrar clientes no nulos
                  .map((client) => (
                    <tr
                      className="border-b dark:border-neutral-500"
                      key={client._id}
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center justify-center">
                          <Avatar alt={client.name} src={client.photo} />
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {client.dni}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {client.firstName} {client.secondName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {client.surName} {client.secondSurName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 flex items-center justify-center">
                        <EstadoActivoInactivo activo={client.active} />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <button
                          onClick={() => openViewModal(client)}
                          className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm sm:text-base hover:bg-blue-600"
                        >
                          Detalle
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <button
                          onClick={() => openEditModal(client)}
                          className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm sm:text-base hover:bg-blue-600"
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableClient;
