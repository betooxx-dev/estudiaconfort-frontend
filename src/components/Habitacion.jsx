import { useNavigate } from "react-router-dom"

export default function   Habitacion({foto,direccion, estado, ciudad,id}) {

  const navigate = useNavigate()
  return (
    <div onClick={()=> navigate(`/dashboard/habitacion/${id}`)}  className="flex flex-col justify-center shadow-xl  rounded-xl cursor-pointer hover:scale-105 transition-all animate-entrada">
    <img className=" h-64 object-cover rounded-xl" src={`${import.meta.env.VITE_BACKEND_URL}/api/img/${foto}`} alt="" />
    <article className=" text-black font-semibold text-center p-2">
      <p className="text-xl text-gray-700">{direccion}</p>
      <p className="text-sm text-slate-600">{estado}</p>
      <p className="text-sm text-slate-600">{ciudad}</p>
    </article>
  </div>
  )
}
