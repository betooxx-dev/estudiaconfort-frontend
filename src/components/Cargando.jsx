import './styles/cargando.css';

export default function Cargando() {
    return (
        <div className='fixed z-10 h-full w-full flex justify-center items-center animate-entrada bg-blue-950'>
            <div className="sk-chase">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
            </div>
        </div>
    )
}
