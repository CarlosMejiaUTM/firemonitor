// src/pages/MapPage.tsx
import { useState, useMemo } from 'react';
import { useFireMonitor } from '../hooks/useFireMonitor';

import FilterBar from '../components/map/FilterBar';
import MapLegend from '../components/map/MapLegend';
import InteractiveMap from '../components/map/InteractiveMap';
import { FiLayout } from 'react-icons/fi';

// Componente para el estado vacío (sin nodos)
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center text-center h-full bg-white rounded-lg shadow-md p-8">
    <FiLayout className="mx-auto h-16 w-16 text-gray-300" />
    <h3 className="mt-4 text-xl font-bold text-gray-800">Mapa de Monitoreo</h3>
    <p className="mt-2 text-gray-500">No hay nodos para mostrar.</p>
  </div>
);

export default function MapPage() {
  const { nodes, users, currentUser, isLoading } = useFireMonitor(); 
  
  const [filters, setFilters] = useState({
    soloAlertas: false,
    tipo: '',
    userId: '',
  });

  const filteredNodes = useMemo(() => {
    const finalUserIdFilter = currentUser?.role === 'admin' ? filters.userId : '';

    return nodes.filter(node => {
      const statusMatch = !filters.soloAlertas || node.status === 'alerta';
      const typeMatch = !filters.tipo || node.tipo === filters.tipo;
      const userMatch = !finalUserIdFilter || node.userId === finalUserIdFilter;
      return statusMatch && typeMatch && userMatch;
    });
  }, [nodes, filters, currentUser]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Mapa de Monitoreo</h1>
        <p className="text-gray-600 mt-1">Filtra y explora la red de nodos en tiempo real.</p>
      </div>

      {/* MEJORA: Layout de dos columnas consistente con el resto del dashboard. */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Columna Izquierda: Controles */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FilterBar 
              filters={filters} 
              setFilters={setFilters}
              users={users}
              currentUser={currentUser}
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <MapLegend />
          </div>
        </div>

        {/* Columna Derecha: Mapa */}
        <div className="lg:col-span-3 h-[75vh]">
          {isLoading ? (
            <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse"></div>
          ) : (!nodes || nodes.length === 0) ? (
            <EmptyState />
          ) : (
            <div className="w-full h-full rounded-lg shadow-md overflow-hidden">
              <InteractiveMap nodes={filteredNodes} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}