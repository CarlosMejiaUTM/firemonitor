// Este componente solo se encarga de mostrar los filtros.
// Recibe el estado de los filtros y la función para actualizarlos.
export default function AlertsFilterBar({ filters, handleFilterChange, handleApplyFilters, isLoading }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8 flex flex-wrap items-center gap-4">
      {/* Tipo */}
      <div className="flex-1 min-w-[150px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
        <select 
          name="tipo" 
          onChange={handleFilterChange} 
          value={filters.tipo} 
          className="w-full border-gray-300 rounded-md shadow-sm text-sm p-2"
        >
          <option value="">Todos los tipos</option>
          <option value="Fuego Detectado">Fuego</option>
          <option value="Humo Detectado">Humo</option>
          <option value="Temperatura Elevada">Temperatura</option>
        </select>
      </div>
      {/* Desde */}
      <div className="flex-1 min-w-[150px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
        <input 
          name="desde" 
          type="date" 
          onChange={handleFilterChange} 
          value={filters.desde} 
          className="w-full border-gray-300 rounded-md shadow-sm text-sm p-2"
        />
      </div>
      {/* Hasta */}
      <div className="flex-1 min-w-[150px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
        <input 
          name="hasta" 
          type="date" 
          onChange={handleFilterChange} 
          value={filters.hasta} 
          className="w-full border-gray-300 rounded-md shadow-sm text-sm p-2"
        />
      </div>
      {/* Botón */}
      <div className="pt-6">
        <button 
          onClick={handleApplyFilters} 
          className="bg-gray-800 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-gray-900" 
          disabled={isLoading}
        >
          {isLoading ? 'Cargando...' : 'Aplicar filtros'}
        </button>
      </div>
    </div>
  );
}