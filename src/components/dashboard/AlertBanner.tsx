// Icono de Alerta (puedes usar una librería como react-icons o un SVG)
const AlertIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);


function AlertBanner() {
  return (
    <div className="bg-red-600 text-white p-4 rounded-lg flex items-center justify-between shadow-lg">
      <div className="flex items-center">
        <AlertIcon />
        <div>
          <h3 className="font-bold">¡ALERTA! Fuego detectado</h3>
          <p className="text-sm">Se ha detectado fuego en tu nodo. Revisa los detalles.</p>
        </div>
      </div>
      <button className="bg-white text-red-600 font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
        Ver detalles
      </button>
    </div>
  );
}

export default AlertBanner;