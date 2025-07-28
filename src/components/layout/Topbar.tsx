import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiSearch, FiBell, FiUser, FiCpu, FiAlertTriangle } from 'react-icons/fi';
import api from '../../api/api'; // Asegúrate de que la ruta a tu instancia de api sea correcta

// --- Definición de Tipos ---
interface User { id: string; nombre: string; apellido: string; }
interface Node { id: string; nombre: string; }
interface Alert { id: string; tipo: string; nodo: { nombre: string }; hora: string; }

// Props que el Topbar espera recibir desde MainLayout
interface TopbarProps {
  onMenuClick: () => void;
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  allUsers: User[];
  allNodes: Node[];
  allAlerts: Alert[]; // Estas son las alertas en tiempo real del hook
  clearSearch: () => void;
}

// Resultado de búsqueda unificado
interface SearchResult {
  id: string;
  name: string;
  type: 'Usuario' | 'Nodo';
  path: string;
  icon: React.ReactElement;
}

const Topbar: React.FC<TopbarProps> = ({ 
  onMenuClick, 
  searchTerm, 
  onSearchChange, 
  allUsers = [], 
  allNodes = [], 
  allAlerts = [], 
  clearSearch 
}) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  // Nuevo estado para manejar la lista de notificaciones y su carga
  const [notificationList, setNotificationList] = useState<Alert[]>([]);
  const [isLoadingAlerts, setIsLoadingAlerts] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Lógica para la búsqueda global (sin cambios)
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }
    const userResults: SearchResult[] = allUsers.filter(u => `${u.nombre} ${u.apellido}`.toLowerCase().includes(searchTerm.toLowerCase())).map(u => ({ id: u.id, name: `${u.nombre} ${u.apellido}`, type: 'Usuario', path: '/users/manage', icon: <FiUser /> }));
    const nodeResults: SearchResult[] = allNodes.filter(n => n.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map(n => ({ id: n.id, name: n.nombre, type: 'Nodo', path: '/nodes/manage', icon: <FiCpu /> }));
    setSearchResults([...userResults, ...nodeResults]);
    setIsSearchOpen(true);
  }, [searchTerm, allUsers, allNodes]);

  // Lógica para cerrar los menús desplegables al hacer clic fuera (sin cambios)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) setIsSearchOpen(false);
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) setIsNotificationsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- NUEVA LÓGICA PARA NOTIFICACIONES ---
  // 1. Carga las alertas históricas la primera vez que se abre el panel
  useEffect(() => {
    const fetchRecentAlerts = async () => {
      if (isNotificationsOpen && notificationList.length === 0 && !isLoadingAlerts) {
        setIsLoadingAlerts(true);
        try {
          const response = await api.get('/alerts', { params: { page: 1, limit: 7 } });
          setNotificationList(response.data.data || []);
        } catch (error) {
          console.error("Error al cargar notificaciones:", error);
        } finally {
          setIsLoadingAlerts(false);
        }
      }
    };
    fetchRecentAlerts();
  }, [isNotificationsOpen, notificationList.length, isLoadingAlerts]);

  // 2. Añade las nuevas alertas (en tiempo real) que vienen del hook
  useEffect(() => {
    const newLiveAlerts = allAlerts.filter(
      liveAlert => !notificationList.some(existing => existing.id === liveAlert.id)
    );
    if (newLiveAlerts.length > 0) {
      setNotificationList(prevList => [...newLiveAlerts, ...prevList]);
    }
  }, [allAlerts, notificationList]);


  const handleResultClick = () => {
    clearSearch();
    setIsSearchOpen(false);
  };

  return (
    <header className="bg-white p-4 flex items-center justify-between sticky top-0 z-20 flex-shrink-0 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden text-gray-600 hover:text-red-500">
          <FiMenu size={24} />
        </button>
        <div className="relative hidden md:block" ref={searchRef}>
          <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            placeholder="Buscar en toda la aplicación..."
            value={searchTerm}
            onChange={onSearchChange}
            onFocus={() => setIsSearchOpen(searchResults.length > 0)}
            className="bg-gray-50 rounded-full pl-10 pr-4 py-2 text-sm w-80 focus:ring-2 focus:ring-red-500 focus:outline-none border border-gray-200"
          />
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute mt-2 w-full bg-white rounded-lg shadow-xl border z-40 max-h-80 overflow-y-auto">
              <ul>
                {searchResults.map((result) => (
                  <li key={`${result.type}-${result.id}`}>
                    <Link to={result.path} onClick={handleResultClick} className="p-3 hover:bg-red-50 flex items-center gap-3 border-b">
                      <span className="text-gray-500">{result.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{result.name}</p>
                        <p className="text-xs text-red-600">{result.type}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative" ref={notificationsRef}>
          <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="relative text-gray-600 hover:text-red-500">
            <FiBell size={22} />
            {notificationList.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
          </button>
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden border z-40">
              <div className="p-3 font-bold text-gray-800 border-b">Notificaciones</div>
              {isLoadingAlerts ? (
                <p className="p-4 text-sm text-center text-gray-500">Cargando...</p>
              ) : notificationList.length > 0 ? (
                <ul className="divide-y max-h-80 overflow-y-auto">
                  {notificationList.map(alert => (
                    <li key={alert.id} className="p-3 hover:bg-gray-50 flex items-start gap-3">
                      <FiAlertTriangle className="text-red-500 mt-1 flex-shrink-0" size={20}/>
                      <div>
                        <p className="text-sm text-gray-700">{alert.tipo} en <strong>{alert.nodo.nombre}</strong></p>
                        <p className="text-xs text-gray-400 mt-1">{new Date(alert.hora).toLocaleString()}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="p-4 text-sm text-center text-gray-500">No hay notificaciones nuevas.</p>
              )}
              <Link to="/alertas" onClick={() => setIsNotificationsOpen(false)} className="block text-center p-2 text-sm font-semibold text-red-600 bg-gray-50 hover:bg-gray-100 border-t">
                Ver historial de alertas
              </Link>
            </div>
          )}
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-300">
          <img 
            src={`https://ui-avatars.com/api/?name=US&background=f87171&color=fff&bold=true`}
            alt="Avatar de usuario"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
