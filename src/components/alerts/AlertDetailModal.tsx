import React from 'react';
import { FiX, FiMapPin, FiClock, FiAlertTriangle, FiUserCheck, FiCpu, FiFileText } from 'react-icons/fi';
import SeverityBadge from './SeverityBadge'; 

// El componente DetailRow no necesita cambios, es perfectamente reutilizable.
const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-start py-3">
    <div className="flex-shrink-0 text-red-500 mt-1 mr-4">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-gray-800 break-words">{value || 'No disponible'}</p>
    </div>
  </div>
);

// MEJORA: Se añade 'users' a los props para poder mostrar quién atendió la alerta.
export default function AlertDetailModal({ alert, users, onClose }) {
  if (!alert) return null;

  // Lógica para encontrar el nombre del usuario que atendió la alerta.
  const acknowledgedByUser = alert.acknowledgedBy 
    ? users.find(u => u.id === alert.acknowledgedBy) 
    : null;

  return (
    // El overlay y la animación base son excelentes, se mantienen.
    <div 
      className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-lg relative transform transition-all duration-300 animate-slide-in-up flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado del Modal */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 p-3 bg-red-100 rounded-full text-red-600">
              <FiAlertTriangle size={24} />
            </div>
            <div className="flex-grow">
              <SeverityBadge severity={alert.severidad} />
              <h2 className="text-xl font-bold text-gray-900 mt-1">{alert.tipo}</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-800 flex-shrink-0">
              <FiX size={24} />
            </button>
          </div>
        </div>

        {/* Cuerpo del Modal con más detalles */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
          {/* MEJORA: Se agrupan los detalles en secciones para mayor claridad. */}
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Detalles del Evento</h3>
            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
              <DetailRow 
                icon={<FiClock size={18} />}
                label="Fecha y Hora del Evento"
                value={new Date(alert.hora).toLocaleString('es-MX', { dateStyle: 'long', timeStyle: 'short', hour12: true })}
              />
              <DetailRow 
                icon={<FiCpu size={18} />}
                label="ID del Sensor"
                value={alert.sensorId}
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Ubicación</h3>
            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
              <DetailRow 
                icon={<FiMapPin size={18} />}
                label="Nodo de Detección"
                value={alert.nodo.nombre}
              />
              <DetailRow 
                icon={<FiFileText size={18} />}
                label="Descripción del Nodo"
                value={alert.nodo.descripcion}
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Estado de la Alerta</h3>
            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
              <DetailRow 
                icon={<FiUserCheck size={18} />}
                label="Atendida por"
                value={acknowledgedByUser ? `${acknowledgedByUser.nombre} ${acknowledgedByUser.apellido}` : 'Aún no atendida'}
              />
              {alert.acknowledgedAt && (
                <DetailRow 
                  icon={<FiClock size={18} />}
                  label="Fecha de Atención"
                  value={new Date(alert.acknowledgedAt).toLocaleString('es-MX', { dateStyle: 'long', timeStyle: 'short', hour12: true })}
                />
              )}
            </div>
          </div>
        </div>

        {/* MEJORA: Footer con un botón de cierre claro y explícito. */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-right">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-300"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}