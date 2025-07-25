import React, { useState } from 'react';
import { FiChevronDown, FiEdit, FiTrash2, FiEye, FiCpu } from 'react-icons/fi';
import NodeHistory from './NodeHistory'; // Reutilizamos el componente de historial mejorado

// Componente para la Insignia de Estado
const StatusBadge = ({ status }) => {
  const statusConfig = {
    alerta: { text: 'Alerta', classes: 'bg-red-100 text-red-800' },
    activo: { text: 'Activo', classes: 'bg-green-100 text-green-800' },
    inactivo: { text: 'Inactivo', classes: 'bg-gray-200 text-gray-700' },
  };
  const config = statusConfig[status] || statusConfig.inactivo;
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${config.classes}`}>
      {config.text}
    </span>
  );
};

export default function NodeListItem({ node, users, onAssign, onEdit, onDelete, onViewDetails }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(node.userId || '');
  const [error, setError] = useState('');

  const owner = users.find(user => user.id === node.userId);
  const ownerName = owner ? `${owner.nombre} ${owner.apellido}` : 'Sin asignar';

  const handleAssignClick = (e) => {
    e.stopPropagation();
    if (!selectedUserId) {
      setError("Por favor, selecciona un usuario.");
      return;
    }
    onAssign(node.id, selectedUserId);
  };

  const handleSelectChange = (e) => {
    e.stopPropagation();
    setError('');
    setSelectedUserId(e.target.value);
  }

  return (
    // MEJORA: El contenedor principal ya no es una tarjeta, sino una fila dentro de una lista.
    <div className="bg-white hover:bg-slate-50 transition-colors">
      {/* Fila Principal con Grid Responsivo */}
      <div 
        className="grid grid-cols-2 md:grid-cols-12 gap-4 items-center p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Columna: Nodo */}
        <div className="md:col-span-4 flex items-center gap-3 col-span-2">
          <FiCpu className="h-6 w-6 text-red-500 flex-shrink-0" />
          <div>
            <p className="font-bold text-gray-900">{node.nombre}</p>
            <p className="text-xs text-gray-500 capitalize">{node.tipo}</p>
          </div>
        </div>

        {/* Columna: Dueño */}
        <div className="md:col-span-3">
          <p className="text-sm text-gray-500 font-medium md:hidden">Dueño:</p>
          <p className="text-sm text-gray-800">{ownerName}</p>
        </div>

        {/* Columna: Estado */}
        <div className="md:col-span-2">
           <p className="text-sm text-gray-500 font-medium md:hidden">Estado:</p>
          <StatusBadge status={node.status} />
        </div>

        {/* Columna: Acciones */}
        <div className="md:col-span-3 flex items-center justify-end gap-2 col-span-2">
          <button onClick={(e) => { e.stopPropagation(); onViewDetails(node); }} className="p-2 text-gray-500 hover:bg-gray-200 rounded-full" title="Ver Detalles"><FiEye /></button>
          <button onClick={(e) => { e.stopPropagation(); onEdit(node); }} className="p-2 text-gray-500 hover:bg-gray-200 rounded-full" title="Editar"><FiEdit /></button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(node.id); }} className="p-2 text-gray-500 hover:bg-red-100 hover:text-red-600 rounded-full" title="Eliminar"><FiTrash2 /></button>
          <button className="p-2 text-gray-500 rounded-full">
            <FiChevronDown className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Panel Expandible */}
      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
        <div className="border-t border-gray-200 p-4 md:px-6 md:py-4 space-y-4 bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sección de Asignación */}
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Reasignar Nodo</label>
              <div className="flex items-center gap-2">
                <select 
                  value={selectedUserId}
                  onChange={handleSelectChange}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full text-sm bg-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">-- Seleccionar Usuario --</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.nombre} {user.apellido}</option>
                  ))}
                </select>
                <button onClick={handleAssignClick} disabled={!selectedUserId} className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700 disabled:bg-red-300">
                  Guardar
                </button>
              </div>
              {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            </div>
            
            {/* Historial del Nodo (solo si es sensor) */}
            {node.tipo === 'sensor' ? (
              <div className="md:border-l md:pl-6 border-gray-200">
                <NodeHistory nodeId={node.id} />
              </div>
            ) : (
              <div className="flex items-center justify-center text-sm text-gray-500 h-full">
                Este nodo no genera historial de alertas.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}