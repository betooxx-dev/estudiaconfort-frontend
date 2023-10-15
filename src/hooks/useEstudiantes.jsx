import { useContext } from "react";
import EstudiantesContext from "../context/EstudiantesProvider";

const useEstudiantes = () => {
  return useContext(EstudiantesContext)

}

export default useEstudiantes