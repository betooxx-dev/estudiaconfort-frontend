import { useEffect, useState } from "react";
import ImagenesHabitaciones from "../components/ImagenesHabitaciones";
import Swal from "sweetalert2";
import useEstudiantes from "../hooks/useEstudiantes";
import Cargando from "../components/Cargando";
import Habitacion from "../components/admin/Habitacion";

export default function AdminHabitaciones() {
  const {
    submitHabitacion,
    habitacionesAdmin,
    cargando,
    obtenerHabitacionesAdmin,
    modificarHabitacion,
  } = useEstudiantes();

  const [previewImage, setPreviewImage] = useState("");
  const [previewBanio, setPreviewBanio] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBanio, setSelectedBanio] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [capacidad, setCapacidad] = useState(0);
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [estado, setEstado] = useState("");
  const [showCrear, setShowCrear] = useState(false);
  const [modificar, setModificar] = useState(false);
  const [habitacion, setHabitacion] = useState({});
  function imagenBanio(e) {
    const file = e.target.files[0];

    if (file) {
      setSelectedBanio(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewBanio(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setSelectedBanio(null);
      setPreviewBanio("");
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setPreviewImage("");
    }
  };

  const agregarHabitacion = (e) => {
    e.preventDefault();
    if (!Number(capacidad) || !Number(precio)) {
      alerta("Los campos capacidad y precio deben ser numericos", "error");
      return;
    }
    let capacidadParse = Number(capacidad);
    let precioParse = Number(precio);
    if (
      [
        previewImage,
        previewBanio,
        descripcion,
        capacidad,
        ciudad,
        direccion,
        precio,
        estado,
      ].includes("")
    ) {
      alerta("Todos los campos son obligatorios", "error");
      return;
    }

    const formData = new FormData();
    formData.append("habitaciones", selectedImage);
    formData.append("habitaciones", selectedBanio);

    let habitacion = {
      descripcion,
      capacidad: capacidadParse,
      ciudad,
      direccion,
      precio: precioParse,
      estado,
    };

    submitHabitacion(habitacion, formData);

    setModificar(false);
    setShowCrear(false);
    setHabitacion({});
    setDescripcion("");
    setCapacidad(0);
    setCiudad("");
    setDireccion("");
    setPrecio(0);
    setEstado("");
    setPreviewImage("");
    setPreviewBanio("");
    setSelectedImage(null);
    setSelectedBanio(null);
  };

  useEffect(() => {
    obtenerHabitacionesAdmin();
  }, [habitacionesAdmin]);

  const alerta = (titulo, icono) => {
    Swal.fire({
      title: titulo,
      icon: icono,
    });
  };

  const modify = () => {
    if (!Number(capacidad) || !Number(precio)) {
      alerta("Los campos capacidad y precio deben ser numericos", "error");
      return;
    }
    let capacidadParse = Number(capacidad);
    let precioParse = Number(precio);
    if (
      [descripcion, capacidad, ciudad, direccion, precio, estado].includes("")
    ) {
      alerta("Todos los campos son obligatorios", "error");
      return;
    }

    const habitacionModificada = {
      descripcion,
      capacidad: capacidadParse,
      ciudad,
      direccion,
      precio: precioParse,
      estado,
    };
    modificarHabitacion(habitacion.id, habitacionModificada);
    setModificar(false);
    setShowCrear(false);
    setHabitacion({});
    setDescripcion("");
    setCapacidad(0);
    setCiudad("");
    setDireccion("");
    setPrecio(0);
    setEstado("");
    setPreviewImage("");
    setPreviewBanio("");
    setSelectedImage(null);
    setSelectedBanio(null);
  };

  const cancelar = () => {
    setModificar(false);
    setShowCrear(false);
    setHabitacion({});
    setDescripcion("");
    setCapacidad(0);
    setCiudad("");
    setDireccion("");
    setPrecio(0);
    setEstado("");
    setPreviewImage("");
    setPreviewBanio("");
    setSelectedImage(null);
    setSelectedBanio(null);
  };

  return (
    <>
      {cargando && <Cargando />}
      <main className={`p-2 flex flex-col gap-5 `}>
        <h1 className="text-center text-4xl mt-5">Habitaciones</h1>
        <p className="text-md text-center text-slate-600 xl:text-2xl ">
          Agrega, modifica y elimina las habitaciones que los usuarios podran
          ver en su inicio
        </p>
        <div className="flex justify-center">
          {modificar ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={cancelar}
            >
              Cancelar
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowCrear(!showCrear)}
            >
              {showCrear ? "Ocultar formulario" : "Agregar habitacion"}
            </button>
          )}
        </div>
        <article
          className={`h-400 bg-slate-200 p-5 animate-entrada ${
            !showCrear && "hidden"
          }`}
        >
          <form
            onSubmit={agregarHabitacion}
            className="flex gap-10 flex-col xl:flex-row justify-around "
          >
            <div className="flex flex-col">
              <label>Descripción</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                type="text"
                placeholder="Describe el interior de la habitacion..."
                className="rounded p-1 focus:outline-slate-300"
              />
              <label htmlFor="capacidad">Capacidad</label>
              <select
                value={capacidad}
                name="capacidad"
                id="capacidad"
                onChange={(e) => setCapacidad(e.target.value)}
              >
                <option value="">-- Selecione una opción --</option>
                <option className="text-center" value="1">
                  1
                </option>
                <option className="text-center" value="2">
                  2
                </option>
                <option className="text-center" value="3">
                  3
                </option>
                <option className="text-center" value="4">
                  4
                </option>
              </select>
              <label htmlFor="ciudad">Ciudad</label>
              <input
                value={ciudad}
                type="text"
                placeholder="Ciudad"
                className="rounded p-1 focus:outline-slate-300"
                onChange={(e) => setCiudad(e.target.value)}
              />
              <label>Direccion</label>
              <input
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                type="text"
                placeholder="Dirección de la habitación"
                className="rounded p-1 focus:outline-slate-300"
              />
              <label>Precio</label>
              <input
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                type="number"
                placeholder="Precio de la habitacion"
                className="rounded p-1 focus:outline-slate-300"
              />
              <label>Estado</label>
              <select
                onChange={(e) => setEstado(e.target.value)}
                value={estado}
              >
                <option value="">-- Selecione una opción --</option>
                <option className="text-center" value="disponible">
                  Disponible
                </option>
                <option className="text-center" value="ocupado">
                  Ocupado
                </option>
              </select>
            </div>
            <ImagenesHabitaciones
              previewBanio={previewBanio}
              previewImage={previewImage}
              handleImageChange={handleImageChange}
              imagenBanio={imagenBanio}
            />
            <div className="flex items-center">
              {modificar ? (
                <button
                  onClick={modify}
                  className="w-full  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Modificar habitación
                </button>
              ) : (
                <input
                  type="submit"
                  value="Agregar habitacion"
                  className="w-full  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                />
              )}
            </div>
          </form>
        </article>
        <section className="grid md:grid-cols-2 xl:grid-cols-3 lg:px-20 gap-20">
          {habitacionesAdmin.length === 0 ? (
            <h1 className="text-slate-800 text-2xl text-center">
              No hay habitaciones registradas
            </h1>
          ) : (
            habitacionesAdmin.map((room) => (
              <>
                <Habitacion
                  key={room.id}
                  foto={room.imagen1}
                  direccion={room.direccion}
                  estado={room.estado}
                  ciudad={room.ciudad}
                  id={room.id}
                  room={room}
                  setModificar={setModificar}
                  setShowCrear={setShowCrear}
                  setHabitacion={setHabitacion}
                  setDescripcion={setDescripcion}
                  setCapacidad={setCapacidad}
                  setCiudad={setCiudad}
                  setDireccion={setDireccion}
                  setPrecio={setPrecio}
                  setEstado={setEstado}
                />
              </>
            ))
          )}
        </section>
      </main>
    </>
  );
}
