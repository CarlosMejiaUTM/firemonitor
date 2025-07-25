import { useState } from 'react';
import api from '../api/api';
import CreateNodeForm from '../components/management/CreateNodeForm';
import { FiCpu } from 'react-icons/fi';

export default function CreateNodePage() {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    coordenadas: {
      lat: '',
      lng: ''
    },
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // La función handleInputChange se pasa al formulario, pero el mapa necesita setFormData.
  // Así que pasaremos ambas para máxima compatibilidad.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'lat' || name === 'lng') {
      setFormData(prev => ({
        ...prev,
        coordenadas: { ...prev.coordenadas, [name]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    const payload = {
      ...formData,
      coordenadas: {
        lat: parseFloat(formData.coordenadas.lat),
        lng: parseFloat(formData.coordenadas.lng)
      }
    };

    try {
      const response = await api.post('/nodes', payload);
      setSuccessMessage(`Nodo '${response.data.nombre}' creado exitosamente.`);
      setFormData({ nombre: '', tipo: '', coordenadas: { lat: '', lng: '' }}); // Limpiar formulario

      setTimeout(() => setSuccessMessage(''), 5000);

    } catch (err) {
      setError(err.response?.data?.message || 'Ocurrió un error al crear el nodo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // MEJORA: Layout de página estándar con padding y espaciado.
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* MEJORA: Encabezado de página consistente con el resto del dashboard. */}
      <div className="flex items-center gap-4">
        <div className="bg-red-100 p-3 rounded-lg">
           <FiCpu className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Crear Nuevo Nodo</h1>
          <p className="text-gray-600 mt-1">
            Registra un nuevo dispositivo sensor en el sistema.
          </p>
        </div>
      </div>
      
      {/* MEJORA: El formulario ahora vive dentro de una tarjeta para consistencia visual. */}
      <div className="bg-white rounded-lg shadow-md">
        <CreateNodeForm 
          formData={formData}
          setFormData={setFormData} // MEJORA: Prop necesaria para el mapa interactivo.
          handleInputChange={handleInputChange} // Se mantiene por si se usa en otros campos.
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
          successMessage={successMessage}
        />
      </div>
    </div>
  );
}