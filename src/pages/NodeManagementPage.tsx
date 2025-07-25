import React, { useState, useMemo, useEffect } from 'react';
import { useFireMonitor } from '../hooks/useFireMonitor';
import api from '../api/api';
import { FiHardDrive, FiSearch, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

// Importamos los componentes necesarios
import NodeManagementFilters from '../components/management/NodeManagementFilters';
import NodeListItem from '../components/management/NodeListItem';
import NodeDetailModal from '../components/management/NodeDetailModal';

// --- Componentes Auxiliares ---
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

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md m-4 p-6 text-center space-y-4">
        <FiAlertTriangle className="mx-auto h-12 w-12 text-red-500" />
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600">{message}</p>
        <div className="flex justify-center gap-4 pt-4">
          <button onClick={onClose} className="px-6 py-2 rounded-md bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300">Cancelar</button>
          <button onClick={onConfirm} className="px-6 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700">Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default function NodeManagementPage() {
  const { nodes, users, currentUser, isLoading, refreshNodes } = useFireMonitor();
  
  const [filters, setFilters] = useState({ tipo: '', userId: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNodeForModal, setSelectedNodeForModal] = useState(null);
  const [statusMessage, setStatusMessage] = useState({ message: '', type: '' });
  const [nodeToDelete, setNodeToDelete] = useState(null);
  // ✅ NUEVO ESTADO: para saber qué nodo se está asignando
  const [assigningNodeId, setAssigningNodeId] = useState(null);

  useEffect(() => {
    if (statusMessage.message) {
      const timer = setTimeout(() => setStatusMessage({ message: '', type: '' }), 4000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const filteredNodes = useMemo(() => {
    const finalUserIdFilter = currentUser?.role === 'admin' ? filters.userId : currentUser?.id;
    return nodes.filter(node => {
      const typeMatch = !filters.tipo || node.tipo === filters.tipo;
      const userMatch = !finalUserIdFilter || node.userId === finalUserIdFilter;
      return typeMatch && userMatch;
    });
  }, [nodes, filters, currentUser]);

  const handleViewDetails = (node) => {
    setSelectedNodeForModal(node);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => setIsModalOpen(false);

  // ✅ FUNCIONALIDAD DEL BOTÓN IMPLEMENTADA
  const handleAssignNode = async (nodeId, userId) => {
    setAssigningNodeId(nodeId); // Inicia el estado de carga para este nodo específico
    setStatusMessage({ message: '', type: '' }); // Limpia mensajes anteriores

    try {
      await api.patch(`/nodes/${nodeId}/assign`, { userId });
      setStatusMessage({ message: 'Nodo asignado exitosamente.', type: 'success' });
      refreshNodes(); // Refresca la lista para mostrar el nuevo dueño
    } catch (error) {
      console.error("Error al asignar el nodo:", error);
      const errorMessage = error.response?.data?.message || 'Error al asignar el nodo.';
      setStatusMessage({ message: errorMessage, type: 'error' });
    } finally {
      setAssigningNodeId(null); // Detiene el estado de carga
    }
  };

  const handleEditNode = (node) => { setStatusMessage({ message: `Función 'Editar' no implementada.`, type: 'info' }) };

  const handleDeleteNode = (nodeId) => {
    setNodeToDelete(nodeId);
  };
  
  const confirmDelete = async () => {
    try {
      await api.delete(`/nodes/${nodeToDelete}`);
      setStatusMessage({ message: 'Nodo eliminado exitosamente.', type: 'success' });
      refreshNodes();
    } catch (error) {
      setStatusMessage({ message: 'Error al eliminar el nodo.', type: 'error' });
    } finally {
      setNodeToDelete(null);
    }
  };

  return (
    <>
      <div className={`p-4 sm:p-6 lg:p-8 space-y-6 transition-all duration-300 ${isModalOpen ? 'blur-sm' : ''}`}>
        <div className="flex items-center gap-4">
          <FiHardDrive className="h-8 w-8 text-red-500" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Nodos</h1>
            <p className="text-gray-600 mt-1">Administra, asigna y revisa el historial de todos los nodos.</p>
          </div>
        </div>
        
        {isLoading ? <PageSkeleton /> : (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <NodeManagementFilters 
                filters={filters} setFilters={setFilters} users={users} currentUser={currentUser}
              />
            </div>

            {statusMessage.message && (
              <div className={`px-6 py-3 text-sm font-medium border-b border-gray-200 flex items-center gap-2 ${
                statusMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {statusMessage.type === 'success' ? <FiCheckCircle/> : <FiAlertTriangle/>}
                {statusMessage.message}
              </div>
            )}

            {filteredNodes.length > 0 ? (
              <>
                <div className="px-6 py-3 text-xs font-bold text-gray-500 uppercase hidden md:grid md:grid-cols-12 gap-4">
                  <div className="md:col-span-4">Nodo</div>
                  <div className="md:col-span-3">Dueño</div>
                  <div className="md:col-span-2">Estado</div>
                  <div className="md:col-span-3 text-right">Acciones</div>
                </div>
                <div className="divide-y divide-gray-100">
                  {filteredNodes.map(node => (
                    <NodeListItem 
                      key={node.id} 
                      node={node} 
                      users={users} 
                      onAssign={handleAssignNode}
                      // ✅ Se pasa el estado de carga al componente hijo
                      isAssigning={assigningNodeId === node.id}
                      onEdit={handleEditNode} 
                      onDelete={handleDeleteNode} 
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              </>
            ) : (
              <EmptyState />
            )}
          </div>
        )}
      </div>

      {isModalOpen && <NodeDetailModal node={selectedNodeForModal} onClose={handleCloseModal} />}
      
      <ConfirmationModal 
        isOpen={!!nodeToDelete}
        onClose={() => setNodeToDelete(null)}
        onConfirm={confirmDelete}
        title="Confirmar Eliminación"
        message="¿Estás seguro de que quieres eliminar este nodo? Esta acción no se puede deshacer."
      />
    </>
  );
}
