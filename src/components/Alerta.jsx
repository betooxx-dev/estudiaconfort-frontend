
export default function Alerta({error}) {
  return (
    <div className="flex bg-slate-800 h-8 items-center justify-center py-5 animate-entrada rounded-lg">
      <p className="text-white font-bold">{error}</p>  
    </div>
  )
}
