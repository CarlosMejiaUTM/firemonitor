import React from 'react';
import { FiThermometer, FiWind, FiUser, FiMapPin, FiClock } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa'; // 🔥 CORREGIDO: ícono de fuego válido

interface AlertItemProps {
  type: 'flame' | 'temp' | 'smoke';
  reportedBy: string;
  distance: string;
  time: string;
}

const alertConfig = {
  flame: {
    title: 'Flama detectada',
    Icon: FaFire, // ✅ Se usa ícono válido
    classes: 'bg-red-100 text-red-600'
  },
  temp: {
    title: 'Temperatura elevada',
    Icon: FiThermometer,
    classes: 'bg-orange-100 text-orange-600'
  },
  smoke: {
    title: 'Humo detectado',
    Icon: FiWind,
    classes: 'bg-gray-200 text-gray-700'
  },
};

export default function AlertItem({ type, reportedBy, distance, time }: AlertItemProps) {
  const config = alertConfig[type];

  return (
    <div className="flex items-start gap-4 py-3">
      <div className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full ${config.classes}`}>
        <config.Icon size={20} />
      </div>

      <div className="flex-grow">
        <p className="font-bold text-gray-800">{config.title}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <FiUser size={12} />
            {reportedBy}
          </span>
          <span className="flex items-center gap-1.5">
            <FiMapPin size={12} />
            {distance}
          </span>
        </div>
      </div>

      <div className="flex-shrink-0 flex items-center gap-1.5 text-xs text-gray-400 whitespace-nowrap pt-1">
        <FiClock size={12} />
        <span>{time}</span>
      </div>
    </div>
  );
}
