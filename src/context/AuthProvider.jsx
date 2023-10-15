import { createContext, useEffect, useState } from "react";
import ClienteAxios from "../config/ClienteAxios";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext()


const AuthProvider = ({children}) => {
  
  const [auth, setAuth] = useState({})
  const [cargando, setCargando] = useState(true)

  const navigate = useNavigate()

  useEffect(()=>{
    const autenticarUsuario = async() => {
      const token = localStorage.getItem('token')
 
      if(!token){
        setCargando(false)
        return
      }
      
      const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`

          }
      }

      try {
        const {data} =  await ClienteAxios('/auth/usuario/perfil', config)
        setAuth(data) 
        if(data.role === 'admin') {
          navigate('/admin')
          
        }else{
          navigate('/dashboard')
        }
        
      } catch (error) {
        setAuth({})
      }

      setCargando(false)

    }
    autenticarUsuario()
  },[])

  return(
    <AuthContext.Provider
      value={{
        setAuth,
        auth,
        cargando
      }}  
    >
      {children}
    </AuthContext.Provider>
  )
}


export {
  AuthProvider
}

export default AuthContext