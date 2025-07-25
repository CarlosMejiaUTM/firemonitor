import React from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiThermometer, FiDroplet, FiWind, FiAlertTriangle, FiCpu, FiClock, FiUser, FiHash } from 'react-icons/fi';

// Mapeo de status, ahora con un ícono para cada uno
const statusConfig = {
  alerta: { text: 'En Alerta', icon: <FiAlertTriangle/>, classes: 'bg-red-100 text-red-800 ring-1 ring-red-200' },
  activo: { text: 'Activo', icon: <div className="h-2 w-2 rounded-full bg-green-500"></div>, classes: 'bg-green-100 text-green-800 ring-1 ring-green-200' },
  inactivo: { text: 'Inactivo', icon: <div className="h-2 w-2 rounded-full bg-gray-500"></div>, classes: 'bg-gray-100 text-gray-700 ring-1 ring-gray-200' },
};

// Componente para tarjetas de información
const InfoCard = ({ icon, title, value, unit, isAlert = false, linkTo = null }) => {
  const alertClasses = isAlert ? 'bg-red-50/50 border-l-4 border-red-500' : 'bg-slate-50';
  const cardContent = (
    <div className={`p-4 rounded-lg h-full flex items-center gap-4 transition-colors ${linkTo ? 'hover:bg-gray-100 cursor-pointer' : ''} ${alertClasses}`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isAlert ? 'bg-red-100 text-red-600' : 'bg-slate-200 text-slate-600'}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <div className={`text-xl font-bold ${isAlert ? 'text-red-700' : 'text-gray-900'}`}>{value}{unit}</div>
      </div>
    </div>
  );
  return linkTo ? <Link to={linkTo}>{cardContent}</Link> : cardContent;
};

// MEJORA: Componente para indicar estados booleanos (Sí/No)
const BooleanIndicator = ({ value }) => (
  <div className="flex items-center gap-2">
    <div className={`h-2.5 w-2.5 rounded-full ${value ? 'bg-red-500' : 'bg-green-500'}`}></div>
    <span className="font-bold">{value ? 'Sí' : 'No'}</span>
  </div>
);


export default function NodeDetailModal({ node, users, onClose }) {
  if (!node) return null;

  const statusInfo = statusConfig[node.status] || statusConfig.inactivo;
  const { ultimaLectura, ultimaActualizacion } = node;
  const owner = users.find(u => u.id === node.userId);

  return (
    <div 
      className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl relative transform transition-all duration-300 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- Encabezado --- */}
        <div className="p-6 flex justify-between items-start border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{node.nombre}</h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm">
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold text-xs ${statusInfo.classes}`}>
                {statusInfo.icon} {statusInfo.text}
              </span>
              <span className="text-gray-500 flex items-center gap-2">
                <FiCpu size={14} /> <span className="font-semibold text-gray-700 capitalize">{node.tipo}</span>
              </span>
              {/* MEJORA: Se muestra el propietario del nodo */}
              <span className="text-gray-500 flex items-center gap-2">
                <FiUser size={14} /> <span className="font-semibold text-gray-700">{owner ? `${owner.nombre} ${owner.apellido}` : 'Sin Asignar'}</span>
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 transition-colors flex-shrink-0 ml-4">
            <FiX size={24} />
          </button>
        </div>

        {/* --- Cuerpo con scroll --- */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* MEJORA: Sección de detalles del dispositivo */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Detalles del Dispositivo</h3>
            <div className="bg-slate-50 p-3 rounded-md text-sm text-gray-600 flex items-center gap-2 font-mono">
              <FiHash size={14} className="text-gray-400"/>
              <span>ID: {node.id}</span>
            </div>
          </div>

          {node.tipo === 'sensor' && ultimaLectura ? (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Últimas Lecturas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard icon={<FiThermometer size={20}/>} title="Temperatura" value={ultimaLectura.temperatura} unit="°C"/>
                <InfoCard icon={<FiDroplet size={20}/>} title="Humedad" value={ultimaLectura.humedad} unit="%"/>
                <InfoCard icon={<FiWind size={20}/>} title="Humo Detectado" value={<BooleanIndicator value={ultimaLectura.humoDetectado}/>} isAlert={ultimaLectura.humoDetectado} linkTo="/alertas"/>
                <InfoCard icon={<FiAlertTriangle size={20}/>} title="Fuego Detectado" value={<BooleanIndicator value={ultimaLectura.fuegoDetectado}/>} isAlert={ultimaLectura.fuegoDetectado} linkTo="/alertas"/>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600 py-8">Este nodo no es un sensor y no reporta lecturas.</p>
          )}
        </div>
        
        {/* --- Pie de Página --- */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 text-center mt-auto flex-shrink-0">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
            <FiClock size={12} />
            Última actualización: {ultimaActualizacion ? new Date(ultimaActualizacion).toLocaleString('es-MX', {dateStyle: 'medium', timeStyle: 'short'}) : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
}