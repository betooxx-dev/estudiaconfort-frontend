import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useEstudiantes from "../hooks/useEstudiantes";
import CargandoJR from "../components/CargandoJR";
import Cargando from "../components/Cargando";
import Slider from "react-slick";

export default function HabitacionSeleccionadaAdmin() {
  const { id_habitacion } = useParams();
  const {
    obtenerHabitacionSeleccionada,
    habitacionSeleccionada,
    eliminarHabitacion,
    cargando,
  } = useEstudiantes();
  const [cargandoImagenes, setCargandoImagenes] = useState(true);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const eliminar = () => {
    eliminarHabitacion(habitacionSeleccionada.id);
  };

  useEffect(() => {
    obtenerHabitacionSeleccionada(id_habitacion);
  }, []);

  useEffect(() => {
    if (
      habitacionSeleccionada?.imagenes?.[0] &&
      habitacionSeleccionada?.imagenes?.[1]
    ) {
      setCargandoImagenes(false);
    }
  }, [habitacionSeleccionada]);

  return (
    <>
      {cargando && <Cargando />}
      <main className="flex flex-col gap-10 py-5">
        <h1 className="text-center text-4xl text-gray-600">
          Previsualiza la habitación
        </h1>
        <div className="flex items-center justify-around flex-col lg:flex-row">
          {cargandoImagenes ? (
            <CargandoJR />
          ) : (
            <>
              <Slider className="w-[350px] lg:w-1/2" settings={settings}>
                <img
                  className="max-h-96 object-cover"
                  src={`${import.meta.env.VITE_BACKEND_URL}/api/img/${
                    habitacionSeleccionada?.imagenes[0]?.filename
                  }`}
                  alt={habitacionSeleccionada?.imagenes[0]?.filename}
                />
                <img
                  className="max-h-96 object-cover"
                  src={`${import.meta.env.VITE_BACKEND_URL}/api/img/${
                    habitacionSeleccionada?.imagenes[1]?.filename
                  }`}
                  alt={habitacionSeleccionada?.imagenes[1]?.filename}
                />
              </Slider>

              <div className="text-center lg:text-right">
                <h1 className="text-2xl text-gray-600">
                  {habitacionSeleccionada.direccion}
                </h1>
                <p className="text-gray-600">{habitacionSeleccionada.estado}</p>
                <p className="text-gray-600">{habitacionSeleccionada.ciudad}</p>
                <p className="text-gray-600">
                  {habitacionSeleccionada.descripcion}
                </p>
                <p>${habitacionSeleccionada.precio}</p>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
