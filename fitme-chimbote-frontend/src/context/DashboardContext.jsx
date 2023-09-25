import { createContext, useContext, useEffect, useState } from "react";
import { getDashboard } from "../api/dashboard"; // Importa la función para obtener datos del dashboard

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};

export function DashboardProvider({ children }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener la fecha del primer día del mes actual
        const currentDate = new Date();
        const firstDayOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );

        // Obtener la fecha del último día del mes actual
        const lastDayOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );

        // Formatear las fechas en el formato deseado (por ejemplo, "YYYY-MM-DD")
        const formattedStart = `${firstDayOfMonth.getFullYear()}-${(
          firstDayOfMonth.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${firstDayOfMonth
          .getDate()
          .toString()
          .padStart(2, "0")}`;
        const formattedEnd = `${lastDayOfMonth.getFullYear()}-${(
          lastDayOfMonth.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${lastDayOfMonth
          .getDate()
          .toString()
          .padStart(2, "0")}`;

        const dateObject = {
          startDate: formattedStart,
          endDate: formattedEnd,
        };

        console.log("startDate: " + dateObject.startDate);
        console.log("endDate: " + dateObject.endDate);

        // Aquí puedes llamar a la función para obtener los datos del dashboard
        const response = await getDashboard(dateObject);
        setDashboardData(response.data);

        setStart(dateObject.startDate);
        setEnd(dateObject.endDate);
        console.log(response.data); // Asegúrate de implementar esta función en tu archivo de API
      } catch (error) {
        console.error("Error al obtener los datos del dashboard:", error);
      }
    };

    fetchData(); // Llama a la función una vez al cargar el componente
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        dashboardData,
        setDashboardData,
        start,
        setStart,
        end,
        setEnd,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
