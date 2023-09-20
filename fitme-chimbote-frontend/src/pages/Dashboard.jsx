import React, { useState } from "react";

function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState(0);

  const monthlyEarnings = [
    { month: "Enero", earnings: "$5,000" },
    { month: "Febrero", earnings: "$6,200" },
    { month: "Marzo", earnings: "$7,800" },
    { month: "Abril", earnings: "$7,800" },
    { month: "Mayo", earnings: "$7,800" },
    { month: "Junio", earnings: "$7,800" },
    { month: "Julio", earnings: "$7,800" },
    { month: "Agosto", earnings: "$7,800" },
    { month: "Septiembre", earnings: "$7,800" },
    { month: "Octubre", earnings: "$7,800" },
    { month: "Noviembre", earnings: "$7,800" },
    { month: "Diciembre", earnings: "$7,800" },





    // Agrega más meses aquí...
  ];

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const totalEarnings = [
    {
      category: "Total de Ganancias",
      amount: "$10,000",
    },
    {
      category: "Ganancias Personalizados",
      amount: "$2,400",
    },
    {
      category: "Ganancias CrossFit 3.0",
      amount: "$5,600",
    },
  ];

  const details = [
    {
      category: "CrossFit 3.0",
      details: [
        { shift: "Turno 7AM", amount: "$10 soles" },
        // Agrega más detalles aquí...
      ],
    },
    // Agrega más categorías y detalles aquí...
  ];

  return (
    <div className="w-full h-full p-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="mb-4">
        <label htmlFor="month" className="text-gray-600 dark:text-gray-400">
          Selecciona un mes:
        </label>
        <select
          id="month"
          className="block w-full sm:w-36 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-300 py-2 px-3 rounded-md focus:ring focus:ring-primary-200 dark:focus:ring-primary-600"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {monthlyEarnings.map((entry, index) => (
            <option key={index} value={index}>
              {entry.month}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {totalEarnings.map((entry, index) => (
          <div key={index} className="w-full">
            <div className="bg-purple-600  rounded-2xl border border-stroke p-4">
              <h2 className="text-xl font-semibold mb-2">{entry.category}</h2>
              <p className="text-white text-3xl">
                 {entry.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-4">Detalles de Ganancia</h2>
        {details.map((category, index) => (
          <div key={index} className="mb-4">
            <div className="bg-green-500 dark:bg-boxdark rounded border border-stroke p-4 shadow-default dark:border-strokedark">
              <h3 className="text-lg font-semibold">{category.category}</h3>
              <table className="table-auto w-full mt-2">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Turno</th>
                    <th className="px-4 py-2">Ganancia</th>
                  </tr>
                </thead>
                <tbody>
                  {category.details.map((detail, detailIndex) => (
                    <tr key={detailIndex}>
                      <td className="px-4 py-2">{detail.shift}</td>
                      <td className="px-4 py-2">{detail.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
