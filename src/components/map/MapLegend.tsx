// src/components/map/MapLegend.tsx
import React from 'react';

const LegendItem = ({ children, label }: { children: React.ReactNode, label: string }) => (
  <div className="flex items-center gap-3">
    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
      {children}
    </div>
    <span className="text-sm text-gray-600">{label}</span>
  </div>
);

export default function MapLegend() {
  return (
    <div>
      <h3 className="text-base font-bold text-gray-700 mb-3">Leyenda</h3>
      <div className="space-y-3">
        <LegendItem label="Nodo en Alerta">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-7 h-7 bg-red-500/50 rounded-full animate-ping"></div>
            <div className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-md"></div>
          </div>
        </LegendItem>
        <LegendItem label="Nodo Activo">
          <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
        </LegendItem>
        <LegendItem label="Nodo Inactivo">
          <div className="w-4 h-4 bg-gray-500 rounded-full border-2 border-white shadow-md"></div>
        </LegendItem>
      </div>
    </div>
  );
}