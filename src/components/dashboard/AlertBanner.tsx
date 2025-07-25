import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

// Asumo que el tipo ApiAlert está disponible o importado
type ApiAlert = {
  tipo: string;
  severidad: 'Critica' | 'Alta' | 'Media' | 'Baja';
  // ...otros campos
};

// Se añaden los props para hacerlo dinámico y funcional
interface AlertBannerProps {
  alerts: ApiAlert[];
  onDismiss: () => void;
}

export default function AlertBanner({ alerts, onDismiss }: AlertBannerProps) {
  const navigate = useNavigate();

  // Filtramos para obtener solo las alertas de alta prioridad
  const highPriorityAlerts = alerts.filter(
    a => a.severidad === 'Critica' || a.severidad === 'Alta'
  );

  if (highPriorityAlerts.length === 0) {
    return null; // No mostrar nada si no hay alertas críticas
  }

  const alertCount = highPriorityAlerts.length;
  const title = alertCount === 1 
    ? `¡ALERTA! ${highPriorityAlerts[0].tipo}`
    : `¡${alertCount} Alertas Críticas Detectadas!`;
  
  const subtitle = alertCount === 1
    ? 'Se requiere atención inmediata. Revisa los detalles.'
    : `Se han detectado ${alertCount} eventos importantes.`;

  const handleNavigate = () => {
    navigate('/alerts'); // Navega a la página de historial de alertas
  };

  return (
    // MEJORA: El layout se apila en móvil y se expande en desktop.
    <div className="bg-red-600 text-white p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg animate-fade-in">
      <div className="flex items-center">
        {/* MEJORA: Icono con animación de pulso para atraer la atención. */}
        <div className="relative mr-4">
          <FiAlertTriangle className="h-8 w-8 animate-pulse" />
        </div>
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm text-red-100">{subtitle}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 self-end sm:self-center">
        {/* MEJORA: Botón funcional que redirige al usuario. */}
        <button 
          onClick={handleNavigate}
          className="bg-white text-red-600 font-bold py-2 px-4 rounded-md hover:bg-red-100 transition-colors text-sm"
        >
          Ver Alertas
        </button>

        {/* MEJORA: Botón para cerrar/descartar el banner. */}
        <button 
          onClick={onDismiss}
          className="text-red-200 hover:text-white transition-colors"
          aria-label="Cerrar alerta"
        >
          <FiX size={24} />
        </button>
      </div>
    </div>
  );
}