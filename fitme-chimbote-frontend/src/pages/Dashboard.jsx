import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getDashboard } from "../api/dashboard";
import { useDashboard } from "../context/DashboardContext";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import toast from "react-hot-toast";

// Define los nombres de los meses y días de la semana en español
const spanishLocale = {
  months: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  weekdays: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
};

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
        toast.success("Filtrado Exitoso");
        console.log("Datos del dashboard:", res);
      } catch (error) {
        console.error("Error al obtener datos del dashboard:", error);
      }
    } else {
      toast.error("Selecciona un rango de fechas primero");

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
      category: "Turnos",
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
        {
          shift: "Turno Libre Personalizado",
          amount: "S./" + dashboardData.turnoLibreId,
        },
      ],
    },
  ];

  return (
    <div className="text-white min-h-screen p-8">
      <h1 className="text-2xl font-semibold mb-4 mt-10">Dashboard</h1>

      <div className="mb-4">
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <Stack spacing={3}>
            <DesktopDatePicker
              label="Seleccionar Fecha de Inicio"
              inputFormat="MM/DD/YYYY"
              value={startDate}
              onChange={handleStartDateChange}
              textField={(props) => <TextField {...props} fullWidth />}
              sx={{
                "& .MuiCalendar-root": {
                  background: "black",
                },
                "& label": {
                  color: "white",
                },
                "& label.Mui-focused": {
                  color: "white",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "white",
                },
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                  "& MuiFormControl-root": {
                    background: "black",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiButtonBase-root": {
                  color: "white",
                },
              }}
            />
            <DesktopDatePicker
              label="Seleccionar Fecha de Fin"
              inputFormat="MM/DD/YYYY"
              value={endDate}
              onChange={handleEndDateChange}
              textField={(props) => <TextField {...props} fullWidth />}
              sx={{
                "& label": {
                  color: "white",
                },
                "& label.Mui-focused": {
                  color: "white",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "white",
                },
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                  "& MuiFormControl-root": {
                    background: "black",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiButtonBase-root": {
                  color: "white",
                },
                "& .MuiIconButton-root": {
                  color: "white",
                },
              }}
            />
          </Stack>
        </LocalizationProvider>
      </div>
      <button
        onClick={handleGetRange}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-blue-600"
      >
        Filtrar
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
