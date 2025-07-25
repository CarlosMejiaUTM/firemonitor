import { useFireMonitor } from '../hooks/useFireMonitor';

import NodeSelector from '../components/dashboard/NodeSelector';
import NodeStatus from '../components/dashboard/NodeStatus';
import DataChart from '../components/dashboard/DataChart';
import NearbyAlerts from '../components/dashboard/NearbyAlerts';
import AlertBanner from '../components/dashboard/AlertBanner';
import { FiPlusCircle } from 'react-icons/fi';

// --- Componentes de Estado para un código más limpio ---

const DashboardSkeleton = () => (
  <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-pulse">
    <div className="flex justify-between items-center">
      <div className="h-10 bg-gray-200 rounded-md w-1/2"></div>
      <div className="h-12 bg-gray-200 rounded-md w-1/3"></div>
    </div>
    <div className="h-36 bg-gray-200 rounded-lg w-full"></div>
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 h-80 bg-gray-200 rounded-lg"></div>
      <div className="lg:col-span-2 h-80 bg-gray-200 rounded-lg"></div>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="p-4 sm:p-6 lg:p-8 text-center flex flex-col items-center justify-center min-h-[70vh]">
    <FiPlusCircle className="mx-auto h-16 w-16 text-gray-300" />
    <h3 className="mt-4 text-2xl font-bold text-gray-800">Bienvenido a FireMonitor</h3>
    <p className="mt-2 text-gray-500">Parece que aún no tienes nodos de monitoreo configurados.</p>
    <button className="mt-6 bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
      Agregar mi primer nodo
    </button>
  </div>
);

// --- Componente Principal del Dashboard ---

export default function Dashboard() {
  const {
    nodes,
    selectedNodeId,
    selectedNodeData,
    liveAlerts,
    chartHistory,
    handleSelectNode,
    isLoading, // Asumo que el hook provee un estado de carga inicial
  } = useFireMonitor();

  const hasCriticalAlert = liveAlerts.some(a => a.severidad === 'Critica' || a.severidad === 'Alta');

  // Obtener la fecha actual formateada en español
  const today = new Date().toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedDate = today.charAt(0).toUpperCase() + today.slice(1);

  if (isLoading) {
    return <DashboardSkeleton />;
  }
  
  if (nodes.length === 0) {
    return <EmptyState />;
  }

  return (
    // MEJORA: Layout principal con padding y fondo general del dashboard.
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {hasCriticalAlert && <AlertBanner alerts={liveAlerts} />}
      
      {/* MEJORA: Encabezado con título, fecha y selector de nodo en una parrilla. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Principal</h1>
          <p className="text-gray-500 mt-1">{formattedDate}</p>
        </div>
        <div className="w-full">
          {selectedNodeId && (
            <NodeSelector
              nodes={nodes}
              selectedNodeId={selectedNodeId}
              onSelectNode={handleSelectNode}
            />
          )}
        </div>
      </div>
      
      {selectedNodeData ? (
        // MEJORA: Parrilla principal para los widgets del dashboard.
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* WIDGET: Estado del Nodo */}
          <div className="lg:col-span-12 bg-white p-6 rounded-lg shadow-md">
             <NodeStatus node={{
              name: selectedNodeData.nombre,
              lastUpdate: `Actualizado ${new Date(selectedNodeData.ultimaActualizacion || Date.now()).toLocaleTimeString('es-MX', {hour: '2-digit', minute: '2-digit'})}`,
              temperature: `${selectedNodeData.ultimaLectura?.temperatura ?? 'N/A'}°C`,
              humidity: `${selectedNodeData.ultimaLectura?.humedad ?? 'N/A'}%`,
              fireDetected: selectedNodeData.ultimaLectura?.fuegoDetectado ?? false,
              smokeDetected: selectedNodeData.ultimaLectura?.humoDetectado ?? false,
            }} />
          </div>

          {/* WIDGET: Gráfica de Tendencia */}
          <div className="lg:col-span-7 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tendencia de Temperatura (°C)</h2>
            <DataChart data={chartHistory} />
          </div>

          {/* WIDGET: Alertas Cercanas */}
          <div className="lg:col-span-5 bg-white p-6 rounded-lg shadow-md">
             <h2 className="text-xl font-bold text-gray-800 mb-4">Alertas Activas</h2>
            <NearbyAlerts alerts={liveAlerts} />
          </div>

        </div>
      ) : (
         <DashboardSkeleton /> // Muestra el esqueleto si los datos del nodo aún no llegan
      )}
    </div>
  );
}