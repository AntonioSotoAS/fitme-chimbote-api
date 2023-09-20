import React from "react";
import { Avatar } from "@mui/material";

function TableMembership() {
  return (
    <div className="w-full overflow-x-auto pt-16">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                <tr>
                  <th scope="col" className=" px-6 py-4">
                    Foto
                  </th>
                  <th scope="col" className=" px-6 py-4">
                    Dni
                  </th>
                  <th scope="col" className=" px-6 py-4">
                    Turno
                  </th>
                  <th scope="col" className=" px-6 py-4">
                    Tipo
                  </th>
                  <th scope="col" className=" px-6 py-4">
                    Monto
                  </th>
                  <th scope="col" className=" px-6 py-4">
                    Asistencia
                  </th>
                  <th scope="col" className=" px-6 py-4">
                    Inicio Membresia
                  </th>
                  <th scope="col" className=" px-6 py-4">
                    Fin Membresia
                  </th>
                  <th scope="col" className=" px-6 py-4"></th>
                  <th scope="col" className=" px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap px-6 py-4 flex items-center justify-center">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://upload.wikimedia.org/wikipedia/commons/b/bf/Foto_Perfil_.jpg"
                    />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">75098945</td>
                  <td className="whitespace-nowrap px-6 py-4">9PM</td>
                  <td className="whitespace-nowrap px-6 py-4">Crossfit 3.0</td>
                  <td className="whitespace-nowrap px-6 py-4">300.00</td>
                  <td className="whitespace-nowrap px-6 py-4">20</td>
                  <td className="whitespace-nowrap px-6 py-4">2024-10-10</td>
                  <td className="whitespace-nowrap px-6 py-4">2024-10-10</td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm sm:text-base hover:bg-blue-600">
                      Detalles
                    </button>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm sm:text-base hover:bg-blue-600">
                      Editar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableMembership;
