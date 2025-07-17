import { useState, useMemo } from 'react';
import { useFireMonitor } from '../hooks/useFireMonitor';
import api from '../api/api';

// Importamos los componentes necesarios
import NodeManagementFilters from '../components/management/NodeManagementFilters';
import NodeListItem from '../components/management/NodeListItem';
import NodeDetailModal from '../components/management/NodeDetailModal';

export default function NodeManagementPage() {
  const { nodes, users, currentUser } = useFireMonitor();
  
  const [filters, setFilters] = useState({ tipo: '', userId: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNodeForModal, setSelectedNodeForModal] = useState(null);

  const filteredNodes = useMemo(() => {
    const finalUserIdFilter = currentUser?.role === 'admin' ? filters.userId : currentUser?.id;
    return nodes.filter(node => {
      if (filters.tipo && node.tipo !== filters.tipo) return false;
      if (finalUserIdFilter && node.userId !== finalUserIdFilter) return false;
      return true;
    });
  }, [nodes, filters, currentUser]);

  const handleViewDetails = (node) => {
    setSelectedNodeForModal(node);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNodeForModal(null);
  };

  const handleAssignNode = async (nodeId, userId) => {
    try {
      await api.patch(`/nodes/${nodeId}`, { userId });
      alert(`Nodo asignado exitosamente.`);
      // Idealmente, se refrescaría la lista de nodos aquí
    } catch (error) {
      alert('Error al asignar el nodo.');
    }
  };

  const handleEditNode = (node) => {
    alert(`Editar '${node.nombre}' (no implementado).`);
  };

  const handleDeleteNode = async (nodeId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este nodo?")) {
      try {
        await api.delete(`/nodes/${nodeId}`);
        alert('Nodo eliminado exitosamente.');
      } catch (error) {
        alert('Error al eliminar el nodo.');
      }
    }
  };

  return (
    <>
      {/* El div principal ahora tiene una clase de transición para el efecto de desenfoque */}
      <div className={`p-8 transition-all duration-300 ${isModalOpen ? 'blur-sm pointer-events-none' : ''}`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Gestión y Asignación de Nodos</h1>
          <p className="text-gray-600 mt-1">Administra, asigna y revisa el historial de todos los nodos.</p>
        </div>
        
        <NodeManagementFilters 
          filters={filters} 
          setFilters={setFilters}
          users={users}
          currentUser={currentUser}
        />
        
        <div className="space-y-2">
          {filteredNodes.length > 0 ? (
            filteredNodes.map(node => (
              <NodeListItem 
                key={node.id} 
                node={node} 
                users={users} 
                onAssign={handleAssignNode}
                onEdit={handleEditNode}
                onDelete={handleDeleteNode}
                onViewDetails={handleViewDetails}
              />
            ))
          ) : (
            <p className="p-8 text-center text-gray-500 bg-white rounded-lg shadow-md">No hay nodos que coincidan con los filtros.</p>
          )}
        </div>
      </div>

      {/* El modal se renderiza aquí y es afectado por el estado isModalOpen */}
      {isModalOpen && (
        <NodeDetailModal node={selectedNodeForModal} onClose={handleCloseModal} />
      )}
    </>
  );
}
