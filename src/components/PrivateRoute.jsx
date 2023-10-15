import { Navigate } from "react-router-dom";
import UserLayout from "./UserLayout";
import useAuth from "../hooks/useAuth";
import Cargando from './Cargando'
const PrivateRoute = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return <Cargando/>;

  return <>{auth.id ? <UserLayout /> : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
 