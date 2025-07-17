import { useState, useEffect } from 'react';
import AlertsTable from '../components/alerts/AlertsTable';
import Pagination from '../components/alerts/Pagination';
import AlertsFilterBar from '../components/alerts/AlertsFilterBar';
import AlertDetailModal from '../components/alerts/AlertDetailModal';
import api from '../api/api';
import { useFireMonitor } from '../hooks/useFireMonitor'; // Importamos el hook

export default function AlertsPage() {
  // Obtenemos la lista de usuarios del hook para pasarla a la tabla
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
      <div className={`p-8 transition-all duration-300 ${isModalOpen ? 'blur-sm pointer-events-none' : ''}`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Mis Alertas</h1>
          <p className="text-gray-600">Historial de alertas detectadas</p>
        </div>

        <AlertsFilterBar
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleApplyFilters={handleApplyFilters}
          isLoading={isLoading}
        />
        
        {isLoading ? <p>Cargando alertas...</p> : <AlertsTable alerts={alerts} users={users} onViewDetails={handleViewDetails} />}
        
        <Pagination 
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          totalResults={pagination.total}
          onPageChange={handlePageChange}
        />
      </div>

      {isModalOpen && (
        <AlertDetailModal alert={selectedAlert} onClose={handleCloseModal} />
      )}
    </>
  );
}
