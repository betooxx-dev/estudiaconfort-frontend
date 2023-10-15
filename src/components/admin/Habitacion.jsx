import { useNavigate } from "react-router-dom"

export default function Habitacion({
  direccion, estado, ciudad,
  foto,
  id,
  room,
  setModificar,
  setShowCrear,
  setHabitacion,
  setDescripcion,
  setCapacidad,
  setCiudad,
  setDireccion,
  setPrecio,
  setEstado


}) {
  const navigate = useNavigate()

  function modificar() {
    setModificar(true)
    setShowCrear(true)
    setHabitacion(room)
    setDescripcion(room.descripcion)
    setCapacidad(room.capacidad)
    setCiudad(room.ciudad)
    setDireccion(room.direccion)
    setPrecio(room.precio)
    setEstado(room.estado)


  }
  return (
    <div className="flex flex-col justify-center shadow border rounded-xl cursor-pointer hover:scale-105 transition-all">
      <img onClick={() => navigate(`/admin/habitaciones/${id}`)} className=" h-64 object-cover rounded-xl" src={`${import.meta.env.VITE_BACKEND_URL}/api/img/${foto}`} alt="" />
      <article onClick={() => navigate(`/admin/habitaciones/${id}`)} className=" text-black font-semibold text-center p-2">
        <p className="text-xl text-gray-700">{direccion}</p>
        <p className="text-sm text-slate-600">{estado}</p>
        <p className="text-sm text-slate-600">{ciudad}</p>
      </article>
      <button onClick={modificar} className="bg-blue-700 m-2 text-white font-bold py-3 rounded hover:bg-blue-600">Modificar</button>
    </div>
  )
}
