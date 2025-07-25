import React from 'react';
import NodeAssignmentRow from './NodeAssignmentRow'; // Suponiendo que el de abajo está en su propio archivo

// MEJORA: Este componente ahora solo se encarga de renderizar la lista.
// El contenedor (tarjeta) y el estado vacío son manejados por la página padre.
export default function NodeAssignmentList({ nodes, users, onAssign, isAssigning }) {
  return (
    <div className="divide-y divide-gray-100">
      {nodes.map(node => (
        <NodeAssignmentRow 
          key={node.id} 
          node={node} 
          users={users} 
          onAssign={onAssign}
          // Pasamos el ID del nodo que se está asignando para el spinner
          isAssigning={isAssigning === node.id} 
        />
      ))}
    </div>
  );
}