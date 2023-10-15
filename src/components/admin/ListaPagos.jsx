

export default function ({ nombre, fecha, direccion, monto }) {
    return (
        <div className='bg-white p-3 w-full rounded shadow-xl flex justify-between items-center'>
            <div>
                <p>{nombre}</p>
                <p className="text-xs text-gray-500">{fecha}</p>
                <p className="text-xs text-gray-500">{direccion}</p>
            </div>

            <p>${monto}</p>
        </div>
    )
}
