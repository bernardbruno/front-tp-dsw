import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  // Si no hay usuario o no es rol user, redirige a login
  if (!usuario || (usuario.rol !== "user" && usuario.rol !== "admin")) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default UserRoute;
