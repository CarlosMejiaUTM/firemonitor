import React from 'react';

// Mapeo de status a colores para la insignia
const statusConfig = {
  alerta: { text: 'Alerta', color: 'bg-red-100 text-red-800' },
  activo: { text: 'Activo', color: 'bg-green-100 text-green-800' },
  inactivo: { text: 'Inactivo', color: 'bg-gray-200 text-gray-800' },
};

export default function NodeManagementList({ nodes, onViewDetails }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Tipo</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Estado</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {nodes.map((node) => {
            const statusInfo = statusConfig[node.status] || statusConfig.inactivo;
            return (
              <tr key={node.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{node.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{node.tipo}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusInfo.color}`}>
                    {statusInfo.text}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => onViewDetails(node)} className="text-red-600 hover:text-red-900">
                    Ver Detalles
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
