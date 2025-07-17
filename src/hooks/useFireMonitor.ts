import { useState, useEffect } from 'react';
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

  useEffect(() => {
    async function fetchInitialNodes() {
      try {
        const response = await api.get('/nodes');
        const initialNodes: Node[] = response.data;
        setNodes(initialNodes);
        if (initialNodes.length > 0 && !selectedNodeId) {
          setSelectedNodeId(initialNodes[0].id);
        }
      } catch (error) {
        console.error("Error al cargar nodos iniciales:", error);
      }
    }

    async function fetchUsers() {
      if (user?.role === 'admin') {
        try {
          const response = await api.get('/users');
          setUsers(response.data || []);
        } catch (error) {
          console.error("Error al cargar la lista de usuarios:", error);
        }
      }
    }

    fetchInitialNodes();
    fetchUsers();

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
  }, [user]);

  useEffect(() => {
    if (!selectedNodeId) return;

    async function fetchNodeHistory() {
      try {
        const response = await api.get(`/nodes/${selectedNodeId}/history`);
        const history = response.data;
        const formattedHistory = history.map((reading: any) => ({
          time: new Date(reading.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          temperatura: reading.temperatura,
        }));
        setChartHistory(formattedHistory);
      } catch (error) {
        console.error("Error al cargar el historial del nodo:", error);
      }
    }

    fetchNodeHistory();
  }, [selectedNodeId]);

  const selectedNodeData = nodes.find(node => node.id === selectedNodeId) || null;

  return {
    nodes,
    users,
    currentUser: user,
    selectedNodeId,
    selectedNodeData,
    liveAlerts,
    chartHistory,
    isConnected,
    handleSelectNode: setSelectedNodeId,
  };
}