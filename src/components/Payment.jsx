import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useEstudiantes from "../hooks/useEstudiantes";
import { useState } from "react";
import Swal from "sweetalert2";
export default function Payment({ monto, id_habitacion, id_creador }) {
  const { pagoEstudiante } = useEstudiantes();
  const stripe = useStripe();
  const elements = useElements();
  const [nombre, setNombre] = useState("");

  const pagar = async () => {
    if (!nombre) {
      Swal.fire({
        title: "Debes introducir el nombre del propietario de la tarjeta",
        icon: "warning",
        iconColor: "#1088ca",
      });
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      alert("Ocurrio un error");
      return;
    }

    monto *= 100;

    const { id } = paymentMethod;

    pagoEstudiante({ id, amount: monto, id_creador }, id_habitacion);
    elements.getElement(CardElement).clear();
  };

  return (
    <main>
      <div className="bg-slate-100 py-5">
        <div className="flex flex-col items-center gap-2 mx-20">
          <h2 className=" text-2xl text-gray-600">Pagar habitación</h2>
          <p className="text-md text-gray-600">
            Nombre del propietario de la tarjeta
          </p>
          <input
            onChange={(e) => setNombre(e.target.value)}
            className="text-center focus:outline-white w-full py-2 shadow text-sm"
            type="text"
            placeholder="Nombre completo"
          />
        </div>

        <div className="bg-gray-100 mx-10 flex flex-col gap-2 p-10 rounded">
          <h1 className="text-sm font-semibold text-gray-500">
            Introduzca sus datos bancarios
          </h1>
          <div className="bg-slate-200 p-4 rounded ">
            <CardElement />
          </div>

          <div className="flex justify-center">
            <button
              onClick={pagar}
              className="text-white bg-blue-600 w-32 py-2 rounded "
            >
              Pagar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
