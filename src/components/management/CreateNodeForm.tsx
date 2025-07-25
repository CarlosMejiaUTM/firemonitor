import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FiCpu, FiTag, FiMapPin, FiPlusCircle } from 'react-icons/fi';

// MEJORA: El código problemático con 'require' se ha eliminado de aquí.
// Ahora se maneja de forma global en tu archivo main.tsx o App.tsx.

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
};


export default function CreateNodeForm({ formData, setFormData, handleSubmit, isLoading, error, successMessage }) {
  const [markerPosition, setMarkerPosition] = useState(null);
  
  const handleMapClick = (latlng) => {
    setMarkerPosition(latlng);
    setFormData(prev => ({
      ...prev,
      coordenadas: { lat: latlng.lat.toFixed(5), lng: latlng.lng.toFixed(5) }
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'lat' || name === 'lng') {
      const newCoords = { ...formData.coordenadas, [name]: value };
      setFormData(prev => ({ ...prev, coordenadas: newCoords }));
      if (newCoords.lat && newCoords.lng) {
        setMarkerPosition({ lat: parseFloat(newCoords.lat), lng: parseFloat(newCoords.lng) });
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl mx-auto space-y-8"
    >
      {error && <div className="bg-red-50 border border-red-200 text-sm text-red-700 p-3 rounded-md text-center">{error}</div>}
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md" role="alert">
          <p className="font-bold">¡Nodo Creado!</p>
          <p>{successMessage}</p>
        </div>
      )}

      <fieldset className="space-y-4">
        <legend className="text-lg font-bold text-gray-800 border-b border-gray-200 w-full pb-2 mb-2">Información del Nodo</legend>
        
        <div>
          <label htmlFor="nombre" className="block mb-1 text-sm font-medium text-gray-700">Nombre del Nodo</label>
          <div className="relative">
            <FiTag className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input id="nombre" type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Ej: Sensor Selva Norte" className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" required />
          </div>
        </div>
        
        <div>
          <label htmlFor="tipo" className="block mb-1 text-sm font-medium text-gray-700">Tipo de Nodo</label>
          <div className="relative">
            <FiCpu className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <select id="tipo" name="tipo" value={formData.tipo} onChange={handleInputChange} className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none" required>
              <option value="">-- Selecciona un tipo --</option>
              <option value="sensor">Sensor</option>
              <option value="repetidor">Repetidor</option>
              <option value="central">Central</option>
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-lg font-bold text-gray-800 border-b border-gray-200 w-full pb-2 mb-2">Ubicación Geográfica</legend>
        
        <div className="h-64 w-full rounded-md overflow-hidden z-0">
          <MapContainer center={[20.9756, -89.6201]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapClickHandler onMapClick={handleMapClick} />
            {markerPosition && <Marker position={markerPosition}></Marker>}
          </MapContainer>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lat" className="block mb-1 text-sm font-medium text-gray-700">Latitud</label>
            <div className="relative">
              <FiMapPin className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input id="lat" type="number" step="any" name="lat" value={formData.coordenadas.lat} onChange={handleInputChange} placeholder="Clic en el mapa..." className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" required />
            </div>
          </div>
          <div>
            <label htmlFor="lng" className="block mb-1 text-sm font-medium text-gray-700">Longitud</label>
             <div className="relative">
              <FiMapPin className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input id="lng" type="number" step="any" name="lng" value={formData.coordenadas.lng} onChange={handleInputChange} placeholder="Clic en el mapa..." className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" required />
            </div>
          </div>
        </div>
      </fieldset>

      <button
        type="submit"
        className="w-full flex items-center justify-center bg-red-600 text-white py-2.5 rounded-md hover:bg-red-700 font-semibold disabled:bg-red-400 transition-colors"
        disabled={isLoading}
      >
        {isLoading ? (
           <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <span>Creando Nodo...</span>
          </>
        ) : (
          <>
            <FiPlusCircle className="mr-2" />
            <span>Crear Nodo</span>
          </>
        )}
      </button>
    </form>
  );
}