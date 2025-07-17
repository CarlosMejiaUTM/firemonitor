// src/components/map/MapLegend.tsx

export default function MapLegend() {
  return (
    <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Leyenda</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-green-500 border-2 border-green-700"></div>
          <span className="text-sm">Nodo Activo</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-gray-400 border-2 border-gray-600"></div>
          <span className="text-sm">Nodo Inactivo</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xs">!</div>
          <span className="text-sm">Alerta de Fuego</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-orange-400 flex items-center justify-center text-white">
            <span className="text-xs">🌡</span>
          </div>
          <span className="text-sm">Alerta de Temperatura</span>
        </div>
      </div>
    </div>
  );
}