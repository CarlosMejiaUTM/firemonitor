import React, { useState } from 'react';
import { FiChevronDown, FiEdit, FiTrash2, FiMail, FiCpu, FiMapPin } from 'react-icons/fi';

// Componente para una sola fila de la lista de usuarios
export default function UserManagementListItem({ user, assignedNodes, onEdit, onDelete, onSendRecovery }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md mb-3 overflow-hidden transition-all duration-300">
      {/* Fila Principal (Siempre visible y clickeable para expandir) */}
      <div 
        className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Avatar e Info Principal */}
        <div className="flex-1 flex items-center gap-4">
          <img 
            src={`https://ui-avatars.com/api/?name=${user.nombre}+${user.apellido}&background=random`} 
            alt="Avatar" 
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-bold text-gray-900">{user.nombre} {user.apellido}</p>
            <p className="text-xs text-gray-500">
              Usuario: <span className="font-semibold">{user.usuario}</span> | Rol: <span className="font-semibold capitalize">{user.role}</span>
            </p>
          </div>
        </div>
        {/* Info Resumida y Flecha */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 font-medium hidden sm:block">{assignedNodes.length} Nodos</span>
          <FiChevronDown className={`text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {/* Panel de Detalles y Gestión (Expandible con animación) */}
      <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
        <div className="border-t border-gray-200 p-4 space-y-4">
          {/* Nodos Asignados */}
          <div>
            <h4 className="font-semibold text-sm text-gray-800 mb-2">Nodos Asignados:</h4>
            {assignedNodes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {assignedNodes.map(node => (
                  <div key={node.id} className="bg-gray-50 p-2 rounded-md text-sm text-gray-700 flex items-center">
                    <FiCpu className="inline mr-2 text-gray-500" />
                    <div className="flex-1">
                      <span className="font-semibold">{node.nombre}</span> ({node.tipo})
                      <div className="text-xs text-gray-400 flex items-center">
                        <FiMapPin size={12} className="mr-1" /> {node.coordenadas?.lat}, {node.coordenadas?.lng}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Este usuario no tiene nodos asignados.</p>
            )}
          </div>
          
          {/* Botones de Acción */}
          <div className="flex justify-end gap-4 pt-2 border-t mt-4">
             <button onClick={() => onSendRecovery(user.correo)} className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold">
                <FiMail size={14}/> Enviar Recuperación
             </button>
             <button onClick={() => onEdit(user)} className="text-sm flex items-center gap-1 text-gray-600 hover:text-black font-semibold">
                <FiEdit size={14}/> Editar Usuario
             </button>
             <button onClick={() => onDelete(user.id)} className="text-sm flex items-center gap-1 text-red-600 hover:text-red-800 font-semibold">
                <FiTrash2 size={14}/> Eliminar Usuario
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
