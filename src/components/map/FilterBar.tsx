// src/components/map/FilterBar.tsx
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

const ToggleSwitch = ({ label, name, checked, onChange }) => (
  <label htmlFor={name} className="flex items-center justify-between cursor-pointer">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <div className="relative">
      <input id={name} name={name} type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      <div className={`block w-12 h-6 rounded-full transition ${checked ? 'bg-red-500' : 'bg-gray-300'}`}></div>
      <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'translate-x-6' : ''}`}></div>
    </div>
  </label>
);

export default function FilterBar({ filters, setFilters, users, currentUser }: FilterBarProps) {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = e.target;
    const inputValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFilters(prev => ({ ...prev, [name]: inputValue }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-gray-700">Filtros</h3>
      <ToggleSwitch 
        label="Mostrar solo alertas"
        name="soloAlertas"
        checked={filters.soloAlertas}
        onChange={handleInputChange}
      />
      <hr className="border-gray-200" />
      <div>
        <label htmlFor="tipo-nodo" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Nodo</label>
        <select 
          id="tipo-nodo" name="tipo" value={filters.tipo} onChange={handleInputChange} 
          className="w-full text-sm bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">Todos los Tipos</option>
          <option value="sensor">Sensor</option>
          <option value="repetidor">Repetidor</option>
          <option value="central">Central</option>
        </select>
      </div>
      {currentUser?.role === 'admin' && (
        <div>
          <label htmlFor="usuario-filtro" className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
          <select 
            id="usuario-filtro" name="userId" value={filters.userId} onChange={handleInputChange} 
            className="w-full text-sm bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
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