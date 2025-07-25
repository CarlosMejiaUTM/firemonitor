import SeverityBadge from './SeverityBadge';
import { FiChevronRight } from 'react-icons/fi';

// Tipos (sin cambios)
type ApiAlert = {
  id: string;
  tipo: string;
  hora: string;
  severidad: 'Critica' | 'Alta' | 'Media' | 'Baja';
  nodo: {
    nombre: string;
  };
  userId: string;
};

type User = {
  id: string;
  nombre: string;
  apellido: string;
};

// Objeto de iconos (sin cambios)
const alertIcons = {
  'Fuego Detectado': '🔥',
  'Temperatura Elevada': '🌡️',
  'Humo Detectado': '💨',
  'Concentración de Gas Elevada': '⚠️',
};

// --- Componentes auxiliares para mejorar la legibilidad del código principal ---

// MEJORA: Avatar con iniciales para el dueño del nodo.
const UserAvatar = ({ ownerName }: { ownerName: string }) => {
  const initials = ownerName
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('');
    
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-semibold text-sm">
        {initials}
      </div>
      <span className="text-sm text-gray-600">{ownerName}</span>
    </div>
  );
};

// MEJORA: Formateo de fecha y hora en dos líneas.
const FormattedDateTime = ({ dateString }: { dateString: string }) => {
  const date = new Date(dateString);
  return (
    <div>
      <p className="text-sm text-gray-800 font-medium">{date.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p className="text-xs text-gray-500">{date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
    </div>
  );
};

// --- Componente Principal ---

export default function AlertsTable({ alerts, users, onViewDetails }: { alerts: ApiAlert[], users: User[], onViewDetails: (alert: ApiAlert) => void }) {
  // MEJORA: Se elimina la lógica del estado vacío. El componente padre ahora se encarga de esto.
  
  return (
    // El div contenedor es necesario para el scroll horizontal en pantallas de tamaño intermedio
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        {/* MEJORA: El encabezado se oculta en pantallas pequeñas (móviles) */}
        <thead className="bg-gray-50 hidden md:table-header-group">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Tipo de Alerta</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Fecha y Hora</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Gravedad</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ubicación (Nodo)</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Dueño del Nodo</th>
            <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {alerts.map((alert) => {
            const owner = users.find(user => user.id === alert.userId);
            const ownerName = owner ? `${owner.nombre} ${owner.apellido}` : 'Desconocido';

            return (
              // MEJORA: La fila entera es clickeable y cambia de color en hover.
              // En móvil (block), se ve como una tarjeta. En desktop (md:table-row), como una fila.
              <tr 
                key={alert.id} 
                onClick={() => onViewDetails(alert)} 
                className="block md:table-row border-b md:border-none hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {/* --- Celda Tipo de Alerta --- */}
                <td className="px-6 py-4 whitespace-nowrap block md:table-cell">
                  {/* MEJORA: Etiqueta visible solo en móvil */}
                  <span className="font-bold text-xs text-gray-500 uppercase md:hidden">Tipo: </span>
                  <div className="flex items-center gap-3 mt-1 md:mt-0">
                    <span className="text-2xl">{alertIcons[alert.tipo] || '🚨'}</span>
                    <span className="text-sm font-medium text-gray-900">{alert.tipo}</span>
                  </div>
                </td>
                
                {/* --- Celda Fecha y Hora --- */}
                <td className="px-6 py-4 whitespace-nowrap block md:table-cell">
                  <span className="font-bold text-xs text-gray-500 uppercase md:hidden">Fecha: </span>
                  <FormattedDateTime dateString={alert.hora} />
                </td>

                {/* --- Celda Gravedad --- */}
                <td className="px-6 py-4 whitespace-nowrap block md:table-cell">
                  <span className="font-bold text-xs text-gray-500 uppercase md:hidden">Gravedad: </span>
                  <SeverityBadge severity={alert.severidad} />
                </td>

                {/* --- Celda Ubicación --- */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium block md:table-cell">
                  <span className="font-bold text-xs text-gray-500 uppercase md:hidden">Ubicación: </span>
                  {alert.nodo.nombre}
                </td>

                {/* --- Celda Dueño del Nodo --- */}
                <td className="px-6 py-4 whitespace-nowrap block md:table-cell">
                  <span className="font-bold text-xs text-gray-500 uppercase md:hidden">Dueño: </span>
                  <UserAvatar ownerName={ownerName} />
                </td>

                {/* --- Celda Acciones --- */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium block md:table-cell text-right">
                  <span className="text-gray-400 hover:text-red-600">
                    <FiChevronRight size={20} />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}