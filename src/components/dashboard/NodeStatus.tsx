import {
  FiThermometer,
  FiDroplet,
  FiWind,
  FiShield,
  FiAlertTriangle,
  FiClock
} from 'react-icons/fi';
import { FaFire } from 'react-icons/fa'; // 🔥 Reemplazo válido
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

const StatusBadge = ({ inAlert }: { inAlert: boolean }) => {
  const baseClasses = "text-xs font-bold uppercase px-3 py-1 rounded-full inline-flex items-center gap-2";
  const styles = inAlert
    ? "bg-red-100 text-red-700"
    : "bg-green-100 text-green-700";

  return (
    <span className={`${baseClasses} ${styles}`}>
      {inAlert ? <FiAlertTriangle /> : <FiShield />}
      {inAlert ? 'En Alerta' : 'Operativo'}
    </span>
  );
};

export default function NodeStatus({ node }: NodeStatusProps) {
  if (!node) {
    return <div className="p-6">Cargando datos del nodo...</div>;
  }

  const isInAlert = node.fireDetected || node.smokeDetected;

  const stats = [
    { icon: FiThermometer, title: "Temperatura", value: node.temperature, valueColor: "text-gray-900" },
    { icon: FiDroplet, title: "Humedad", value: node.humidity, valueColor: "text-gray-900" },
    { icon: FiWind, title: "Humo", value: node.smokeDetected ? 'Sí' : 'No', valueColor: node.smokeDetected ? "text-red-600" : "text-green-600" },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{node.name}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <FiClock size={14} />
            <span>{node.lastUpdate}</span>
          </div>
        </div>
        <div className="mt-2 sm:mt-0">
          <StatusBadge inAlert={isInAlert} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100 border rounded-lg overflow-hidden">
        <StatCard
          icon={FaFire}
          title="Fuego Detectado"
          value={node.fireDetected ? '¡SÍ!' : 'No'}
          valueColor={node.fireDetected ? "text-white" : "text-green-600"}
          className={node.fireDetected ? "bg-red-500 text-white" : ""}
          titleColor={node.fireDetected ? "text-red-200" : "text-gray-500"}
        />

        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            valueColor={stat.valueColor}
          />
        ))}
      </div>
    </div>
  );
}
