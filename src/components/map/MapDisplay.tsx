// src/components/map/MapDisplay.tsx

const MapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM10 0a1 1 0 011 1v.586l3 3V19a1 1 0 01-1.555.832L10 17.414l-2.445 2.418A1 1 0 016 19V4.586l3-3V1a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);
  
export default function MapDisplay() {
  return (
    <div className="lg:col-span-3 bg-white p-2 rounded-lg shadow-md">
      <div className="relative w-full h-[60vh] bg-blue-100 rounded-md flex items-center justify-center">
        <div className="text-center text-gray-500">
          <MapIcon />
          <p>Visualización del mapa iría aquí.</p>
        </div>
      </div>
    </div>
  );
}