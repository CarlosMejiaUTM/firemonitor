import React from 'react';

export default function CreateNodeForm({ formData, handleInputChange, handleSubmit, isLoading, error, successMessage }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg mx-auto"
    >
      {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
      {successMessage && (
        <div 
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md" 
          role="alert"
        >
          <p className="font-bold">¡Nodo Creado!</p>
          <p>{successMessage}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Nombre del Nodo</label>
          <input
            type="text" name="nombre" value={formData.nombre} onChange={handleInputChange}
            placeholder="Ej: Sensor Selva Norte"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Tipo de Nodo</label>
          <select 
            name="tipo" 
            value={formData.tipo} 
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">-- Selecciona un tipo --</option>
            <option value="sensor">Sensor</option>
            <option value="repetidor">Repetidor</option>
            <option value="central">Central</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Latitud</label>
            <input
              type="number" step="any" name="lat" value={formData.coordenadas.lat} onChange={handleInputChange}
              placeholder="Ej: 20.975"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Longitud</label>
            <input
              type="number" step="any" name="lng" value={formData.coordenadas.lng} onChange={handleInputChange}
              placeholder="Ej: -89.621"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2.5 rounded-md hover:bg-red-700 font-semibold disabled:bg-red-400 transition-colors mt-6"
        disabled={isLoading}
      >
        {isLoading ? 'Creando Nodo...' : 'Crear Nodo'}
      </button>
    </form>
  );
}
