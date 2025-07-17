import React from 'react';

export default function NodeManagementFilters({ filters, setFilters, users, currentUser }) {
  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap items-center gap-4">
      <div className="flex-1 min-w-[180px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Tipo</label>
        <select 
          name="tipo" 
          value={filters.tipo} 
          onChange={handleInputChange} 
          className="w-full text-sm bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Usuario</label>
          <select 
            name="userId" 
            value={filters.userId} 
            onChange={handleInputChange} 
            className="w-full text-sm bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Todos los Usuarios</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.nombre} {user.apellido}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
