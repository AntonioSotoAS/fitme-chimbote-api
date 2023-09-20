import React from 'react'
import { Avatar } from "@mui/material";


function TableUser() {
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
                  Nombres
                </th>
                <th scope="col" className=" px-6 py-4">
                  Apellidos
                </th>
                <th scope="col" className=" px-6 py-4">
                  Username
                </th>
                <th scope="col" className=" px-6 py-4">
                  Email
                </th>
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
                <td className="whitespace-nowrap px-6 py-4">
                  Arturo Antonio
                </td>
                <td className="whitespace-nowrap px-6 py-4">Montejo Soto</td>
                <td className="whitespace-nowrap px-6 py-4">antonio</td>
                <td className="whitespace-nowrap px-6 py-4">antoniosotofut7@gmail.com</td>

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
  )
}

export default TableUser