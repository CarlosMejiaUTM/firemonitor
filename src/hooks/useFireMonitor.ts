import { useState, useEffect, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';

// --- Definición de Tipos ---
interface Coordinates {
  lat: number;
  lng: number;
}

interface Node {
  id: string;
  nombre: string;
  tipo: string;
  status: 'activo' | 'inactivo' | 'alerta';
  coordenadas?: Coordinates;
  userId?: string;
  ultimaActualizacion?: string;
  ultimaLectura?: {
    temperatura: number;
    humedad: number;
    humoDetectado: boolean;
    fuegoDetectado: boolean;
    concentracionGas?: number;
  } | null;
}

interface UserSummary {
  id: string;
  nombre: string;
  apellido: string;
  usuario: string;
}

interface Alert {
  id: string;
  tipo: string;
  severidad: 'Critica' | 'Alta' | 'Media';
  nodo: { id: string; nombre: string };
  hora: string;
}

interface HistoryReading {
  time: string;
  temperatura: number;
}

export function useFireMonitor() {
  const { user } = useAuth();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [liveAlerts, setLiveAlerts] = useState<Alert[]>([]);
  const [chartHistory, setChartHistory] = useState<HistoryReading[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refreshNodes = useCallback(async () => {
    try {
      const response = await api.get('/nodes');
      const fetchedNodes: Node[] = response.data;

      setNodes(fetchedNodes);

      // Si no hay nodo seleccionado, selecciona el primero automáticamente
      if (fetchedNodes.length > 0 && !selectedNodeId) {
        setSelectedNodeId(fetchedNodes[0].id);
      }
    } catch (error) {
      console.error("❌ Error al refrescar los nodos:", error);
    }
  }, [selectedNodeId]);

  useEffect(() => {
    async function fetchInitialData() {
      setIsLoading(true);
      try {
        await refreshNodes();

        if (user?.role === 'admin') {
          const usersResponse = await api.get('/users');
          setUsers(usersResponse.data || []);
        }
      } catch (error) {
        console.error("❌ Error en la carga de datos iniciales:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchInitialData();

    const socket: Socket = io(import.meta.env.VITE_API_URL);

    socket.on('connect', () => setIsConnected(true));
    socket.on('nodeUpdate', (updatedNode: Node) => {
      setNodes(prevNodes =>
        prevNodes.map(node => node.id === updatedNode.id ? updatedNode : node)
      );
    });
    socket.on('newAlert', (alert: Alert) => {
      setLiveAlerts(prevAlerts => [alert, ...prevAlerts]);
    });
    socket.on('disconnect', () => setIsConnected(false));

    return () => {
      socket.disconnect();
    };
  }, [user, refreshNodes]);

  useEffect(() => {
    if (!selectedNodeId) return;

    async function fetchNodeHistory() {
      try {
        const response = await api.get(`/nodes/${selectedNodeId}/history`);
        const history = response.data;

        const formattedHistory = history.map((reading: any) => ({
          time: new Date(reading.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          temperatura: reading.temperatura,
        }));

        setChartHistory(formattedHistory);
      } catch (error) {
        console.error("❌ Error al cargar historial del nodo:", error);
      }
    }

    fetchNodeHistory();
  }, [selectedNodeId]);

  const selectedNodeData = nodes.find(node => node.id === selectedNodeId) || null;

  // 👇 DEBUG opcional para desarrollo
  useEffect(() => {
    console.log({
      isLoading,
      nodes,
      selectedNodeId,
      selectedNodeData,
      liveAlerts
    });
  }, [isLoading, nodes, selectedNodeId, selectedNodeData, liveAlerts]);

  return {
    nodes,
    users,
    currentUser: user,
    selectedNodeId,
    selectedNodeData,
    liveAlerts,
    chartHistory,
    isConnected,
    isLoading,
    handleSelectNode: setSelectedNodeId,
    refreshNodes,
  };
}
