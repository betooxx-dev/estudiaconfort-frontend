export default function ImagenesHabitaciones({
  previewBanio,
  previewImage,
  handleImageChange,
  imagenBanio,
}) {
  return (
    <div className="flex flex-col justify-center">
      <div>
        <label htmlFor="habitacion">Foto de la habitación</label>
        {previewImage && (
          <img
            src={previewImage}
            style={{ maxWidth: "200px", maxHeight: "200px" }}
          />
        )}

        <div className="flex mt-2">
          <input
            type="file"
            id="habitacion"
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          <label
            htmlFor="habitacion"
            className=" inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg
              className="w-5 h-5 mr-2 -ml-1 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            <span>Selecciona una imagen</span>
          </label>
        </div>
      </div>

      <label>Baño</label>
      {previewBanio && (
        <img
          src={previewBanio}
          style={{ maxWidth: "200px", maxHeight: "200px" }}
        />
      )}
      <div className="mt-2">
        <input
          type="file"
          accept="image/*"
          id="banio"
          onChange={imagenBanio}
          className="hidden"
        />
        <label
          htmlFor="banio"
          className=" inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg
            className="w-5 h-5 mr-2 -ml-1 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          <span>Seleccione una Imagen</span>
        </label>
      </div>
    </div>
  );
}
