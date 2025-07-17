import SeverityBadge from './SeverityBadge';

// Definimos el tipo de alerta que viene de la API
type ApiAlert = {
  id: string;
  tipo: string;
  hora: string;
  severidad: 'Critica' | 'Alta' | 'Media' | 'Baja';
  nodo: {
    nombre: string;
  };
  userId: string; // ID del dueño del nodo
};

// Definimos un tipo simple para el usuario
type User = {
  id: string;
  nombre: string;
  apellido: string;
};

const alertIcons = {
  'Fuego Detectado': '🔥',
  'Temperatura Elevada': '🌡️',
  'Humo Detectado': '💨',
  'Concentración de Gas Elevada': '⚠️',
};

export default function AlertsTable({ alerts, users, onViewDetails }: { alerts: ApiAlert[], users: User[], onViewDetails: (alert: ApiAlert) => void }) {
  if (!alerts || alerts.length === 0) {
    return <div className="p-8 text-center text-gray-500 bg-white rounded-lg shadow-md">No hay alertas que mostrar.</div>;
  }

  return (

    <div className="block w-full bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Tipo</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Fecha y Hora</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Gravedad</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ubicación</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Dueño del Nodo</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {alerts.map((alert) => {
            const owner = users.find(user => user.id === alert.userId);
            const ownerName = owner ? `${owner.nombre} ${owner.apellido}` : 'Desconocido';

            return (
              <tr key={alert.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{alertIcons[alert.tipo] || '🚨'}</span>
                    <span className="text-sm font-medium text-gray-900">{alert.tipo}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(alert.hora).toLocaleString('es-MX')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <SeverityBadge severity={alert.severidad} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.nodo.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ownerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => onViewDetails(alert)} 
                    className="text-red-600 hover:text-red-900 font-semibold"
                  >
                    Ver detalles
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
