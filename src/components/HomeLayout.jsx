import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

function HomeLayout() {
  const [aside, setAside] = useState(false);
  return (
    <>
      <div
        className={`xl:hidden ${
          aside ? "bg-sky-950 h-full w-full fixed opacity-90 z-[9] " : ""
        } transition-all`}
      ></div>
      <nav
        className={`xl:sticky xl:top-0 flex justify-between h-[100px] bg-blue-950 items-center px-8  bg-degradado z-10`}
      >
        <Link to="/" className="text-4xl text-white font-semibold">
          Estudia<span className="text-cyan-950">Confort</span>
        </Link>
        <div className="flex gap-6 ">
          <Link
            to="/login"
            className="hidden xl:block text-white cursor-pointer border  py-4 w-[132px] text-center rounded hover:scale-105 hover:bg-sky-500 transition-all"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/registrar"
            className="hidden xl:block text-white cursor-pointer border py-4 w-[132px] text-center rounded hover:scale-105 hover:bg-sky-500 transition-all"
          >
            Registrarse
          </Link>
          <p
            className="text-white scale-[4] xl:hidden cursor-pointer "
            onClick={() => setAside(true)}
          >
            &#8801;
          </p>
          <aside
            className={`xl:hidden  bg-sky-800 fixed h-full z-10 top-0 w-[250px] ${
              aside ? "right-0" : "right-[-300px]"
            } transition-all ease duration-500 text-center flex flex-col gap-10 pt-16`}
          >
            <p
              className="absolute right-5 top-4 text-2xl text-white cursor-pointer"
              onClick={() => setAside(false)}
            >
              X
            </p>
            <Link
              to={"/login"}
              onClick={() => setAside(false)}
              className="text-white text-2xl"
            >
              Iniciar Sesión
            </Link>
            <Link
              to={"/registrar"}
              onClick={() => setAside(false)}
              className="text-white text-2xl"
            >
              Crear Cuenta
            </Link>
            <p></p>
          </aside>
        </div>
      </nav>
      <div
        className={`xl:hidden ${
          aside ? "bg-sky-950 h-full w-full fixed opacity-90 z-[9] " : ""
        } transition-all`}
      ></div>
      <Outlet />
      <footer className="bg-gradient-to-r from-slate-950 to-slate-800 p-20 pt-10">
        <p className="text-center text-gray-500 text-sm">
          &copy; EstudiaConfort 2023
        </p>
      </footer>
    </>
  );
}

export default HomeLayout;
