import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useEstudiantes from "../hooks/useEstudiantes";
import CargandoJR from "../components/CargandoJR";
import Slider from "react-slick";
import Swal from "sweetalert2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HabitacionSeleccionada() {
  const { id_habitacion } = useParams();
  const {
    obtenerHabitacionSeleccionada,
    habitacionSeleccionada,
    enviarSolicitud,
    datosPersonales,
  } = useEstudiantes();
  const [cargandoImagenes, setCargandoImagenes] = useState(true);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const send = async () => {
    if (Object.keys(datosPersonales).length === 0) {
      Swal.fire({
        title: "Debes completar tus datos personales",
        icon: "error",
      });
      return;
    }
    const { isConfirmed } = await Swal.fire({
      text: "¿Deseas enviar una solicitud para rentar esta habitación?",
      icon: "warning",
      iconColor: "#1088ca",
      showCancelButton: true,
      confirmButtonColor: "#052d58",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Enviar solicitud",
    });
    if (!isConfirmed) return;

    enviarSolicitud({
      id_creador: habitacionSeleccionada.id_creador,
      id_habitacion: habitacionSeleccionada.id,
    });
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
    <main className="flex flex-col gap-10 py-5">
      <h1 className="text-center text-4xl text-gray-600">
        Conoce tu nueva habitación
      </h1>
      <div className="flex items-center justify-around flex-col xl:flex-row">
        {cargandoImagenes ? (
          <CargandoJR />
        ) : (
          <>
            <Slider className=" w-full xl:w-1/2" settings={settings}>
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

            <div className="flex flex-col mt-10 xl:mt-0">
              <h1 className="text-2xl text-gray-600">
                {habitacionSeleccionada.direccion}
              </h1>
              <p className="text-gray-600">{habitacionSeleccionada.estado}</p>
              <p className="text-gray-600">{habitacionSeleccionada.ciudad}</p>
              <p className="text-gray-600">
                {habitacionSeleccionada.descripcion}
              </p>
              <p>${habitacionSeleccionada.precio}</p>
              {habitacionSeleccionada.estado === "disponible" && (
                <button
                  onClick={send}
                  className="p-4 mt-2 xl:w-[250px]  bg-blue-950 rounded text-white font-semibold flex items-center justify-center gap-6"
                >
                  Enviar solicitud{" "}
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.922 11.76a1.56 1.56 0 0 0-.551-1.208L11.264 6.3a1.35 1.35 0 0 0-1.473-.2 1.542 1.542 0 0 0-.872 1.427v1.221a6.922 6.922 0 0 0-6 7.134v1.33A1.225 1.225 0 0 0 4.143 18.5a1.187 1.187 0 0 0 1.08-.73 4.72 4.72 0 0 1 3.7-2.868v1.085a1.546 1.546 0 0 0 .872 1.428 1.355 1.355 0 0 0 1.472-.2l5.108-4.25a1.56 1.56 0 0 0 .547-1.206Z" />
                    <path d="m21.428 10.205-5.517-4.949a1 1 0 1 0-1.336 1.488l5.517 5.014-5.611 5.088a1 1 0 1 0 1.344 1.482l5.611-5.088a2.049 2.049 0 0 0-.008-3.035Z" />
                  </svg>
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
