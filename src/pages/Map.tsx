import { useState, useMemo } from 'react';
import { useFireMonitor } from '../hooks/useFireMonitor';

// Importa tus componentes de layout
import FilterBar from '../components/map/FilterBar';
import MapLegend from '../components/map/MapLegend';
import InteractiveMap from '../components/map/InteractiveMap';

function MapPage() {
  // 1. Obtenemos los nodos, usuarios y el usuario actual del hook
  const { nodes, users, currentUser } = useFireMonitor();
  
  // 2. Expandimos el estado de los filtros
  const [filters, setFilters] = useState({
    soloAlertas: false,
    tipo: '',
    userId: '',
  });

  // 3. La lógica de filtrado ahora considera todos los filtros activos
  const filteredNodes = useMemo(() => {
    // Si el usuario no es admin, no se aplica el filtro de userId de la UI,
    // ya que la API ya le devuelve solo sus nodos.
    // Si es admin, sí usamos el filtro seleccionado.
    const finalUserIdFilter = currentUser?.role === 'admin' ? filters.userId : '';

    return nodes.filter(node => {
      if (filters.soloAlertas && node.status !== 'alerta') return false;
      if (filters.tipo && node.tipo !== filters.tipo) return false;
      if (finalUserIdFilter && node.userId !== finalUserIdFilter) return false;
      return true;
    });
  }, [nodes, filters, currentUser]);

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mapa de monitoreo</h1>
      
      <FilterBar 
        filters={filters} 
        setFilters={setFilters}
        users={users}
        currentUser={currentUser}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <MapLegend />
        <div className="lg:col-span-3 bg-white p-2 rounded-lg shadow-md h-[70vh]">
          <InteractiveMap nodes={filteredNodes} />
        </div>
      </div>
    </>
  );
}

export default MapPage;