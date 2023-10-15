
export default function EstudianteEnTabla({ nombre, institucion, telefono, setModal, estudiante, setEstudiante, sexo }) {
    
    return (
        <div onClick={() => {
            setModal(true)
            setEstudiante(estudiante)
        }} className="bg-white rounded shadow-lg p-1 flex gap-2 mt-1 items-center hover:scale-105 transition-all hover:cursor-pointer">
            <svg className="w-6 h-6 mx-4  text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={sexo === 'hombre' ? '#107bcc' : '#ff5cab'} viewBox="0 0 14 18">
                <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
            </svg>
            <div>
                <h2>{nombre}</h2>
                <p className="text-slate-500 text-[12px]">{institucion}</p>
                <p className="text-slate-500 text-[12px]">{telefono}</p>
            </div>

        </div>
    )
}
