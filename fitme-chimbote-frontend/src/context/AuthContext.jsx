import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, registerRequest, verityTokenRequest } from "../api/auth";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used whithin an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verityTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false); // Aquí corregido
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setIsAuthenticated(true);
      setUser(res.data);
      toast.success("Inicio de sesión exitoso");
    } catch (error) {
      console.error(error);
      setErrors(error.response.data);
      toast.error("Correo y/o Contraseña Incorrecta");
    }
  };
  return (
    <AuthContext.Provider
      value={{ signup, signin, user, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
