import { useFireMonitor } from '../hooks/useFireMonitor';

import NodeSelector from '../components/dashboard/NodeSelector';
import NodeStatus from '../components/dashboard/NodeStatus';
import DataChart from '../components/dashboard/DataChart';
import NearbyAlerts from '../components/dashboard/NearbyAlerts';
import AlertBanner from '../components/dashboard/AlertBanner';


export default function Dashboard() {
  const {
    nodes,
    selectedNodeId,
    selectedNodeData,
    liveAlerts,
    chartHistory, // <-- Obtenemos los datos para la gráfica
    handleSelectNode,
  } = useFireMonitor();

  const hasCriticalAlert = liveAlerts.some(a => a.severidad === 'Critica' || a.severidad === 'Alta');

  return (
    <div className="p-8 space-y-8">
      {hasCriticalAlert && <AlertBanner />}
      <h1 className="text-3xl font-bold text-gray-800">Dashboard Principal</h1>
      
      {nodes.length > 0 && selectedNodeId && (
        <NodeSelector
          nodes={nodes}
          selectedNodeId={selectedNodeId}
          onSelectNode={handleSelectNode}
        />
      )}
      
      {selectedNodeData ? (
        <>
          <NodeStatus node={{
            name: selectedNodeData.nombre,
            lastUpdate: `Actualizado ${new Date(selectedNodeData.ultimaActualizacion || Date.now()).toLocaleTimeString()}`,
            temperature: `${selectedNodeData.ultimaLectura?.temperatura ?? 'N/A'}°C`,
            humidity: `${selectedNodeData.ultimaLectura?.humedad ?? 'N/A'}%`,
            fireDetected: selectedNodeData.ultimaLectura?.fuegoDetectado ?? false,
            smokeDetected: selectedNodeData.ultimaLectura?.humoDetectado ?? false,
          }} />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Tendencia de Temperatura (°C)</h2>
              {/* Le pasamos los datos del historial al gráfico */}
              <DataChart data={chartHistory} />
            </div>
            <div className="lg:col-span-2">
              {/* Le pasamos las alertas en vivo al componente */}
              <NearbyAlerts alerts={liveAlerts} />
            </div>
          </div>
        </>
      ) : (
        <p>Cargando datos de los nodos...</p>
      )}
    </div>
  );
}