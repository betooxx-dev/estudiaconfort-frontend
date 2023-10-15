import { useEffect, useState } from "react";
import useEstudiantes from "../hooks/useEstudiantes";
import EstudianteEnTabla from "../components/EstudianteEnTabla";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

function AdminInicio() {
  const {
    obtenerEstudiantes,
    estudiantes,
    cargando,
    rechazarSolicitud,
    cambiarEstado,
    modal,
    setModal,
    cambiarEstadoRenta,
  } = useEstudiantes();
  const { auth } = useAuth();
  const [nombre, setNombre] = useState("");
  const [estudianteSeleccionado, setEstudiante] = useState({});
  const [buscar, setBuscar] = useState("");
  const [estudiantesBuscados, setEstudantesBuscados] = useState([]);
  const rechazar = () => {
    rechazarSolicitud(estudianteSeleccionado.solicitud_id);
  };

  useEffect(() => {
    obtenerEstudiantes();
  }, [estudiantes]);

  useEffect(() => {
    let nombre = auth.nombre.split(" ");
    setNombre(nombre[0]);
    if (auth.renta === "pendiente") {
      alerta("Servicio en pausa", "warning");
    }
  }, []);

  useEffect(() => {
    const filtrarEstudiantes = () => {
      const estudiantesFiltrados = estudiantes.filter((estudiante) =>
        estudiante.nombre.toLowerCase().includes(buscar.toLowerCase())
      );

      setEstudantesBuscados(estudiantesFiltrados);
    };
    filtrarEstudiantes();
  }, [buscar]);

  const alerta = (titulo, icono) => {
    Swal.fire({
      title: titulo,
      icon: icono,
      text: "Lamentamos informarte que tu servicio se encuentra actualmente en pausa debido a un pago pendiente. Por favor, realiza el pago lo antes posible para reactivar tu servicio y continuar disfrutando de nuestros servicios.",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#3085d6",
    });
  };

  const cambiarPago = () => {
    cambiarEstadoRenta({
      id: estudianteSeleccionado.solicitud_id,
      renta: estudianteSeleccionado.renta,
    });
    setModal(false);
  };

  return (
    <>
      {modal && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 z-50 flex justify-center items-center animate-entrada ">
          <button
            onClick={() => {
              setModal(false);
              setEstudiante({});
            }}
            className="fixed top-3 right-10 xl:top-10 xl:right-10 text-white font-bold text-[40px]"
          >
            X
          </button>
          <div className="bg-white rounded-xl p-1 xl:p-8 flex flex-col">
            <h1 className="text-2xl text-center mb-2 text-gray-800">
              Datos del Estudiante
            </h1>
            <div className=" p-2 rounded-xl shadow-lg w-[380px]">
              <p className="text-slate-800 text-sm font-semibold">
                Nombre:{" "}
                <span className="text-gray-600 font-normal">
                  {" "}
                  {estudianteSeleccionado.nombre}
                </span>{" "}
              </p>
              <p className="text-slate-800 text-sm font-semibold">
                Institución:{" "}
                <span className="text-gray-600 font-normal">
                  {" "}
                  {estudianteSeleccionado.institucion}
                </span>{" "}
              </p>
              <p className="text-slate-800 text-sm font-semibold">
                Teléfono:{" "}
                <span className="text-gray-600 font-normal">
                  {" "}
                  {estudianteSeleccionado.telefono}
                </span>{" "}
              </p>
              <p className="text-slate-800 text-sm font-semibold">
                Solicitud:{" "}
                <span className="text-gray-600 font-normal">
                  {" "}
                  {estudianteSeleccionado.estado}
                </span>{" "}
              </p>
            </div>
            <h1 className="text-2xl text-center my-2 text-gray-800 ">
              Datos del Tutor
            </h1>
            <div className=" p-2 rounded-xl shadow-lg">
              <p className="text-slate-800 text-sm font-semibold">
                Nombre:{" "}
                <span className="text-gray-600 font-normal">
                  {estudianteSeleccionado.nombre_tutor}
                </span>{" "}
              </p>
              <p className="text-slate-800 text-sm font-semibold">
                Teléfono:{" "}
                <span className="text-gray-600 font-normal">
                  {estudianteSeleccionado.tel_tutor}
                </span>
              </p>
            </div>
            <div className="p-2 rounded-xl shadow-lg flex flex-col items-center">
              <p className="text-slate-800 text-sm font-semibold ">
                Habitación
              </p>
              <img
                className="w-[200px]"
                src={`${import.meta.env.VITE_BACKEND_URL}/api/img/${
                  estudianteSeleccionado?.filename
                }`}
                alt="imagen-usuarioimg"
              />
            </div>
            {estudianteSeleccionado.renta === "pendiente" &&
            estudianteSeleccionado.estado === "rentando" ? (
              <>
                <button
                  onClick={() =>
                    cambiarEstado(estudianteSeleccionado.solicitud_id)
                  }
                  className="bg-blue-700 p-2 rounded text-white mt-2 hover:bg-blue-500 transition-all"
                >
                  {estudianteSeleccionado.estado === "pendiente"
                    ? "Aceptar solicitud"
                    : "Mover a solicitudes"}
                </button>
                <button
                  onClick={cambiarPago}
                  className="bg-green-700 p-2 rounded text-white mt-2 hover:bg-green-500 transition-all "
                >
                  Acreditar pago
                </button>
              </>
            ) : estudianteSeleccionado.estado === "pendiente" ? (
              <>
                <button
                  onClick={() =>
                    cambiarEstado(estudianteSeleccionado.solicitud_id)
                  }
                  className="bg-blue-700 p-2 rounded text-white mt-2 hover:bg-blue-500 transition-all"
                >
                  {estudianteSeleccionado.estado === "pendiente"
                    ? "Aceptar solicitud"
                    : "Mover a solicitudes"}
                </button>
                <button
                  onClick={rechazar}
                  className="bg-red-700 p-2 rounded text-white mt-2 hover:bg-red-500 transition-all "
                >
                  Rechazar solicitud
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() =>
                    cambiarEstado(estudianteSeleccionado.solicitud_id)
                  }
                  className="bg-blue-700 p-2 rounded text-white mt-2 hover:bg-blue-500 transition-all"
                >
                  {estudianteSeleccionado.estado === "pendiente"
                    ? "Aceptar solicitud"
                    : "Mover a solicitudes"}
                </button>
                <button
                  onClick={cambiarPago}
                  className="bg-red-700 p-2 rounded text-white mt-2 hover:bg-red-500 transition-all "
                >
                  Cambiar estado de pago
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <main className="flex flex-col gap-5 p-2 mb-20">
        <h1 className="text-4xl mt-5 text-center">
          Bienvenido al panel de Administrador {nombre}
        </h1>
        <p className="text-slate-600 text-2xl text-center">
          Tablas de Estudiantes
        </p>

        <article className="flex bg-slate-300 gap-10 py-5 px-3 overflow-x-scroll scroll-smooth">
          <section className="flex flex-col bg-slate-100 min-w-[350px] xl:min-w-[500px] border rounded-lg h-[600px] xl:h-[450px]">
            <div className="flex justify-between bg-white p-2 shadow-lg m-1 rounded">
              <h1 className="text-lg xl:text-md">
                <span className="mr-2 text-yellow-400 text-lg">&#9864;</span>
                Solicitudes
              </h1>
              <span className="text-slate-500">
                {
                  estudiantes.filter(
                    (estudiante) => estudiante.estado === "pendiente"
                  ).length
                }{" "}
                Solicitudes
              </span>
            </div>
            <div className="p-2">
              {estudiantes.length === 0 ? (
                <h1 className="text-slate-800 ">
                  {cargando ? "Cargando ..." : "No hay registros"}
                </h1>
              ) : (
                estudiantes.map((estudiante) => {
                  if (estudiante.estado === "pendiente")
                    return (
                      <EstudianteEnTabla
                        key={estudiante.solicitud_id}
                        nombre={estudiante.nombre}
                        institucion={estudiante.institucion}
                        telefono={estudiante.telefono}
                        setModal={setModal}
                        estudiante={estudiante}
                        setEstudiante={setEstudiante}
                        sexo={estudiante.sexo}
                      />
                    );
                })
              )}
            </div>
          </section>
          <section className="flex flex-col bg-slate-100 min-w-[350px] xl:min-w-[500px] border rounded-lg h-[600px] xl:h-[450px]">
            <div className="flex justify-between p-2 bg-white shadow-lg m-1 rounded">
              <h1 className="text-lg xl:text-md">
                <span className="mr-2 text-lg text-blue-600">&#9864;</span>
                Estudiantes rentando
              </h1>
              <span className="text-slate-500">
                {
                  estudiantes.filter(
                    (estudiante) => estudiante.estado === "rentando"
                  ).length
                }{" "}
                Estudiantes
              </span>
            </div>
            <div className="p-2">
              {estudiantes.filter(
                (estudiante) => estudiante.estado === "rentando"
              ).length === 0 ? (
                <h1 className="text-slate-800 ">
                  {cargando ? "Cargando ..." : "No hay registros"}
                </h1>
              ) : (
                estudiantes.map((estudiante) => {
                  if (estudiante.estado === "rentando")
                    return (
                      <EstudianteEnTabla
                        key={estudiante.solicitud_id}
                        nombre={estudiante.nombre}
                        institucion={estudiante.institucion}
                        telefono={estudiante.telefono}
                        setModal={setModal}
                        estudiante={estudiante}
                        setEstudiante={setEstudiante}
                        sexo={estudiante.sexo}
                      />
                    );
                })
              )}
            </div>
          </section>
          <section className="flex flex-col bg-slate-100 min-w-[350px] xl:min-w-[500px] border rounded-lg h-[600px] xl:h-[450px]">
            <div className="flex justify-between p-2 shadow-lg m-1 rounded">
              <h1 className="text-lg xl:text-md">
                <span className="mr-2 text-lg text-red-500">&#9864;</span>Pagos
                Pendientes
              </h1>
              <span className="text-slate-500">
                {
                  estudiantes.filter(
                    (estudiante) =>
                      estudiante.estado === "rentando" &&
                      estudiante.renta === "pendiente"
                  ).length
                }{" "}
                Pagos
              </span>
            </div>
            <div className="p-2">
              {estudiantes.filter(
                (estudiante) =>
                  estudiante.estado === "rentando" &&
                  estudiante.renta === "pendiente"
              ).length === 0 ? (
                <h1 className="text-slate-800 ">
                  {cargando ? "Cargando ..." : "No hay registros"}
                </h1>
              ) : (
                estudiantes.map((estudiante, index) => {
                  if (
                    estudiante.estado === "rentando" &&
                    estudiante.renta === "pendiente"
                  )
                    return (
                      <EstudianteEnTabla
                        key={estudiante.solicitud_id}
                        nombre={estudiante.nombre}
                        institucion={estudiante.institucion}
                        telefono={estudiante.telefono}
                        setModal={setModal}
                        estudiante={estudiante}
                        setEstudiante={setEstudiante}
                        sexo={estudiante.sexo}
                      />
                    );
                })
              )}
            </div>
          </section>
          <section className="flex flex-col bg-slate-100 min-w-[350px] xl:min-w-[500px] border rounded-lg h-[600px] xl:h-[450px]">
            <div className="flex justify-between p-2 shadow-lg m-1 rounded">
              <h1 className="text-lg xl:text-md">
                <span className="mr-2 text-lg text-green-600">&#9864;</span>
                Pagos realizados
              </h1>
              <span className="text-slate-500">
                {
                  estudiantes.filter(
                    (estudiante) =>
                      estudiante.estado === "rentando" &&
                      estudiante.renta === "pagado"
                  ).length
                }{" "}
                Realizados
              </span>
            </div>
            <div className="p-2">
              {estudiantes.filter(
                (estudiante) =>
                  estudiante.estado === "rentando" &&
                  estudiante.renta === "pagado"
              ).length === 0 ? (
                <h1 className="text-slate-800 ">
                  {cargando ? "Cargando ..." : "No hay registros"}
                </h1>
              ) : (
                estudiantes.map((estudiante) => {
                  if (
                    estudiante.estado === "rentando" &&
                    estudiante.renta === "pagado"
                  )
                    return (
                      <EstudianteEnTabla
                        key={estudiante.solicitud_id}
                        nombre={estudiante.nombre}
                        institucion={estudiante.institucion}
                        telefono={estudiante.telefono}
                        setModal={setModal}
                        estudiante={estudiante}
                        setEstudiante={setEstudiante}
                        sexo={estudiante.sexo}
                      />
                    );
                })
              )}
            </div>
          </section>
        </article>
        <p className="text-slate-800 text-4xl text-center ">
          Buscar Estudiates
        </p>
        <section className="p-5 flex flex-col xl:flex-row justify-center items-center">
          <div className="bg-white p-2 flex gap-3 items-center rounded border shadow-xl">
            <label htmlFor="nombre">Ingresa la institucion del Estudiate</label>
            <input
              className="p-2 focus:outline-slate-200"
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre del estudiante"
              onChange={(e) => setBuscar(e.target.value)}
            />
          </div>
        </section>
        <div
          className={`grid ${
            buscar.length === 0
              ? ""
              : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 bg-gray-100"
          } `}
        >
          {buscar.length === 0 ? (
            <h1 className="text-center text-gray-500">
              Los estudiantes buscados apareceran aquí
            </h1>
          ) : (
            estudiantesBuscados.map((estudiante) => {
              if (estudiante.estado === "rentando")
                return (
                  <div
                    className="shadow-xl p-5 flex flex-col items-center m-10 hover:scale-105 transition-all cursor-pointer animate-entrada bg-white"
                    onClick={() => {
                      setModal(true);
                      setEstudiante(estudiante);
                    }}
                  >
                    <svg
                      className="w-20 h-20 mx-4  text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill={
                        estudiante.sexo === "hombre" ? "#107bcc" : "#ff5cab"
                      }
                      viewBox="0 0 14 18"
                    >
                      <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                    </svg>
                    <p className="text-4xl text-center">{estudiante.nombre}</p>
                    <p className="text-sm text-gray-500">
                      {estudiante.institucion}
                    </p>
                    <p className="text-sm text-gray-500">
                      {estudiante.telefono}
                    </p>
                  </div>
                );
            })
          )}
        </div>
      </main>
    </>
  );
}

export default AdminInicio;
