import useEstudiantes from "../hooks/useEstudiantes";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "../components/Payment";
import Cargando from "../components/Cargando";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_KEY_STRIPE);

export default function ModalPagoUsuario({
  setModal,
  monto,
  id_habitacion,
  id_creador,
}) {
  const { cargando } = useEstudiantes();

  return (
    <div
      className="animate-entrada fixed h-full w-full flex items-center justify-center z-10 flex-col 
    bg-gradient-to-r from-slate-800 to-slate-600
    "
    >
      {cargando && <Cargando />}
      <button
        className="absolute top-5 right-5 text-white bg-slate-900 px-10 py-2 rounded"
        onClick={() => setModal(false)}
      >
        Cerrar
      </button>
      <div className="w-[1000px]">
        <Elements stripe={stripePromise}>
          <Payment
            monto={monto}
            id_habitacion={id_habitacion}
            id_creador={id_creador}
          />
        </Elements>
      </div>
    </div>
  );
}
