import { useState, useMemo, useEffect } from 'react';
import { useFireMonitor } from '../hooks/useFireMonitor';
import api from '../api/api';
import { FiShare2, FiSearch } from 'react-icons/fi';

// Importamos los componentes de layout (suponiendo que existen)
import NodeAssignmentFilters from '../components/management/NodeAssignmentFilters';
import NodeAssignmentList from '../components/management/NodeAssignmentList';

// --- Componentes de Estado ---
const PageSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-10 bg-gray-200 rounded-md w-1/3"></div>
    <div className="bg-gray-200 rounded-lg h-96 w-full"></div>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-16">
    <FiSearch className="mx-auto h-12 w-12 text-gray-300" />
    <h3 className="mt-4 text-lg font-semibold text-gray-800">No se encontraron nodos</h3>
    <p className="mt-1 text-gray-500">Intenta ajustar los filtros de búsqueda.</p>
  </div>
);

export default function AssignNodePage() {
  const { nodes, users, refreshNodes, isLoading } = useFireMonitor();
  
  const [filters, setFilters] = useState({
    tipo: '',
    asignacion: 'todos',
  });

  // MEJORA: Estado para notificaciones en línea
  const [statusMessage, setStatusMessage] = useState({ message: '', type: '' });

  useEffect(() => {
    if (statusMessage.message) {
      const timer = setTimeout(() => {
        setStatusMessage({ message: '', type: '' });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const filteredNodes = useMemo(() => {
    return nodes.filter(node => {
      const tipoMatch = !filters.tipo || node.tipo === filters.tipo;
      let asignacionMatch = true;
      if (filters.asignacion === 'asignados') asignacionMatch = !!node.userId;
      else if (filters.asignacion === 'no_asignados') asignacionMatch = !node.userId;
      return tipoMatch && asignacionMatch;
    });
  }, [nodes, filters]);

  const handleAssignNode = async (nodeId, userId) => {
    try {
      await api.patch(`/nodes/${nodeId}`, { userId });
      setStatusMessage({ message: 'Nodo asignado exitosamente.', type: 'success' });
      refreshNodes();
    } catch (error) {
      console.error("Error al asignar el nodo:", error);
      setStatusMessage({ message: 'Error: No se pudo asignar el nodo.', type: 'error' });
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex items-center gap-4">
        <FiShare2 className="h-8 w-8 text-red-500" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Asignar Nodos a Usuarios</h1>
          <p className="text-gray-600 mt-1">Reasigna la propiedad de un nodo a un usuario específico.</p>
        </div>
      </div>
      
      {isLoading ? (
        <PageSkeleton />
      ) : (
        // MEJORA: Contenedor principal tipo "card"
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <NodeAssignmentFilters filters={filters} setFilters={setFilters} />
          </div>

          {/* MEJORA: Renderizado de la notificación */}
          {statusMessage.message && (
            <div className={`px-6 py-3 text-sm font-medium border-b border-gray-200 ${
              statusMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {statusMessage.message}
            </div>
          )}

          {filteredNodes.length > 0 ? (
            <NodeAssignmentList nodes={filteredNodes} users={users} onAssign={handleAssignNode} />
          ) : (
            <EmptyState />
          )}
        </div>
      )}
    </div>
  );
}