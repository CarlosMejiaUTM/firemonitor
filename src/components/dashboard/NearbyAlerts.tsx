import AlertItem from './AlertItem';
import { Link } from 'react-router-dom';
import { FiShield } from 'react-icons/fi';

export default function NearbyAlerts({ alerts }) {
  // El mapa de tipos es una buena solución, se mantiene.
  const alertTypeMap = {
    'Fuego Detectado': 'flame',
    'Temperatura Elevada': 'temp',
    'Humo Detectado': 'smoke',
    'Concentración de Gas Elevada': 'smoke',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
      {/* MEJORA: Cabecera con flexbox para alinear el título y el nuevo enlace. */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Alertas Activas</h2>
        {/* MEJORA DE UX: Enlace para ver todas las alertas. */}
        <Link 
          to="/alertas" 
          className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
        >
          Ver todas
        </Link>
      </div>

      <div className="flex-grow">
        {alerts && alerts.length > 0 ? (
          // MEJORA: Se usa 'divide-y' para una separación más limpia de los ítems.
          <div className="divide-y divide-gray-100">
            {alerts.slice(0, 3).map((alert) => (
              <AlertItem 
                key={alert.id} 
                type={alertTypeMap[alert.tipo] || 'smoke'}
                reportedBy={alert.nodo.nombre}
                distance="N/A"
                // Formato de hora más amigable (ej: "hace 5 minutos")
                time={new Date(alert.hora).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
              />
            ))}
          </div>
        ) : (
          // MEJORA: Estado vacío más visual y positivo.
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 py-8">
            <FiShield className="w-12 h-12 text-green-500" />
            <h3 className="mt-4 font-semibold text-gray-800">Todo en orden</h3>
            <p className="text-sm">No se han detectado alertas activas.</p>
          </div>
        )}
      </div>
    </div>
  );
}