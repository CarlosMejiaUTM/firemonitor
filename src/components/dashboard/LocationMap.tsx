function LocationMap() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Ubicación del Nodo Activo</h2>
      
      {/* MEJORA: Contenedor del mapa con fondo oscuro para un look "tech" y mejor contraste. */}
      <div className="relative bg-slate-800 aspect-video rounded-lg overflow-hidden flex-grow">
        
        {/* MEJORA: Parrilla con líneas discontinuas y un color sutil. */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-px h-full border-l border-slate-600 border-dashed"></div>
          <div className="absolute top-0 left-2/4 w-px h-full border-l border-slate-600 border-dashed"></div>
          <div className="absolute top-0 left-3/4 w-px h-full border-l border-slate-600 border-dashed"></div>
          <div className="absolute left-0 top-1/4 h-px w-full border-t border-slate-600 border-dashed"></div>
          <div className="absolute left-0 top-2/4 h-px w-full border-t border-slate-600 border-dashed"></div>
          <div className="absolute left-0 top-3/4 h-px w-full border-t border-slate-600 border-dashed"></div>
        </div>

        {/* --- Nodos --- */}
        {/* MEJORA: Nodos secundarios con un verde más brillante para el fondo oscuro. */}
        <div className="absolute w-3 h-3 bg-emerald-400 rounded-full" style={{ top: '65%', left: '65%', transform: 'translate(-50%, -50%)' }}></div>
        <div className="absolute w-3 h-3 bg-emerald-400 rounded-full" style={{ top: '20%', left: '75%', transform: 'translate(-50%, -50%)' }}></div>
        <div className="absolute w-3 h-3 bg-emerald-400 rounded-full" style={{ top: '25%', left: '25%', transform: 'translate(-50%, -50%)' }}></div>
        
        {/* MEJORA: Nodo principal con animación de pulso para atraer la atención. */}
        <div className="absolute" style={{ top: '50%', left: '50%' }}>
          {/* Pulso animado (capa de atrás) */}
          <div className="absolute w-6 h-6 bg-red-500/50 rounded-full animate-ping -translate-x-1/2 -translate-y-1/2"></div>
          {/* Punto central (capa de adelante) */}
          <div className="relative w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* MEJORA: Coordenadas con tipografía monoespaciada para un look más técnico. */}
        <div className="absolute bottom-2 right-2 text-xs text-slate-300 bg-slate-900/50 px-2 py-1 rounded font-mono">
          Lat: 20.9756, Lng: -89.6201
        </div>
      </div>
    </div>
  );
}

export default LocationMap;