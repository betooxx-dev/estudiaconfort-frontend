import { useEffect, useState } from "react";
import estudiante from "../../public/estudiante.webp";
import useEstudiantes from "../hooks/useEstudiantes";

export default function Index() {
  const [tuxtla, setTuxtla] = useState(true);
  const [suchiapa, setSuchiapa] = useState(false);
  const [sanCristobal, setSanCristobal] = useState(false);
  const { getIndex, habitaciones, cargando, alerta } = useEstudiantes();

  const setCiudades = (ciudad) => {
    if (ciudad === "tuxtla") {
      setTuxtla(true);
      setSuchiapa(false);
      setSanCristobal(false);
    } else if (ciudad === "suchiapa") {
      setTuxtla(false);
      setSuchiapa(true);
      setSanCristobal(false);
    } else {
      setTuxtla(false);
      setSuchiapa(false);
      setSanCristobal(true);
    }
  };

  useEffect(() => {
    getIndex();
  }, []);

  return (
    <main className="bg-degradado">
      <section className="flex flex-col lg:flex-row xl:pt-20 justify-between mx-10 xl:mx-40 items-center">
        <article className="flex flex-col  xl:items-start gap-2 xl:gap-0">
          <span className="bg-indigo-950 border-white shadow p-2 text-white font-semibold rounded w-48 text-center">
            Estudia cómodamente
          </span>
          <h1 className="text-white text-6xl font-bold mt-5">
            EstudiaConfort
          </h1>
          <p className="text-white mt-5 text-justify lg:w-[500px]">
            ¡Bienvenido! Con esta aplicación web tendras acceso a una aplia selección
            de departementos modernos y bien equipados, ubicados
            estrategicamente cerca de las principales universidades y centros de
            estudio.{" "}
          </p>
          <span className="text-white mt-10 font-bold text-lg cursor-pointer transition-all hover:scale-110">
            Conocenos <span className="text-xl ml-3">&#10157;</span>
          </span>
        </article>
        <div className=" rounded-xl shadow-2xl lg:ml-14  xl:mr-32 bg-sky-500 lg:inline hidden ">
          <img
            className="object-cover h-[400px]"
            src={estudiante}
            alt="estudiante"
          />
        </div>
      </section>

      <section className="py-20 flex flex-col items-center gap-6">
        <h1 className=" text-3xl font-bold text-white">Catalogo</h1>
        <p className=" text-white">
          Regístrate y explora las habitaciones y departamentos cerca de tu
          institución
        </p>
        <div className="w-full xl:w-[1000px] xl:rounded-full bg-sky-600 flex flex-col xl:flex-row justify-between">
          <button
            onClick={() => setCiudades("tuxtla")}
            className={`py-4 px-10 text-white ${
              tuxtla ? "bg-cyan-500" : ""
            } font-semibold hover:bg-cyan-500 duration-500 w-full rounded-full transition-all`}
          >
            Tuxtla Gutiérrez
          </button>

          <button
            onClick={() => setCiudades("suchiapa")}
            className={`py-4 px-10 text-white ${
              suchiapa ? "bg-cyan-500" : ""
            } font-semibold hover:bg-cyan-500 duration-500 w-full rounded-full transition-all`}
          >
            Próximamente
          </button>

          <button
            onClick={() => setCiudades("sancris")}
            className={`py-4 px-10 text-white ${
              sanCristobal ? "bg-cyan-500" : ""
            } font-semibold bg-sky-600 hover:bg-cyan-500 duration-500 w-full rounded-full transition-all`}
          >
            Próximamente
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {cargando ? (
            <p className="text-white">Cargando...</p>
          ) : (
            habitaciones.map((habitacion) => (
              <img
                className=" h-52 w-80 object-cover rounded-xl"
                src={`${import.meta.env.VITE_BACKEND_URL}/api/img/${
                  habitacion?.imagen1
                }`}
              />
            ))
          )}
        </div>
        {alerta.length > 0 && <p className="text-white ">{alerta}</p>}
      </section>
    </main>
  );
}
