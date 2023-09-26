import { useState } from "react";
import { Avatar } from "@mui/material";
import MembershipForm from "./MembershipForm";
import { useClients } from "../../context/ClientContext";
import { useMemberships } from "../../context/MembershipContext";
import MembershipEditModal from "./MembershipEditModal";

function TableMembership() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMembership, setselectedMembership] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { clients } = useClients();
  const { memberships } = useMemberships();

  console.log("memberships: " + JSON.stringify(memberships));

  const openViewModal = (membership) => {
    setselectedMembership(membership);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };

  const openEditModal = (membership) => {
    setselectedMembership(membership);
    console.log("membership seleccionado para editar:", membership);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Filtrar los clientes basados en el término de búsqueda
  const filteredMemberships = memberships.filter((membership) =>
    membership.Client?.dni?.includes(searchTerm)
  );

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
          {activo ? "Activa" : "Vencida"}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto pt-16">
      <button
        onClick={openModal}
        className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm sm:text-base hover:bg-blue-600"
      >
        Agregar Membresia
      </button>

      <div className="mt-5">
        <input
          type="text"
          placeholder="Buscar por DNI"
          maxLength="8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-zinc-800 px-3 py-4 border border-black rounded-md mb-4 text-white"
        />
      </div>

      {/* Modal de registro de cliente */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 bg-zinc-800 p-4 rounded-md">
            <MembershipForm onClose={closeModal} />
          </div>
        </div>
      )}

      {/* Modal de edición de cliente */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 bg-zinc-800 p-4 rounded-md">
            <MembershipEditModal
              membership={selectedMembership}
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
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Fecha Inicio
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Fecha Termino
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Tipo Membresia
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Turno
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Monto
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Asistencia
                  </th>
                  <th scope="col" className="px-6 py-4"></th>
                  <th scope="col" className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredMemberships.map((membership) => (
                  <tr
                    className="border-b dark:border-neutral-500"
                    key={membership._id}
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center justify-center">
                        <Avatar
                          alt={membership.Client.name}
                          src={membership.Client.photo}
                        />
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {membership.Client.dni}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {membership.Client.firstName}{" "}
                      {membership.Client.secondName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {membership.Client.surName}{" "}
                      {membership.Client.secondSurName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {membership.state ? (
                        <EstadoActivoInactivo
                          activo={membership.state || false}
                        />
                      ) : (
                        "No tiene membresía"
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {membership.startDate.slice(0, 10)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {membership.endDate.slice(0, 10)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {membership.TypeMembership.typeMembership}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {membership.Shift.shift}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {membership.amount}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {membership.attendance}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button
                        onClick={() => openViewModal(membership)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm sm:text-base hover:bg-blue-600"
                      >
                        Detalle
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button
                        onClick={() => openEditModal(membership)}
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

export default TableMembership;
