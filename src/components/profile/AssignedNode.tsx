// src/components/profile/AssignedNode.tsx

export default function AssignedNode() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Nodo asignado</h2>
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <p className="font-semibold text-gray-900">Nodo Base Norte</p>
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Activo</span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Última lectura</p>
            <p className="text-gray-900 font-medium">12/06/2023 14:35</p>
          </div>
          <div>
            <p className="text-gray-500">Estado actual</p>
            <p className="text-red-600 font-medium">Alerta de fuego</p>
          </div>
          <div>
            <p className="text-gray-500">Ubicación</p>
            <p className="text-gray-900 font-medium">Lat: 20.9756, Lng: -89.6201</p>
          </div>
        </div>
      </div>
    </div>
  );
}