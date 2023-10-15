import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
import AdminLayout from './Layout'
import Cargando from './Cargando';
export default function PrivateAdmin() {

  const { auth, cargando } = useAuth();

  if (cargando) return <Cargando/>;

  return <>{auth.role === 'admin' ? <AdminLayout/> : <Navigate to='/login'/>}</>
}
