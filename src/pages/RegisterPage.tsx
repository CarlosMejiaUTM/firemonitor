import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import RegisterForm from '../components/auth/RegisterForm';

// El componente ahora acepta un prop 'isAdminMode'
export default function RegisterPage({ isAdminMode = false }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    usuario: '',
    contrasena: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const auth = useAuth();
  const navigate = useNavigate();

  // --- AQUÍ ESTÁ LA CORRECCIÓN ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // La variable 'value' se extrae correctamente de e.target
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  // -----------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      await api.post('/auth/register', formData);

      if (isAdminMode) {
        setSuccessMessage(`¡Usuario '${formData.usuario}' creado exitosamente!`);
        setFormData({ nombre: '', apellido: '', correo: '', usuario: '', contrasena: '' });
        setTimeout(() => {
          setSuccessMessage('');
        }, 4000);
      } else {
        const loginResponse = await api.post('/auth/login', {
          usuario: formData.usuario,
          contrasena: formData.contrasena,
        });
        if (loginResponse.data.access_token) {
          auth.login(loginResponse.data.access_token);
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Ocurrió un error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <RegisterForm 
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