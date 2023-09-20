import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Sidebar from "./components/Siderbar";
import { AuthProvider } from "./context/AuthContext";
import TableClient from "./components/TableClient";
import TableUser from "./components/TableUser";
import TableMembership from "./components/TableMembership";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { ClientProvider } from "./context/ClientContext";

function App() {
  return (
    <AuthProvider>
      <ClientProvider>
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
      </ClientProvider>
    </AuthProvider>
  );
}

export default App;
