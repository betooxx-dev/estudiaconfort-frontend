import useEstudiantes from "../hooks/useEstudiantes";
import Habitacion from "../components/Habitacion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const {
    habitacion,
    habitaciones,
    obtenerHabitaciones,
    setHabitacionSeleccionada,
    obtenerDatosPersonales,
    obtenerHabitacionUsuario,
  } = useEstudiantes();

  const [buscar, setBuscar] = useState("");
  const [habitacionesFiltradas, setHabitacionesFiltradas] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [habitacionesEstado, setHabitacionesEstado] = useState([]);
  useEffect(() => {
    obtenerHabitaciones();
    obtenerDatosPersonales();
    obtenerHabitacionUsuario();
    setHabitacionSeleccionada({});
  }, []);

  useEffect(() => {
    setFiltroEstado("todos");
    function filtrarHabitaciones() {
      const habitacionesFilter = habitaciones.filter((habitacion) =>
        habitacion.direccion.toLowerCase().includes(buscar.toLowerCase())
      );

      setHabitacionesFiltradas(habitacionesFilter);
    }
    filtrarHabitaciones();
  }, [buscar]);

  useEffect(() => {
    setBuscar("");
    if (filtroEstado.includes("todos")) {
      return;
    }
    function filtrarHabitaciones() {
      const habitacionesFilter = habitaciones.filter((habitacion) =>
        habitacion.estado.toLowerCase().includes(filtroEstado.toLowerCase())
      );

      setHabitacionesEstado(habitacionesFilter);
    }
    filtrarHabitaciones();
  }, [filtroEstado]);

  console.log(habitaciones);

  return (
    <main className="">
      <div>
        {Object.keys(habitacion).length === 0 ? (
          <div className="flex xl:flex-row justify-center px-1 py-10 xl:p-20 gap-10 xl:gap-52 bg-gradient-to-r from-slate-950 to-slate-800">
            <h1 className="text-center font-semibold text-4xl text-white">
              No tienes una habitación en renta
            </h1>
          </div>
        ) : (
          <div className="flex xl:flex-row  flex-col-reverse p-5 xl:p-20 justify-around gap-10 xl:gap-0 bg-gradient-to-r from-slate-800 to-slate-600">
            <img
              className="w-full xl:w-[450px] animate-entrada object-cover"
              src={`${import.meta.env.VITE_BACKEND_URL}/api/img/${
                habitacion?.imagen1
              }`}
              alt="imagen-usuario-habitacion"
            />
            <div className="flex flex-col gap-4 items-center xl:items-end text-white animate-entrada mt-10">
              <h1 className="font-semibold text-6xl xl:text-4xl text-center ">
                Tu Habitación
              </h1>

              <p className="text-2xl xl:text-lg text-center xl:text-end">
                {habitacion.direccion}
              </p>
              <p className="text-2xl ">
                {habitacion.ciudad}, {habitacion.estado} por ti.
              </p>
              <Link to="/dashboard/mihabitacion" className=" text-2xl  ">
                Ver Detalles
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-around my-10 items-center">
        <h1 className="animate-entrada text-4xl  text-sky-900 font-semibold">
          Habitaciones
        </h1>

        <select
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="p-2 border rounded w-[300px]"
          name="estado"
          id="estado"
          value={filtroEstado}
        >
          <option value="">Todos</option>
          <option value="disponible">Disponible</option>
          <option value="ocupado">No disponible</option>
        </select>

        <input
          className="shadow-xl rounded-xl p-3 w-[300px] focus:outline-slate-400"
          onChange={(e) => setBuscar(e.target.value)}
          type="text"
          placeholder="Busqueda por dirección"
          value={buscar}
        />
      </div>

      <section
        className={`animate-entrada grid md:grid-cols-2 ${
          habitaciones.length === 0 ? "" : "xl:grid-cols-3"
        } gap-10 md:mx-10 xl:mx-52`}
      >
        {habitaciones.length === 0 ? (
          <h1 className="text-2xl text-gray-500 pl-2">
            No hay habitaciones disponibles
          </h1>
        ) : habitaciones.length > 0 &&
          buscar.length === 0 &&
          filtroEstado.includes("todos") ? (
          habitaciones.map((room) => (
            <Habitacion
              key={room.id}
              foto={room.imagen1}
              direccion={room.direccion}
              estado={room.estado}
              ciudad={room.ciudad}
              id={room.id}
            />
          ))
        ) : buscar.length > 0 && filtroEstado.includes("todos") ? (
          habitacionesFiltradas.map((room) => (
            <Habitacion
              key={room.id}
              foto={room.imagen1}
              direccion={room.direccion}
              estado={room.estado}
              ciudad={room.ciudad}
              id={room.id}
            />
          ))
        ) : (
          habitacionesEstado.map((room) => (
            <Habitacion
              key={room.id}
              foto={room.imagen1}
              direccion={room.direccion}
              estado={room.estado}
              ciudad={room.ciudad}
              id={room.id}
            />
          ))
        )}
      </section>
    </main>
  );
}

export default Dashboard;
