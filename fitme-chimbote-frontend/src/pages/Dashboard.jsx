import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDashboard } from "../api/dashboard";
import { useDashboard } from "../context/DashboardContext";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);
setDefaultLocale("es");

function Dashboard() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { dashboardData, setDashboardData, start, setStart, end, setEnd } =
    useDashboard();

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  console.log("hola " + start + +end);

  const handleGetRange = async () => {
    if (startDate && endDate) {
      console.log("Fecha de inicio:", startDate);
      console.log("Fecha de fin:", endDate);

      // Llama a la función getDashboard para obtener los datos del dashboard
      try {
        const dateRange = {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        };
        const response = await getDashboard(dateRange);
        const res = setDashboardData(response.data);
        console.log("Datos del dashboard:", res);
      } catch (error) {
        console.error("Error al obtener datos del dashboard:", error);
      }
    } else {
      console.log("Selecciona un rango de fechas primero.");
    }
  };

  const totalEarnings = [
    {
      category: "Total de Ganancias",
      amount: "S./" + dashboardData.total,
    },
    {
      category: "Ganancias Personalizados",
      amount: "S./" + dashboardData.personalizado,
    },
    {
      category: "Ganancias CrossFit 3.0",
      amount: "S./" + dashboardData.crossfit,
    },
  ];

  const details = [
    {
      category: "CrossFit 3.0",
      details: [
        { shift: "Turno 7AM", amount: "S./" + dashboardData.turno7AM },
        { shift: "Turno 8AM", amount: "S./" + dashboardData.turno8AM },
        { shift: "Turno 9AM", amount: "S./" + dashboardData.turno9AM },
        { shift: "Turno 10AM", amount: "S./" + dashboardData.turno10AM },
        { shift: "Turno 11AM", amount: "S./" + dashboardData.turno11AM },
        { shift: "Turno 5PM", amount: "S./" + dashboardData.turno5PM },
        { shift: "Turno 6PM", amount: "S./" + dashboardData.turno6PM },
        { shift: "Turno 7PM", amount: "S./" + dashboardData.turno7PM },
        { shift: "Turno 8PM", amount: "S./" + dashboardData.turno8PM },
        { shift: "Turno 9PM", amount: "S./" + dashboardData.turno9PM },
        { shift: "Turno Libre", amount: "S./" + dashboardData.turnoLibreId },
      ],
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="mb-4">
        <label htmlFor="startDate" className="text-gray-400">
          Fecha de Inicio:
        </label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          locale="es"
          dateFormat="dd/MM/yyyy"
          className="block w-full sm:w-36 bg-gray-800 border border-gray-600 text-gray-100 py-2 px-3 rounded-md focus:ring focus:ring-primary-200 dark:focus:ring-primary-600"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="text-gray-400">
          Fecha de Fin:
        </label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          locale="es"
          dateFormat="dd/MM/yyyy"
          className="block w-full sm:w-36 bg-gray-800 border border-gray-600 text-gray-100 py-2 px-3 rounded-md focus:ring focus:ring-primary-200 dark:focus:ring-primary-600"
        />
      </div>
      <button
        onClick={handleGetRange}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-blue-600"
      >
        Obtener Rango de Fechas
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {totalEarnings.map((entry, index) => (
          <div key={index}>
            <div className="bg-purple-600 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">{entry.category}</h2>
              <p className="text-white text-3xl">{entry.amount}</p>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-semibold my-4">Detalles de Ganancia</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {details.map((category, index) => (
          <div key={index}>
            <div className="bg-green-600 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">
                {category.category}
              </h2>
              {category.details.map((detail, detailIndex) => (
                <div key={detailIndex}>
                  <div className="bg-gray-800 rounded-lg p-4 mt-2">
                    <h2 className="text-xl font-semibold mb-2">
                      {detail.shift}
                    </h2>
                    <p className="text-white text-3xl">{detail.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
