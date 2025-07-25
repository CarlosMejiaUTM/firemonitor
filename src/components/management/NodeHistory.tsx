import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { FiAlertTriangle, FiWind, FiThermometer, FiCheckCircle } from 'react-icons/fi';
// RUTA CORREGIDA SEGÚN TU ESTRUCTURA DE CARPETAS
import SeverityBadge from '../alerts/SeverityBadge';

// --- Tipos ---
interface Alert {
  id: string;
  tipo: string;
  hora: string;
  severidad: 'Critica' | 'Alta' | 'Media' | 'Baja';
}

interface NodeHistoryProps {
  nodeId: string;
}

// --- Componentes de Estado ---
const HistorySkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
    <div className="space-y-3">
      <div className="h-5 bg-gray-200 rounded w-full"></div>
      <div className="h-5 bg-gray-200 rounded w-5/6"></div>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-6">
    <FiCheckCircle className="mx-auto h-8 w-8 text-green-400" />
    <p className="mt-2 text-sm text-gray-500">Este nodo no tiene alertas registradas.</p>
  </div>
);

const alertIcons = {
  'Fuego Detectado': <FiAlertTriangle className="text-red-500" />,
  'Temperatura Elevada': <FiThermometer className="text-orange-500" />,
  'Humo Detectado': <FiWind className="text-gray-500" />,
};

export default function NodeHistory({ nodeId }: NodeHistoryProps) {
  const [history, setHistory] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!nodeId) return;
    async function fetchHistory() {
      setIsLoading(true);
      try {
        const response = await api.get('/alerts', { params: { nodeId, limit: 5, sort: 'desc' } });
        setHistory(response.data.data || []);
      } catch (error) {
        console.error(`Error al cargar el historial para el nodo ${nodeId}:`, error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHistory();
  }, [nodeId]);

  return (
    <div className="bg-slate-50 p-4 rounded-md">
      <h4 className="font-bold text-sm mb-4 text-gray-700">Historial de Alertas Recientes</h4>
      {isLoading ? (
        <HistorySkeleton />
      ) : history.length > 0 ? (
        <ol className="relative border-l border-gray-200 ml-2">                  
          {history.map(alert => (
            <li key={alert.id} className="mb-6 ml-6">            
              <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                {alertIcons[alert.tipo] || <FiAlertTriangle />}
              </span>
              <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="items-center justify-between sm:flex">
                  <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                    {new Date(alert.hora).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' })}
                  </time>
                  <div className="text-sm font-semibold text-gray-900">{alert.tipo}</div>
                </div>
                <div className="mt-2">
                  <SeverityBadge severity={alert.severidad} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}