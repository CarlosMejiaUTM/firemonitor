import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

export default function NodesTable({ nodes, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Nombre del Nodo</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Tipo</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">ID de Usuario Asignado</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {nodes.map((node) => (
            <tr key={node.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{node.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{node.tipo}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono text-xs">{node.userId || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                <button onClick={() => onEdit(node)} className="text-blue-600 hover:text-blue-900 transition-colors">
                  <FiEdit />
                </button>
                <button onClick={() => onDelete(node.id)} className="text-red-600 hover:text-red-900 transition-colors">
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
