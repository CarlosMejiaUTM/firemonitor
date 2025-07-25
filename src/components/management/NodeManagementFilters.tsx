import React from 'react';
import { FiCpu, FiUsers, FiXCircle } from 'react-icons/fi';

export default function NodeManagementFilters({ filters, setFilters, users, currentUser, onClearFilters }) {
  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    // MEJORA: Se eliminan los estilos de contenedor y se usa un layout flex más robusto.
    <div className="flex flex-col sm:flex-row sm:items-end gap-4">
      
      {/* Filtro por Tipo */}
      <div className="flex-1 min-w-[180px]">
        <label htmlFor="tipo-filter" className="flex items-center text-sm font-medium text-gray-700 mb-1">
          <FiCpu className="mr-2 h-4 w-4 text-gray-400" />
          Filtrar por Tipo
        </label>
        <select 
          id="tipo-filter"
          name="tipo" 
          value={filters.tipo} 
          onChange={handleInputChange} 
          className="w-full text-sm bg-white border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">Todos los Tipos</option>
          <option value="sensor">Sensor</option>
          <option value="repetidor">Repetidor</option>
          <option value="central">Central</option>
        </select>
      </div>
      
      {/* Filtro por Usuario (SOLO PARA ADMINS) */}
      {currentUser?.role === 'admin' && (
        <div className="flex-1 min-w-[180px]">
          <label htmlFor="user-filter" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <FiUsers className="mr-2 h-4 w-4 text-gray-400" />
            Filtrar por Usuario
          </label>
          <select 
            id="user-filter"
            name="userId" 
            value={filters.userId} 
            onChange={handleInputChange} 
            className="w-full text-sm bg-white border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Todos los Usuarios</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.nombre} {user.apellido}</option>
            ))}
          </select>
        </div>
      )}

      {/* MEJORA: Botón para limpiar/restablecer los filtros */}
      <div className="flex-shrink-0">
        <button 
          onClick={onClearFilters}
          className="p-2.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
          title="Limpiar filtros"
        >
          <FiXCircle size={20} />
        </button>
      </div>
    </div>
  );
}