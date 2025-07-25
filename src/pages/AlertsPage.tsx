import { useState, useEffect } from 'react';
import AlertsTable from '../components/alerts/AlertsTable';
import Pagination from '../components/alerts/Pagination';
import AlertsFilterBar from '../components/alerts/AlertsFilterBar';
import AlertDetailModal from '../components/alerts/AlertDetailModal';
import api from '../api/api';
import { useFireMonitor } from '../hooks/useFireMonitor';

export default function AlertsPage() {
  const { users } = useFireMonitor(); 
  const [alerts, setAlerts] = useState([]);
  const [filters, setFilters] = useState({ tipo: '', desde: '', hasta: '' });
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const fetchAlerts = async (page = 1, appliedFilters = filters) => {
    setIsLoading(true);
    const activeFilters = Object.fromEntries(
      Object.entries(appliedFilters).filter(([_, value]) => value)
    );
    
    try {
      const response = await api.get('/alerts', {
        params: {
          ...activeFilters,
          page,
          limit: pagination.limit,
        }
      });
      
      const { data, total } = response.data; 
      setAlerts(data || []);
      setPagination(prev => ({ 
        ...prev, 
        page, 
        total,
        totalPages: Math.ceil(total / prev.limit) || 1
      }));
    } catch (error) {
      console.error("Error al cargar las alertas:", error);
      setAlerts([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAlerts(1);
  }, []);

  const handleViewDetails = (alert) => {
    setSelectedAlert(alert);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAlert(null);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      fetchAlerts(newPage, filters);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleApplyFilters = () => {
    fetchAlerts(1, filters);
  };

  return (
    <>
      <div className={`p-4 sm:p-6 lg:p-8 transition-all duration-300 ${isModalOpen ? 'blur-sm pointer-events-none' : ''}`}>
        {/* --- Encabezado de la página --- */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Historial de Alertas</h1>
          <p className="text-gray-600 mt-1">Busca, filtra y visualiza todas las alertas detectadas por el sistema.</p>
        </div>

        {/* MEJORA: Contenedor principal tipo "card" que agrupa filtros, tabla y paginación. */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          
          {/* SECCIÓN DE FILTROS */}
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <AlertsFilterBar
              filters={filters}
              handleFilterChange={handleFilterChange}
              handleApplyFilters={handleApplyFilters}
              isLoading={isLoading}
            />
          </div>
          
          {/* MEJORA: Contenedor con altura mínima para evitar saltos y manejar los estados de carga y vacío. */}
          <div className="min-h-[480px]">
            {isLoading ? (
              // ESTADO DE CARGA
              <div className="flex flex-col items-center justify-center h-full p-10">
                <svg className="animate-spin h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-4 text-gray-600 font-medium">Cargando alertas...</p>
              </div>
            ) : alerts.length > 0 ? (
              // TABLA CON RESULTADOS
              <AlertsTable alerts={alerts} users={users} onViewDetails={handleViewDetails} />
            ) : (
              // ESTADO VACÍO
              <div className="flex flex-col items-center justify-center h-full text-center p-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <h3 className="mt-4 text-lg font-semibold text-gray-800">No se encontraron alertas</h3>
                <p className="mt-1 text-gray-500">Intenta ajustar los filtros o revisa más tarde.</p>
              </div>
            )}
          </div>
          
          {/* SECCIÓN DE PAGINACIÓN */}
          {pagination.total > 0 && (
             <div className="p-4 border-t border-gray-200">
              <Pagination 
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                totalResults={pagination.total}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>

      {/* El modal se mantiene fuera del flujo principal para superponerse correctamente */}
      {isModalOpen && (
        <AlertDetailModal alert={selectedAlert} onClose={handleCloseModal} users={users}/>
      )}
    </>
  );
}