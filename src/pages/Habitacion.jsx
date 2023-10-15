import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ModalPagoUsuario from "../components/ModalPagoUsuario";
import useEstudiantes from "../hooks/useEstudiantes";
export default function Habitacion() {
  const [modal, setModal] = useState(false);
  const { habitacion } = useEstudiantes();
  console.log(habitacion);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {modal && (
        <ModalPagoUsuario
          setModal={setModal}
          monto={habitacion.precio}
          id_habitacion={habitacion.id}
          id_creador={habitacion.id_creador}
        />
      )}
      <main className="bg-gradient-to-r from-slate-800 to-slate-600">
        <div className="flex flex-col xl:flex-row-reverse p-10 gap-10 ">
          <Slider className="xl:w-1/2 " {...settings}>
            <img
              className=" h-96 object-cover"
              src={`${import.meta.env.VITE_BACKEND_URL}/api/img/${
                habitacion?.imagen1
              }`}
              alt="imagenes"
            />

            <img
              className=" h-96 object-cover"
              src={`${import.meta.env.VITE_BACKEND_URL}/api/img/${
                habitacion?.imagen2
              }`}
              alt="imagenes-2"
            />
          </Slider>
          <div className="flex flex-col gap-2 text-white ">
            <h1 className="font-semibold text-4xl">Tu Habitación</h1>
            <div className="flex flex-col gap-2">
              <p className="text-2xl">
                {habitacion.direccion + ", " + habitacion.ciudad}
              </p>

              <p className="text-2xl">Capacidad para: {habitacion.capacidad}</p>
              <p className="text-2xl">${habitacion.precio}</p>
            </div>
            <button
              onClick={() => setModal(true)}
              disabled={habitacion.renta === "pendiente" ? false : true}
              className="mt-10  rounded lg:w-40 bg-sky-900 text-center py-4 hover:bg-sky-600 hover:-translate-y-3 text-xl transition-all"
            >
              {habitacion.renta === "pendiente" ? "Pagar" : "Pagado"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
