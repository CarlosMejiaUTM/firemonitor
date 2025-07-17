import React from 'react';
import { Link } from 'react-router-dom'; // 1. Importamos el componente Link
import { FiX, FiThermometer, FiDroplet, FiWind, FiAlertTriangle } from 'react-icons/fi';

// Mapeo de status a colores y texto
const statusConfig = {
  alerta: { text: 'Alerta', color: 'bg-red-100 text-red-800' },
  activo: { text: 'Activo', color: 'bg-green-100 text-green-800' },
  inactivo: { text: 'Inactivo', color: 'bg-gray-200 text-gray-800' },
};

// 2. El componente InfoCard ahora puede ser un enlace si recibe el prop 'linkTo'
const InfoCard = ({ icon, title, value, unit, iconBgColor = 'bg-gray-200', iconColor = 'text-gray-800', linkTo = null }) => {
  const cardContent = (
    <div className="bg-gray-50 p-4 rounded-lg text-center transition-transform hover:scale-105 duration-200 h-full flex flex-col justify-center">
      <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${iconBgColor} ${iconColor}`}>
        {icon}
      </div>
      <p className="mt-2 text-sm text-gray-600">{title}</p>
      <p className="text-xl font-bold text-gray-900">{value}{unit}</p>
    </div>
  );

  // Si se proporciona un enlace, envolvemos la tarjeta en un componente Link
  if (linkTo) {
    return <Link to={linkTo}>{cardContent}</Link>;
  }

  return cardContent;
};


export default function NodeDetailModal({ node, onClose }) {
  if (!node) return null;

  const statusInfo = statusConfig[node.status] || statusConfig.inactivo;
  const { ultimaLectura, ultimaActualizacion } = node;

  return (
    // Fondo con efecto de desenfoque
    <div 
      className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Contenedor del Modal */}
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-lg m-4 relative transform transition-all duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Acento de color en la parte superior */}
        <div className="h-2 bg-red-600"></div>

        <div className="p-6">
          {/* Botón de Cerrar */}
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors">
            <FiX size={24} />
          </button>

          {/* Encabezado */}
          <div className="border-b pb-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{node.nombre}</h2>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <span className={`px-3 py-1 rounded-full font-semibold ${statusInfo.color}`}>
                {statusInfo.text}
              </span>
              <span className="text-gray-500">Tipo: <span className="font-semibold text-gray-700 capitalize">{node.tipo}</span></span>
            </div>
          </div>

          {/* Cuerpo con los datos */}
          {node.tipo === 'sensor' && ultimaLectura ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InfoCard 
                icon={<FiThermometer size={24}/>} 
                title="Temperatura" 
                value={ultimaLectura.temperatura} 
                unit="°C"
                iconBgColor="bg-blue-100"
                iconColor="text-blue-600"
              />
              <InfoCard 
                icon={<FiDroplet size={24}/>} 
                title="Humedad" 
                value={ultimaLectura.humedad} 
                unit="%"
                iconBgColor="bg-sky-100"
                iconColor="text-sky-600"
              />
              {/* 3. Pasamos el prop 'linkTo' a las tarjetas de alerta */}
              <InfoCard 
                icon={<FiWind size={24}/>} 
                title="Humo" 
                value={ultimaLectura.humoDetectado ? 'Sí' : 'No'} 
                iconBgColor={ultimaLectura.humoDetectado ? 'bg-orange-100' : 'bg-gray-200'}
                iconColor={ultimaLectura.humoDetectado ? 'text-orange-600' : 'text-gray-600'}
                linkTo="/alertas"
              />
              <InfoCard 
                icon={<FiAlertTriangle size={24}/>} 
                title="Fuego" 
                value={ultimaLectura.fuegoDetectado ? 'Sí' : 'No'}
                iconBgColor={ultimaLectura.fuegoDetectado ? 'bg-red-100' : 'bg-gray-200'}
                iconColor={ultimaLectura.fuegoDetectado ? 'text-red-600' : 'text-gray-600'}
                linkTo="/alertas"
              />
            </div>
          ) : (
            <p className="text-center text-gray-600 py-8">Este nodo no reporta datos de sensores.</p>
          )}
          
          <div className="text-center mt-6 text-xs text-gray-400">
            Última actualización: {ultimaActualizacion ? new Date(ultimaActualizacion).toLocaleString('es-MX') : 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
}
