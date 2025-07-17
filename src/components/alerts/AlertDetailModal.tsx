import React from 'react';
import { FiX, FiMapPin, FiClock, FiAlertTriangle } from 'react-icons/fi';
import SeverityBadge from './SeverityBadge'; // Reutilizamos el componente

// Componente para una línea de información
const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-start py-3">
    <div className="text-red-500 mt-1 mr-3">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

export default function AlertDetailModal({ alert, onClose }) {
  if (!alert) return null;

  return (
    // Overlay con efecto de desenfoque
    <div 
      className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in"
      onClick={onClose}
    >
      {/* Contenedor del Modal */}
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-md m-4 relative transform transition-all duration-300 animate-slide-in-up overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-2 bg-red-600"></div>
        <div className="p-6">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800">
            <FiX size={24} />
          </button>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-100 rounded-full text-red-600">
              <FiAlertTriangle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{alert.tipo}</h2>
              <SeverityBadge severity={alert.severidad} />
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            <DetailRow 
              icon={<FiMapPin size={16} />}
              label="Ubicación (Nodo)"
              value={alert.nodo.nombre}
            />
            <DetailRow 
              icon={<FiClock size={16} />}
              label="Fecha y Hora del Evento"
              value={new Date(alert.hora).toLocaleString('es-MX', { dateStyle: 'long', timeStyle: 'short' })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
