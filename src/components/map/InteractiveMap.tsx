import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- Tipos y Lógica de Íconos ---
interface Node {
  id: string;
  nombre: string;
  tipo: string;
  status: 'activo' | 'inactivo' | 'alerta';
  coordenadas?: { lat: number; lng: number }; // <-- Marcamos coordenadas como opcional
  ultimaLectura?: { temperatura: number; } | null;
}

const createColoredIcon = (color: 'red' | 'green' | 'grey') => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const iconMapping = {
  alerta: createColoredIcon('red'),
  activo: createColoredIcon('green'),
  inactivo: createColoredIcon('grey')
};
// ------------------------------------

export default function InteractiveMap({ nodes }: { nodes: Node[] }) {
    return (
        <MapContainer center={[20.9756, -89.6201]} zoom={14} style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* --- AQUÍ ESTÁ LA CORRECCIÓN --- */}
            {nodes
              // 1. Filtramos para quedarnos solo con los nodos que tienen coordenadas
              .filter(node => node.coordenadas && typeof node.coordenadas.lat === 'number' && typeof node.coordenadas.lng === 'number')
              // 2. Mapeamos sobre la lista ya filtrada y segura
              .map(node => (
                <Marker 
                    key={node.id} 
                    position={[node.coordenadas.lat, node.coordenadas.lng]} 
                    icon={iconMapping[node.status] || iconMapping.inactivo}
                >
                    <Popup>
                        <b>{node.nombre}</b><br />
                        Estado: {node.status.toUpperCase()}<br/>
                        Temperatura: {node.ultimaLectura ? `${node.ultimaLectura.temperatura}°C` : 'N/A'}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}