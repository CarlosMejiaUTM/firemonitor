import React, { useState } from 'react';
import { FiChevronDown, FiEdit, FiTrash2 } from 'react-icons/fi';
import NodeHistory from './NodeHistory'; // Reutilizamos el componente de historial

// Configuración visual para el estado del nodo
const statusConfig = {
  alerta: { text: 'Alerta', color: 'bg-red-100 text-red-800 border-red-500' },
  activo: { text: 'Activo', color: 'bg-green-100 text-green-800 border-green-500' },
  inactivo: { text: 'Inactivo', color: 'bg-gray-200 text-gray-800 border-gray-500' },
};

export default function NodeListItem({ node, users, onAssign, onEdit, onDelete, onViewDetails }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(node.userId || '');

  const statusInfo = statusConfig[node.status] || statusConfig.inactivo;
  const owner = users.find(user => user.id === node.userId);
  const ownerName = owner ? `${owner.nombre} ${owner.apellido}` : 'Sin asignar';

  const handleAssignClick = (e) => {
    e.stopPropagation(); // Evita que el panel se cierre al hacer clic en el botón
    if (!selectedUserId) {
      alert("Por favor, selecciona un usuario.");
      return;
    }
    onAssign(node.id, selectedUserId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-3 overflow-hidden transition-all duration-300">
      {/* Fila Principal (Siempre visible y clickeable para expandir) */}
      <div 
        className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={`w-2 h-10 rounded-full mr-4 ${statusInfo.color}`}></div>
        <div className="flex-1">
          <p className="font-bold text-gray-900">{node.nombre}</p>
          <p className="text-xs text-gray-500">
            Dueño Actual: <span className="font-semibold text-gray-700">{ownerName}</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={(e) => { e.stopPropagation(); onViewDetails(node); }}
            className="text-sm text-red-600 hover:underline"
          >
            Ver Detalles
          </button>
          <FiChevronDown className={`text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {/* Panel de Detalles y Gestión (Expandible con animación) */}
      <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
        <div className="border-t border-gray-200 p-4 space-y-4">
          {/* Sección de Asignación */}
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Reasignar a:</label>
              <select 
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-full text-sm bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">-- Seleccionar Usuario --</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.nombre} {user.apellido}</option>
                ))}
              </select>
            </div>
            <button onClick={handleAssignClick} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700">
              Guardar
            </button>
          </div>
          
          {/* Historial del Nodo */}
          {node.tipo === 'sensor' && <NodeHistory nodeId={node.id} />}

          {/* Botones de Acción */}
          <div className="flex justify-end gap-4 pt-2">
             <button onClick={() => onEdit(node)} className="text-sm flex items-center gap-1 text-gray-600 hover:text-black">
                <FiEdit size={14}/> Editar Nodo
             </button>
             <button onClick={() => onDelete(node.id)} className="text-sm flex items-center gap-1 text-red-600 hover:text-red-800">
                <FiTrash2 size={14}/> Eliminar Nodo
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
