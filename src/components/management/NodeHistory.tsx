import React, { useState, useEffect } from 'react';
import api from '../../api/api';

export default function NodeHistory({ nodeId }) {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      setIsLoading(true);
      try {
        const response = await api.get('/alerts', { params: { nodeId } });
        setHistory(response.data.data || []);
      } catch (error) {
        console.error(`Error al cargar el historial para el nodo ${nodeId}:`, error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHistory();
  }, [nodeId]);

  if (isLoading) {
    return <div className="p-4 text-center text-sm text-gray-500">Cargando historial...</div>;
  }

  return (
    <div className="bg-gray-50 p-4 border-t border-gray-200">
      <h4 className="font-bold text-sm mb-2 text-gray-700">Historial de Alertas Recientes</h4>
      {history.length > 0 ? (
        <ul className="space-y-2">
          {history.map(alert => (
            <li key={alert.id} className="text-xs text-gray-600">
              <span className="font-semibold">{alert.tipo}</span> - {new Date(alert.hora).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-gray-500">Este nodo no tiene alertas registradas.</p>
      )}
    </div>
  );
}
