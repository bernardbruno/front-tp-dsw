import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

const AdminRoute = ({ children }) => {
  const usuario = useUserStore((state) => state.usuario);

  if (!usuario || usuario.rol !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;