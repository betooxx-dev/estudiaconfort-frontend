import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oooops!</h1>
      <p>Lo sentimos! Ocurrió un error dentro de la pagina</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
