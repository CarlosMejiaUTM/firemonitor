import React, { useState } from 'react';
import { FiCpu, FiShare2 } from 'react-icons/fi';

// Componente auxiliar para el Avatar (mejorado para ser más seguro)
const UserAvatar = ({ owner }) => {
  const getInitials = () => {
    if (!owner) return 'NA';
    const nameInitial = owner.nombre ? owner.nombre.charAt(0) : '';
    const lastNameInitial = owner.apellido ? owner.apellido.charAt(0) : '';
    return `${nameInitial}${lastNameInitial}` || 'NA';
  };

  return (
    <div className="flex items-center gap-2">
      <img
        className="h-6 w-6 rounded-full object-cover"
        src={`https://ui-avatars.com/api/?name=${getInitials()}&background=random&color=fff&bold=true`}
        alt={owner ? `${owner.nombre} ${owner.apellido}` : 'Sin asignar'}
      />
      <span className="text-sm text-gray-600">{owner ? `${owner.nombre} ${owner.apellido}` : 'Ninguno'}</span>
    </div>
  );
};

// --- Componente Principal Corregido ---
// Se revierte al patrón original donde el componente padre maneja la llamada a la API.
export default function NodeAssignmentRow({ node, users, onAssign, isAssigning }) {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [error, setError] = useState('');

  const owner = users.find(user => user.id === node.userId);

  const handleAssignClick = () => {
    if (!selectedUserId) {
      setError("Debes seleccionar un usuario.");
      return;
    }
    setError('');
    // ✅ Se llama a la función del padre, que se encargará de la lógica de la API.
    // Pasamos el ID del nodo y el ID del usuario seleccionado.
    onAssign(node.id, selectedUserId); 
  };
  
  const handleSelectChange = (e) => {
    setError(''); // Limpiar error al cambiar la selección
    setSelectedUserId(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 gap-4 border-b">
      {/* --- Información del Nodo --- */}
      <div className="flex-1 w-full md:w-auto">
        <div className="flex items-center gap-3">
          <FiCpu className="h-6 w-6 text-gray-400" />
          <div>
            <p className="font-bold text-gray-800">{node.nombre}</p>
            <p className="text-xs text-gray-500 capitalize">{node.tipo}</p>
          </div>
        </div>
        <div className="mt-2 pl-9">
          <span className="text-xs font-semibold text-gray-400">DUEÑO ACTUAL:</span>
          <UserAvatar owner={owner} />
        </div>
      </div>
      
      {/* --- Controles de Asignación --- */}
      <div className="w-full md:w-auto md:min-w-[400px]">
        <div className="flex items-center gap-2">
          <select 
            value={selectedUserId}
            onChange={handleSelectChange}
            className="flex-grow text-sm bg-white border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Asignar a...</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.nombre} {user.apellido} ({user.usuario})</option>
            ))}
          </select>
          <button 
            onClick={handleAssignClick}
            // El estado de carga y deshabilitado es controlado por el componente padre.
            disabled={!selectedUserId || isAssigning}
            className="flex-shrink-0 flex items-center justify-center bg-red-600 text-white px-4 h-[42px] w-32 rounded-md text-sm font-semibold hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed transition-colors"
          >
            {isAssigning ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
              <>
                <FiShare2 className="mr-2" size={14} /> Asignar
              </>
            )}
          </button>
        </div>
        {error && <p className="text-xs text-red-500 mt-1 pl-1">{error}</p>}
      </div>
    </div>
  );
}
