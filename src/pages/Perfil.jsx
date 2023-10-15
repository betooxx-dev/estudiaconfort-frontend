import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useEstudiantes from "../hooks/useEstudiantes";

export default function Perfil() {
  const { datosPersonales, actualizarDatosPersonales } = useEstudiantes();
  const { auth } = useAuth();

  const [nombre, setNombre] = useState(auth.nombre);
  const [telefono, setTelefono] = useState("");
  const [nombre_tutor, setNombreTutor] = useState("");
  const [tel_tutor, setTelTutor] = useState("");
  const [institucion, setInstitucion] = useState("");
  const [sexo, setSexo] = useState("");

  const actualizarDatos = async (e) => {
    e.preventDefault();

    if ([telefono, nombre_tutor, tel_tutor, institucion, sexo].includes("")) {
      Swal.fire({
        title: "Faltan campos por llenar",
        icon: "error",
      });
      return;
    }

    if (telefono.length < 10 || tel_tutor.length < 10) {
      Swal.fire({
        title: "El número de teléfono tiene que ser de 10 dígitos",
        icon: "warning",
      });
      return;
    }

    if (nombre_tutor.split(" ").length < 2) {
      Swal.fire({
        title: "Escribe el nombre completo del tutor",
        icon: "warning",
      });
      return;
    }

    if (institucion.split(" ").length < 3) {
      Swal.fire({
        title: "Escribe el nombre completo de la institución",
        text: "Procura no usar abreviaturas",
        icon: "warning",
      });
      return;
    }

    actualizarDatosPersonales({
      telefono,
      nombre_tutor,
      tel_tutor,
      institucion,
      sexo,
    });
  };

  useEffect(() => {
    const completarDatosPersonales = () => {
      if (Object.keys(datosPersonales).length === 0) {
        return;
      }

      const { telefono, nombre_tutor, tel_tutor, institucion, sexo } =
        datosPersonales;
      setTelefono(telefono);
      setInstitucion(institucion);
      setTelTutor(tel_tutor);
      setNombreTutor(nombre_tutor);
      setSexo(sexo);
    };
    completarDatosPersonales();
  }, []);

  return (
    <main className="">
      <div className="flex flex-col items-center gap-2">
        <svg
          className="mt-8 w-32 h-32 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill={
            sexo === "hombre" ? "#107bcc" : sexo === "mujer" ? "#ff5cab" : ""
          }
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <h1 className="text-4xl  text-blue-850">Perfil</h1>
        <h2 className="text-gray-400 text-xl">
          Al completar la información de tu perfil podras solicitar informes con
          los administradores.
        </h2>
      </div>

      <form
        onSubmit={actualizarDatos}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-10 px-20"
      >
        <div className="flex flex-col lg:col-span-2">
          <label className="text-blue-950 font-semibold" htmlFor="nombre_tutor">
            Nombre Completo
          </label>
          <input
            type="text"
            defaultValue={nombre}
            disabled
            placeholder="Tu Nombre Completo"
            className="p-3 rounded border focus:outline-slate-300 text-slate-600 bg-slate-100"
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-blue-950 font-semibold" htmlFor="telefono">
            Teléfono Personal
          </label>
          <input
            defaultValue={telefono}
            type="number"
            min="0"
            {...(datosPersonales.telefono > 0 && { disabled: true })}
            placeholder="961 000 0000"
            className=" appearance-none p-3 rounded  border focus:outline-slate-300 text-slate-700"
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-blue-950 font-semibold" htmlFor="nombre_tutor">
            Nombre del tutor
          </label>
          <input
            defaultValue={nombre_tutor}
            type="text"
            {...(Object.keys(datosPersonales).length !== 0
              ? { disabled: true }
              : { disabled: false })}
            placeholder="Nombre del tutor"
            className="p-3 rounded  border focus:outline-slate-300 text-slate-700"
            onChange={(e) => setNombreTutor(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-blue-950 font-semibold" htmlFor="telefono">
            Teléfono de Tutor
          </label>
          <input
            defaultValue={tel_tutor}
            type="number"
            {...(datosPersonales.tel_tutor > 0
              ? { disabled: true }
              : { disabled: false })}
            placeholder="961 000 0000"
            className="p-3 rounded  border focus:outline-slate-300 text-slate-700"
            onChange={(e) => setTelTutor(e.target.value)}
            min="0"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-blue-950 font-semibold" htmlFor="nombre_tutor">
            Institución Educativa
          </label>
          <input
            defaultValue={institucion}
            type="text"
            {...(Object.keys(datosPersonales).length !== 0 && {
              disabled: true,
            })}
            placeholder="Universidad Politecnica De Chiapas"
            className="p-3 rounded  border focus:outline-slate-300 text-slate-700"
            onChange={(e) => setInstitucion(e.target.value)}
          />
        </div>

        <div className="flex flex-col lg:col-span-2">
          <label htmlFor="sexo" className="text-blue-950 font-semibold">
            Género
          </label>
          <select
            onChange={(e) => setSexo(e.target.value)}
            value={sexo}
            className="border p-3 rounded text-center"
            name="sexo"
            id="sexo"
          >
            <option value="">-- Seleccione una opcion --</option>
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
          </select>
        </div>
        <input
          type="submit"
          value="Enviar"
          className={`lg:col-span-2 bg-sky-950 text-white p-3 font-semibold cursor-pointer rounded ${
            Object.keys(datosPersonales).length === 0
              ? "hover:bg-sky-900"
              : "bg-slate-300"
          }`}
          {...(Object.keys(datosPersonales).length === 0
            ? { disabled: false }
            : { disabled: true })}
        />
      </form>
    </main>
  );
}
