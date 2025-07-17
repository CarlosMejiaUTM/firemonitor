import { useState, useMemo } from 'react';
import { useFireMonitor } from '../hooks/useFireMonitor';
import api from '../api/api';

// Importamos los nuevos componentes
import NodeAssignmentFilters from '../components/management/NodeAssignmentFilters';
import NodeAssignmentList from '../components/management/NodeAssignmentList';

export default function AssignNodePage() {
  const { nodes, users, refreshNodes } = useFireMonitor(); // Asumimos que el hook puede refrescar
  
  const [filters, setFilters] = useState({
    tipo: '',
    asignacion: 'todos', // 'todos', 'asignados', 'no_asignados'
  });

  const filteredNodes = useMemo(() => {
    return nodes.filter(node => {
      const tipoMatch = !filters.tipo || node.tipo === filters.tipo;
      
      let asignacionMatch = true;
      if (filters.asignacion === 'asignados') {
        asignacionMatch = !!node.userId;
      } else if (filters.asignacion === 'no_asignados') {
        asignacionMatch = !node.userId;
      }
      
      return tipoMatch && asignacionMatch;
    });
  }, [nodes, filters]);

  const handleAssignNode = async (nodeId, userId) => {
    try {
      await api.patch(`/nodes/${nodeId}`, { userId });
      alert(`Nodo asignado al usuario exitosamente.`);
      // Idealmente, aquí se refrescaría la lista de nodos
      // refreshNodes();
    } catch (error) {
      console.error("Error al asignar el nodo:", error);
      alert('No se pudo asignar el nodo.');
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Asignar Nodos a Usuarios</h1>
        <p className="text-gray-600 mt-1">Reasigna la propiedad de un nodo a un usuario específico.</p>
      </div>
      
      <NodeAssignmentFilters filters={filters} setFilters={setFilters} />
      
      <NodeAssignmentList nodes={filteredNodes} users={users} onAssign={handleAssignNode} />
    </div>
  );
}
