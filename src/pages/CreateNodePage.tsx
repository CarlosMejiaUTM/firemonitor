import { useState } from 'react';
import api from '../api/api';
import CreateNodeForm from '../components/management/CreateNodeForm';

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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'lat' || name === 'lng') {
      setFormData(prev => ({
        ...prev,
        coordenadas: {
          ...prev.coordenadas,
          [name]: value
        }
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
      // Como el admin está logueado, la API creará el nodo sin dueño
      const response = await api.post('/nodes', payload);

      setSuccessMessage(`Nodo '${response.data.nombre}' creado con ID: ${response.data.id}`);
      setFormData({ nombre: '', tipo: '', coordenadas: { lat: '', lng: '' }});

      setTimeout(() => setSuccessMessage(''), 5000);

    } catch (err) {
      setError(err.response?.data?.message || 'Ocurrió un error al crear el nodo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 max-w-lg mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800">Crear Nuevo Nodo</h1>
        <p className="text-gray-600 mt-1">
          Registra un nuevo dispositivo en el sistema. Podrás asignarlo a un usuario desde "Gestión de Nodos".
        </p>
      </div>
      <CreateNodeForm 
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        successMessage={successMessage}
      />
    </div>
  );
}
