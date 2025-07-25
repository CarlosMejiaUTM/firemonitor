import React from 'react';

// MEJORA: La interfaz ahora es más flexible.
// 'icon' es un componente, y se añaden 'className' y 'titleColor'.
interface StatCardProps {
  icon: React.ElementType; // Acepta un componente de ícono como FiThermometer
  title: string;
  value: string;
  valueColor?: string;
  titleColor?: string;
  className?: string;
}

export default function StatCard({ 
  icon: Icon, // Renombramos el prop a Icon para usarlo como componente
  title, 
  value, 
  valueColor = 'text-gray-900',
  titleColor = 'text-gray-500',
  className = ''
}: StatCardProps) {
  return (
    // MEJORA: El layout ahora es vertical y más limpio.
    // El 'className' dinámico permite estilos condicionales desde el padre.
    <div className={`p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`h-5 w-5 ${titleColor}`} />
        <p className={`text-sm font-medium ${titleColor}`}>{title}</p>
      </div>
      <div>
        <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
      </div>
    </div>
  );
}