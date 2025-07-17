import React, { useState } from 'react';

// Componente para una sola fila de la lista
function NodeAssignmentRow({ node, users, onAssign }) {
  const [selectedUserId, setSelectedUserId] = useState('');

  // --- LÓGICA PARA ENCONTRAR EL NOMBRE DEL DUEÑO ---
  // Buscamos en la lista de usuarios el que coincida con el userId del nodo
  const owner = users.find(user => user.id === node.userId);
  // Si encontramos un dueño, mostramos su nombre completo. Si no, 'Ninguno'.
  const ownerName = owner ? `${owner.nombre} ${owner.apellido}` : 'Ninguno';
  // ------------------------------------------------

  const handleAssignClick = () => {
    if (!selectedUserId) {
      alert("Por favor, selecciona un usuario para asignar el nodo.");
      return;
    }
    onAssign(node.id, selectedUserId);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-gray-200 gap-4">
      <div className="flex-1">
        <p className="font-bold text-gray-800">{node.nombre}</p>
        <p className="text-xs text-gray-500">
          Tipo: <span className="font-semibold capitalize">{node.tipo}</span> | Dueño Actual: <span className="font-mono bg-gray-100 px-1 rounded">{ownerName}</span>
        </p>
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
        <select 
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="w-full md:w-48 text-sm bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">Asignar a...</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.nombre} {user.apellido} ({user.usuario})</option>
          ))}
        </select>
        <button 
          onClick={handleAssignClick}
          className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700"
        >
          Asignar
        </button>
      </div>
    </div>
  );
}

// Componente principal que renderiza la lista completa
export default function NodeAssignmentList({ nodes, users, onAssign }) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      {nodes.length > 0 ? (
        nodes.map(node => (
          <NodeAssignmentRow key={node.id} node={node} users={users} onAssign={onAssign} />
        ))
      ) : (
        <p className="p-8 text-center text-gray-500">No hay nodos que coincidan con los filtros seleccionados.</p>
      )}
    </div>
  );
}
