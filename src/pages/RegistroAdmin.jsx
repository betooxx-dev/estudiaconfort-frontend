import { useState } from "react";
import ClienteAxios from "../config/ClienteAxios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function RegistroAdmin() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [repetir, setRepetir] = useState("");
  const [error, setError] = useState({});
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const registrarAdmin = async (e) => {
    e.preventDefault();

    if ([nombre, correo, password, repetir].includes("")) {
      setError({
        msj: "Faltan campos por llenar",
        error: true,
      });
      return;
    }

    if (nombre.split(" ").length < 2) {
      setError({
        msj: "Escribe tu nombre completo (Nombre y Apellidos)",
        error: true,
      });
      return;
    }

    if (password.length < 8) {
      setError({
        msj: "La contraseña tiene que tener 8 caracteres como mínimo",
        error: true,
      });
      return;
    }
    if (password !== repetir) {
      setError({
        msj: "Las contraseñas no coinciden",
        error: true,
      });
      return;
    }
    const usuario = {
      nombre,
      correo,
      password,
    };

    try {
      const { data } = await ClienteAxios.post("/auth/admin/registro", usuario);

      Swal.fire({
        icon: "success",
        title: `Hemos enviado un correo para la confirmación de tu cuenta`,
      });

      setError({});
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError({
        msj: `${error.response.data.msj}`,
        error: true,
      });
    }
  };

  return (
    <main className="bg-degradado ">
      <section className="flex flex-col items-center gap-10 px-10 xl:px-2 animate-entrada">
        <h1 className=" text-white text-5xl font-semibold pt-10">
          Administra facilmente tu negocio usando nuestra plataforma
        </h1>
        <p className="text-white text-2xl font-semibold pt-4">
          Completa el siguiente formulario para empezar!
        </p>

        <form
          onSubmit={registrarAdmin}
          className="flex flex-col gap-6  min-w-[360px]"
        >
          {error.error && (
            <div className="bg-slate-800 px-1 py-3 w-full rounded flex justify-center animate-entrada">
              <span className="text-white text-sm font-semibold text-center">
                {error.msj}
              </span>
            </div>
          )}
          <div className="flex flex-col">
            <label
              htmlFor="nombre"
              className="text-white text-xs font-semibold"
            >
              Nombre Completo
            </label>
            <input
              className="p-3 text-xs rounded focus:outline-sky-400"
              type="text"
              id="nombre"
              placeholder="James Hernandez Bone"
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="correo"
              className="text-white text-xs font-semibold"
            >
              Correo Electrónico
            </label>
            <input
              className="p-3 text-xs rounded focus:outline-sky-400"
              type="text"
              id="correo"
              placeholder="usuario@correo.com"
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-white text-xs font-semibold"
            >
              Contraseña
            </label>
            <input
              className="p-3 text-xs rounded focus:outline-sky-400"
              type="password"
              id="password"
              placeholder="Minimo 8 caracteres"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="repetir"
              className="text-white text-xs font-semibold"
            >
              Repetir Contraseña
            </label>
            <input
              className="p-3 text-xs rounded focus:outline-sky-400"
              type="password"
              id="repetir"
              placeholder="Repetir contraseña"
              onChange={(e) => setRepetir(e.target.value)}
            />
          </div>

          <input
            className="py-4 w-full border rounded text-white font-bold hover:bg-sky-500 transition-colors mb-20"
            value={"Registrar"}
            type="submit"
          />
        </form>
      </section>
    </main>
  );
}
