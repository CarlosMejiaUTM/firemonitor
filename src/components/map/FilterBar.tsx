import React from 'react';

interface FilterBarProps {
  filters: {
    soloAlertas: boolean;
    tipo: string;
    userId: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  users: { id: string; nombre: string; apellido: string }[];
  currentUser: { role: string } | null;
}

export default function FilterBar({ filters, setFilters, users, currentUser }: FilterBarProps) {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setFilters(prev => ({ ...prev, [name]: inputValue }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8 flex flex-wrap items-center gap-4">
      {/* Checkbox de Alertas */}
      <label className="flex items-center text-sm text-gray-700 cursor-pointer">
        <input 
          type="checkbox" name="soloAlertas"
          checked={filters.soloAlertas} onChange={handleInputChange}
          className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500 mr-2" 
        />
        Mostrar solo alertas
      </label>

      {/* Filtro por Tipo de Nodo */}
      <div className="flex-1 min-w-[150px]">
        <select name="tipo" value={filters.tipo} onChange={handleInputChange} className="w-full text-sm bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500">
          <option value="">Todos los Tipos</option>
          <option value="sensor">Sensor</option>
          <option value="repetidor">Repetidor</option>
          <option value="central">Central</option>
        </select>
      </div>

      {/* Filtro por Usuario (SOLO PARA ADMINS) */}
      {currentUser?.role === 'admin' && (
        <div className="flex-1 min-w-[150px]">
          <select name="userId" value={filters.userId} onChange={handleInputChange} className="w-full text-sm bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500">
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