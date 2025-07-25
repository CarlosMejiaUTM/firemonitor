import React from 'react';
import { FiFilter, FiXCircle } from 'react-icons/fi'; // Importamos los iconos necesarios

// MEJORA: Se añade 'handleClearFilters' a los props para el nuevo botón.
export default function AlertsFilterBar({ filters, handleFilterChange, handleApplyFilters, handleClearFilters, isLoading }) {
  return (
    // MEJORA: Se eliminan los estilos de contenedor (fondo, sombra, margen) para que se integre mejor.
    // 'items-end' alinea todos los elementos en la parte inferior para un look perfecto.
    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-end gap-4">
      
      {/* Filtro por Tipo */}
      <div className="flex-grow min-w-[180px]">
        <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Alerta</label>
        <select 
          id="tipo"
          name="tipo" 
          onChange={handleFilterChange} 
          value={filters.tipo} 
          // MEJORA: Estilo de input unificado y con foco consistente.
          className="w-full border-gray-300 rounded-md p-2 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500"
        >
          <option value="">Todos los tipos</option>
          <option value="Fuego Detectado">Fuego</option>
          <option value="Humo Detectado">Humo</option>
          <option value="Temperatura Elevada">Temperatura</option>
        </select>
      </div>

      {/* Filtro por Fecha "Desde" */}
      <div className="flex-grow min-w-[150px]">
        <label htmlFor="desde" className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
        <input 
          id="desde"
          name="desde" 
          type="date" 
          onChange={handleFilterChange} 
          value={filters.desde} 
          className="w-full border-gray-300 rounded-md p-2 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Filtro por Fecha "Hasta" */}
      <div className="flex-grow min-w-[150px]">
        <label htmlFor="hasta" className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
        <input 
          id="hasta"
          name="hasta" 
          type="date" 
          onChange={handleFilterChange} 
          value={filters.hasta} 
          className="w-full border-gray-300 rounded-md p-2 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Botones de Acción */}
      <div className="flex items-center gap-2 pt-2 sm:pt-0">
        
        {/* MEJORA DE UX: Botón para limpiar filtros */}
        <button 
          onClick={handleClearFilters} 
          className="p-2.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
          title="Limpiar filtros"
          type="button" // Para evitar que envíe el formulario si estuviera dentro de un <form>
        >
          <FiXCircle size={20} />
        </button>

        {/* MEJORA: Botón principal con color primario, icono y spinner de carga. */}
        <button 
          onClick={handleApplyFilters} 
          className="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700 disabled:bg-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Aplicando...</span>
            </>
          ) : (
            <>
              <FiFilter className="mr-2" size={16} />
              <span>Aplicar</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}