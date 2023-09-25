import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Sidebar from "./components/Siderbar";
import { AuthProvider } from "./context/AuthContext";
import TableClient from "./components/client/TableClient";
import TableUser from "./components/TableUser";
import TableMembership from "./components/TableMembership";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { ClientProvider } from "./context/ClientContext";
import { Toaster } from "react-hot-toast";
import { DashboardProvider } from "./context/DashboardContext";

function App() {
  return (
    <AuthProvider>
      <ClientProvider>
        <DashboardProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home/*" element={<Sidebar />}>
                <Route path="clients/all" element={<TableClient />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="user/all" element={<TableUser />} />
                <Route path="membership/all" element={<TableMembership />} />
              </Route>
            </Routes>
          </Router>
        </DashboardProvider>
      </ClientProvider>
      <Toaster position="bottom-right" reverseOrder={true} />
    </AuthProvider>
  );
}

export default App;
