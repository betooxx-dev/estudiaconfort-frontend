import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useEstudiantes from "../hooks/useEstudiantes";

function AdminLayout() {
  const [aside, setAside] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { cargando } = useEstudiantes();
  const cerrarSesion = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    setAuth({});

    navigate("/login");
  };

  return (
    <>
      <aside
        className={`fixed h-screen w-[300px] ${
          aside ? "right-0" : "-right-[300px]"
        } bg-slate-900 transition-all duration-700 ease flex flex-col items-center py-20 gap-20 z-10`}
      >
        <Link
          onClick={() => setAside(false)}
          to="/admin"
          className="text-2xl text-white hover:bg-sky-800 py-2 flex justify-center w-40 rounded transition-colors"
        >
          Panel
        </Link>
        <Link
          onClick={() => setAside(false)}
          to="habitaciones"
          className="text-2xl text-white hover:bg-sky-800 py-2 flex justify-center w-40 rounded transition-colors"
        >
          Habitaciones
        </Link>
        <Link
          onClick={() => setAside(false)}
          to="pagos"
          className="text-2xl text-white hover:bg-sky-800 py-2 flex justify-center w-40 rounded transition-colors"
        >
          Pagos
        </Link>
        <button
          onClick={cerrarSesion}
          className="text-2xl text-white  hover:bg-sky-800 py-2 flex justify-center w-40 rounded transition-colors"
        >
          Cerrar sesión
        </button>
      </aside>
      <header
        className={` ${
          cargando && "xl:sticky xl:top-0"
        } bg-white flex p-5 border border-b-slate-300 justify-between items-center w-full`}
      >
        <h1 className="text-3xl xl:text-4xl cursor-pointer">
          Estudia<span className="text-blue-600">Confort</span>
          <span className="text-xs">Admin</span>
        </h1>
        <span
          onClick={() => setAside(!aside)}
          className={`text-lg xl:text-4xl z-10 ${
            aside ? "text-white fixed right-5" : "text-black"
          } cursor-pointer transition-colors `}
        >
          &#9776;
        </span>
      </header>
      <Outlet />
      <footer className="border p-20 mt-10">
        <p className="text-center text-gray-500 text-sm">
          &copy; EstudiaConfort 2023
        </p>
      </footer>
    </>
  );
}

export default AdminLayout;
