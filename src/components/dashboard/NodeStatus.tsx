// src/components/dashboard/NodeStatus.tsx

import StatCard from './StatCard';

interface NodeData {
  name: string;
  lastUpdate: string;
  temperature: string;
  humidity: string;
  fireDetected: boolean;
  smokeDetected: boolean;
}

interface NodeStatusProps {
  node: NodeData;
}

export default function NodeStatus({ node }: NodeStatusProps) {
  if (!node) {
    return <div className="bg-white p-6 rounded-lg shadow-md">Cargando datos del nodo...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold">{node.name}</h2>
        <p className="text-sm text-gray-500">{node.lastUpdate}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 4. Usamos los datos del objeto 'node' que recibimos */}
        <StatCard icon="🌡️" title="Temperatura" value={node.temperature} />
        <StatCard icon="💧" title="Humedad" value={node.humidity} />
        <StatCard 
          icon="🔥" 
          title="Fuego detectado" 
          value={node.fireDetected ? 'Sí' : 'No'} 
          valueColor={node.fireDetected ? "text-red-500" : "text-gray-500"}
        />
        <StatCard 
          icon="💨" 
          title="Humo" 
          value={node.smokeDetected ? 'Sí' : 'No'} 
          valueColor={node.smokeDetected ? "text-red-500" : "text-gray-500"}
        />
      </div>
    </div>
  );
}