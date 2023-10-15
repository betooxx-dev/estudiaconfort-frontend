import { Link } from "react-router-dom"
export default function NotFound() {
  return (
    <main className="bg-degradado fixed h-full w-full py-16 flex items-center flex-col gap-10">
      <div className=" bg-white relative p-6 transition-all animate-rotacion rounded">
        <div className="p-6 bg-sky-700 rotate-45 rounded-sm"></div>
      </div>
      <h1 className=" text-white font-bold text-4xl">Lo sentimos, la pagina que buscas no se encontró</h1>
      <Link to='/' className="text-white font-semibold text-2xl hover:scale-105 transition-all">Volver al Inicio</Link>
    </main>
  )
}
