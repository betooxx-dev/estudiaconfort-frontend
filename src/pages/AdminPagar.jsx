import { useEffect, useState } from "react";
import useEstudiantes from "../hooks/useEstudiantes";
import ListaPagos from "../components/admin/ListaPagos";
import { obtenerFecha, obtenerNombreMes, listaMeses } from "../helpers";

export default function AdminPagar() {
  const { obtenerPagos, listaPagos } = useEstudiantes();
  const [total, setTotal] = useState("");
  const [filtro, setFiltro] = useState("");
  const [pagosFiltrados, setPagosFiltrados] = useState([]);

  useEffect(() => {
    obtenerPagos();
  }, []);

  useEffect(() => {
    let suma = 0;
    listaPagos.forEach((pago) => {
      suma += pago.monto;
    });

    const totalFormateado = suma.toLocaleString({
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
    });

    setTotal(totalFormateado);
  }, [listaPagos]);

  useEffect(() => {
    if (filtro === "") {
      let suma = 0;
      listaPagos.forEach((pago) => {
        suma += pago.monto;
      });

      const totalFormateado = suma.toLocaleString({
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
      });

      setTotal(totalFormateado);
      return;
    }

    const filtroMes = filtro.toLowerCase();

    const filtrados = listaPagos.filter((pago) => {
      const fechaPago = new Date(pago.fecha);
      const nombreMesPago = obtenerNombreMes(
        fechaPago.getMonth()
      ).toLowerCase();

      return nombreMesPago.includes(filtroMes);
    });

    setPagosFiltrados(filtrados);
  }, [filtro]);

  useEffect(() => {
    if (filtro === "") return;
    let suma = 0;
    pagosFiltrados.forEach((pago) => {
      suma += pago.monto;
    });

    const totalFormateado = suma.toLocaleString({
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
    });

    setTotal(totalFormateado);
  }, [pagosFiltrados]);

  return (
    <div className="bg-slate-100 m-10 p-5 flex flex-col items-center gap-5">
      <h1 className="text-2xl text-gray-600">Total de ingresos: ${total}</h1>

      <select
        className="text-center w-[250px] py-2"
        onChange={(e) => setFiltro(e.target.value)}
      >
        <option value="">Todos</option>
        {listaMeses().map((mes, index) => (
          <option key={index} value={mes.toLowerCase()}>
            {mes.toUpperCase()}
          </option>
        ))}
      </select>

      {filtro.length === 0
        ? listaPagos.map((pago) => (
            <ListaPagos
              key={pago.id}
              nombre={pago.nombre}
              fecha={obtenerFecha(pago.fecha)}
              direccion={pago.direccion}
              monto={pago.monto}
            />
          ))
        : pagosFiltrados.map((pago) => (
            <ListaPagos
              key={pago.id}
              nombre={pago.nombre}
              fecha={obtenerFecha(pago.fecha)}
              direccion={pago.direccion}
              monto={pago.monto}
            />
          ))}
    </div>
  );
}
