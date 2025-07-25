// src/components/map/InteractiveMap.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface Node {
  id: string;
  nombre: string;
  tipo: string;
  status: 'activo' | 'inactivo' | 'alerta';
  coordenadas?: { lat: number; lng: number };
  ultimaLectura?: { temperatura: number; } | null;
}

const createCustomDivIcon = (status: Node['status']) => {
  let iconHtml = '';
  switch (status) {
    case 'alerta':
      iconHtml = `
        <div class="relative flex items-center justify-center">
          <div class="w-7 h-7 bg-red-500/50 rounded-full animate-ping"></div>
          <div class="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-md"></div>
        </div>
      `;
      break;
    case 'activo':
      iconHtml = `<div class="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md"></div>`;
      break;
    case 'inactivo':
    default:
      iconHtml = `<div class="w-4 h-4 bg-gray-500 rounded-full border-2 border-white shadow-md"></div>`;
      break;
  }

  return new L.DivIcon({
    html: iconHtml,
    className: '',
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
};

const iconMapping = {
  alerta: createCustomDivIcon('alerta'),
  activo: createCustomDivIcon('activo'),
  inactivo: createCustomDivIcon('inactivo')
};

export default function InteractiveMap({ nodes }: { nodes: Node[] }) {
  const mapCenter: [number, number] = [20.9756, -89.6201];

  return (
    <MapContainer center={mapCenter} zoom={14} style={{ height: '100%', width: '100%' }}>
      {/* MEJORA: TileLayer con tema claro y minimalista. */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      
      {nodes
        .filter(node => node.coordenadas && typeof node.coordenadas.lat === 'number')
        .map(node => (
          <Marker 
            key={node.id} 
            position={[node.coordenadas!.lat, node.coordenadas!.lng]} 
            icon={iconMapping[node.status] || iconMapping.inactivo}
          >
            {/* MEJORA: Popup con estilo claro. */}
            <Popup autoPan={false}>
              <div className="!m-[-6px] !p-0 w-52">
                <div className="p-3">
                  <p className="font-bold text-base text-gray-800">{node.nombre}</p>
                  <p className="text-xs text-gray-500 capitalize">{node.tipo}</p>
                </div>
                <div className="border-t border-gray-100 p-3 text-sm space-y-1">
                  <p className="text-gray-600"><b>Estado:</b> <span className="font-semibold capitalize">{node.status}</span></p>
                  <p className="text-gray-600"><b>Temp:</b> {node.ultimaLectura ? `${node.ultimaLectura.temperatura}°C` : 'N/A'}</p>
                </div>
              </div>
            </Popup>
          </Marker>
      ))}
    </MapContainer>
  );
}