import React from 'react';
import { FiChevronRight, FiCpu, FiServer, FiGitPullRequest } from 'react-icons/fi';

// --- Componentes Auxiliares para un código más limpio ---

const nodeIcons = {
  sensor: <FiCpu className="h-6 w-6 text-red-500" />,
  repetidor: <FiGitPullRequest className="h-6 w-6 text-blue-500" />,
  central: <FiServer className="h-6 w-6 text-purple-500" />,
};

const NodeInfoCell = ({ node }) => (
  <div className="flex items-center gap-4">
    <div className="flex-shrink-0">
      {nodeIcons[node.tipo] || <FiCpu className="h-6 w-6 text-gray-500" />}
    </div>
    <div>
      <p className="font-bold text-gray-900">{node.nombre}</p>
      <p className="text-sm text-gray-500 capitalize md:hidden">{node.tipo}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const statusConfig = {
    alerta: { text: 'Alerta', dot: 'bg-red-500', main: 'bg-red-100 text-red-800' },
    activo: { text: 'Activo', dot: 'bg-green-500', main: 'bg-green-100 text-green-800' },
    inactivo: { text: 'Inactivo', dot: 'bg-gray-400', main: 'bg-gray-100 text-gray-700' },
  };
  const config = statusConfig[status] || statusConfig.inactivo;
  
  return (
    <div className={`inline-flex items-center gap-x-2 px-2.5 py-1 rounded-full text-xs font-bold ${config.main}`}>
      <span className={`h-2 w-2 rounded-full ${config.dot}`}></span>
      <span>{config.text}</span>
    </div>
  );
};

// --- Componente Principal de la Tabla ---

export default function NodeManagementList({ nodes, onViewDetails }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50 hidden md:table-header-group">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Nombre del Nodo</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Tipo</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Estado</th>
            <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {nodes.map((node) => (
            <tr 
              key={node.id} 
              onClick={() => onViewDetails(node)}
              className="block md:table-row border-b md:border-none hover:bg-gray-50 transition-colors cursor-pointer"
            >
              
              {/* --- Celda Nombre y Tipo (combinada en móvil) --- */}
              <td className="px-6 py-4 whitespace-nowrap block md:table-cell">
                <NodeInfoCell node={node} />
              </td>

              {/* --- Celda Tipo (solo desktop) --- */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize hidden md:table-cell">
                {node.tipo}
              </td>

              {/* --- Celda Estado --- */}
              <td className="px-6 py-4 whitespace-nowrap block md:table-cell">
                <span className="font-bold text-xs text-gray-500 uppercase md:hidden">Estado: </span>
                <StatusBadge status={node.status} />
              </td>

              {/* --- Celda Acciones --- */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium block md:table-cell text-right">
                <div className="flex items-center justify-end text-gray-400">
                  <FiChevronRight size={20} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}