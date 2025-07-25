// src/components/map/MapDisplay.tsx
import React from 'react';
import { FiMap } from 'react-icons/fi';

export default function MapDisplay() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <FiMap className="h-6 w-6 text-gray-500" />
        <h2 className="text-lg font-bold text-gray-800">Ubicación de Red</h2>
      </div>

      {/* MEJORA: Mapa esquemático con tema claro. */}
      <div className="relative bg-slate-100 aspect-video rounded-lg overflow-hidden flex-grow">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-px h-full border-l border-gray-300 border-dashed"></div>
          <div className="absolute top-0 left-2/4 w-px h-full border-l border-gray-300 border-dashed"></div>
          <div className="absolute top-0 left-3/4 w-px h-full border-l border-gray-300 border-dashed"></div>
          <div className="absolute left-0 top-1/4 h-px w-full border-t border-gray-300 border-dashed"></div>
          <div className="absolute left-0 top-2/4 h-px w-full border-t border-gray-300 border-dashed"></div>
          <div className="absolute left-0 top-3/4 h-px w-full border-t border-gray-300 border-dashed"></div>
        </div>

        {/* --- Nodos Simulados --- */}
        <div className="absolute w-3.5 h-3.5 bg-green-500/80 rounded-full border border-white" style={{ top: '65%', left: '65%', transform: 'translate(-50%, -50%)' }}></div>
        <div className="absolute w-3.5 h-3.5 bg-green-500/80 rounded-full border border-white" style={{ top: '20%', left: '75%', transform: 'translate(-50%, -50%)' }}></div>
        <div className="absolute w-3.5 h-3.5 bg-green-500/80 rounded-full border border-white" style={{ top: '25%', left: '25%', transform: 'translate(-50%, -50%)' }}></div>
        
        {/* Nodo principal con animación de pulso */}
        <div className="absolute" style={{ top: '50%', left: '50%' }}>
          <div className="absolute w-6 h-6 bg-red-500/50 rounded-full animate-ping -translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="absolute bottom-2 right-2 text-xs text-slate-500 bg-white/70 px-2 py-1 rounded font-mono">
          Red de Nodos: Sureste
        </div>
      </div>
    </div>
  );
}