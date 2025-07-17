import AlertItem from './AlertItem';

// El componente ahora recibe las alertas como un prop
export default function NearbyAlerts({ alerts }) {

  // Mapeamos los nombres de las alertas de la API a los que espera tu componente AlertItem
  const alertTypeMap = {
    'Fuego Detectado': 'flame',
    'Temperatura Elevada': 'temp',
    'Humo Detectado': 'smoke',
    'Concentración de Gas Elevada': 'smoke', // Asignamos gas a smoke por ejemplo
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h2 className="text-xl font-bold mb-6">Alertas Recientes</h2>
      <div className="space-y-6">
        {/* Verificamos si hay alertas para mostrar */}
        {alerts && alerts.length > 0 ? (
          // Usamos .slice(0, 3) para mostrar solo las 3 más recientes
          alerts.slice(0, 3).map((alert) => (
            <AlertItem 
              key={alert.id} 
              type={alertTypeMap[alert.tipo] || 'smoke'}
              reportedBy={alert.nodo.nombre}
              distance="N/A" // La API no provee este dato, podrías calcularlo si es necesario
              time={new Date(alert.hora).toLocaleTimeString()}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">No hay alertas recientes.</p>
        )}
      </div>
    </div>
  );
}