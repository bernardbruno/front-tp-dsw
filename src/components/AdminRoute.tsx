import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  // Si no hay usuario o no es admin, redirige a home
  if (!usuario || usuario.rol !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
