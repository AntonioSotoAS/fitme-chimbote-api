import React from "react";
import Exit from "../../assets/img/exit.png";
import { Avatar } from "@mui/material";

function ClientViewModal({ onClose, client }) {
  // Buscar la última membresía del cliente
  const latestMembership = client.latestMembership;

  function Estado({ activo }) {
    return (
      <div
        className={`whitespace-nowrap px-6 py-4 flex items-center justify-center`}
      >
        <p className="mr-3">Estado:</p>
        <div
          className={`w-16 h-6 rounded-full text-sm flex flex-col items-center justify-center font-bold ${
            activo ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {activo ? "Activa" : "Vencida"}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-800 max-w-full md:max-w-md rounded-md p-4 mx-auto">
      <h1 className="text-white text-2xl font-semibold mb-4 text-center">
        Detalle Cliente
      </h1>
      <button onClick={onClose} className="absolute top-2 right-2">
        <img src={Exit} className="h-8" alt="Cerrar" />
      </button>
      <div className="sm:overflow-y-auto sm:max-h-[70vh]">
        <div className="flex flex-col sm:flex-row items-center sm:items-start mb-3">
          <div className="mb-3 sm:mr-6">
            <img
              className="w-16 h-16 sm:w-36 sm:h-36 rounded-full object-cover"
              alt="Foto Perfil"
              src={client.photo}
            />
          </div>
          <div>
            <div className="text-white text-lg sm:text-2xl font-semibold mb-2">
              {client.firstName} {client.secondName}
            </div>
            <div className="text-white text-lg sm:text-2xl font-semibold mb-2">
              {client.surName} {client.secondSurName}
            </div>
            <div className="text-white text-lg sm:text-2xl font-semibold mb-2">
              Dni: {client.dni}
            </div>
          </div>
        </div>
        <div className="mb-3 flex flex-col sm:flex-row justify-between">
          <div className="mb-3 sm:mb-0">
            <h2 className="text-white text-lg sm:text-lg font-semibold mb-2 text-center">
              Membresia
            </h2>
            {latestMembership ? (
              <div className="text-white text-base sm:text-lg font-semibold mb-2 text-center">
                <p>Inicio:</p>
                <p>
                  {new Date(latestMembership.startDate).toLocaleDateString(
                    "es",
                    {
                      day: "2-digit", // Día con dos dígitos
                      month: "2-digit", // Mes con dos dígitos
                      year: "numeric", // Año en formato completo
                    }
                  )}
                </p>
                <p>Término:</p>
                <p>
                  {new Date(latestMembership.endDate).toLocaleDateString("es", {
                    day: "2-digit", // Día con dos dígitos
                    month: "2-digit", // Mes con dos dígitos
                    year: "numeric", // Año en formato completo
                  })}
                </p>
                <p>
                  <Estado activo={client.latestMembership.state} />
                </p>
              </div>
            ) : (
              <p>No hay membresía registrada</p>
            )}
          </div>
          <div className="mb-3">
            <h2 className="text-white text-base sm:text-lg font-semibold mb-2 text-center">
              Asistencia
            </h2>
            <div className="text-white text-4xl sm:text-6xl font-semibold text-center mb-5">
              {latestMembership ? latestMembership.attendance : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientViewModal;
