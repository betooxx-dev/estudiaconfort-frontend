import { useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function UserLayout() {
  const [aside, setAside] = useState(false);
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const cerrarSesion = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    setAuth({});

    navigate("/login");
  };
  return (
    <>
      <aside
        className={`lg:hidden fixed flex flex-col ${
          aside ? "right-0" : " -right-[400px]"
        } bg-slate-950 px-32 gap-10 h-full pt-20 transition-all duration-700 ease  z-10`}
      >
        <h1 className="text-white text-xl">
          Estudia<span className="text-sky-400">Confort</span>
        </h1>
        <Link
          onClick={() => setAside(false)}
          to="/dashboard"
          className="text-white text-xl"
        >
          Habitaciones
        </Link>
        <Link
          onClick={() => setAside(false)}
          to="/dashboard/perfil"
          className="text-white text-xl"
        >
          Perfil
        </Link>
        <button onClick={cerrarSesion} className="text-white text-xl">
          Cerrar Sesión
        </button>
      </aside>
      <header className=" flex justify-between px-8 h-[100px] items-center bg-gradient-to-r from-slate-950 to-slate-800">
        <h1 className="text-4xl text-white  animate-entrada  ">
          Estudia<span className="text-cyan-700">Confort</span>
        </h1>
        <nav className="flex gap-10 animate-entrada">
          <Link
            to="/dashboard"
            className="hidden lg:flex text-md text-white border border-sky-200 hover:bg-slate-600 transition-all hover:-translate-y-1 h-12 w-[150px] justify-center items-center rounded font-semibold"
          >
            Habitaciones
          </Link>
          <Link
            to="/dashboard/perfil"
            className="hidden lg:flex text-md text-white border border-sky-200 hover:bg-slate-600 transition-all hover:-translate-y-1 h-12 w-[150px] justify-center items-center rounded font-semibold"
          >
            Perfil
          </Link>
          <button
            onClick={cerrarSesion}
            className="hidden lg:flex text-md text-white border border-sky-200 hover:bg-slate-600 transition-all hover:-translate-y-1 h-12 w-[150px] justify-center items-center rounded font-semibold"
          >
            Cerrar Sesión
          </button>
          <button
            className="lg:hidden z-10 text-3xl text-white"
            onClick={() => setAside(!aside)}
          >
            &#8801;
          </button>
        </nav>
      </header>

      <Outlet />

      <footer className="bg-gradient-to-r from-slate-950 to-slate-800 p-20 mt-10">
        <p className="text-center text-gray-500 text-sm">
          &copy; EstudiaConfort 2023
        </p>
      </footer>
    </>
  );
}

export default UserLayout;
