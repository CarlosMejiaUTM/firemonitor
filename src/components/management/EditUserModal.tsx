import React, { useState, useEffect } from 'react';
import { FiSave, FiXCircle } from 'react-icons/fi';

// Definimos la estructura del objeto User para usarla en el componente
interface User {
  id: string;
  nombre: string;
  apellido: string;
  role: 'admin' | 'user';
  // Añade otros campos del usuario si son necesarios
}

// Definimos los tipos de las props que el componente recibe
interface Props {
  user: User;
  onSave: (user: User) => void;
  onClose: () => void;
  isSaving: boolean;
}

const EditUserModal: React.FC<Props> = ({ user, onSave, onClose, isSaving }) => {
  const [formData, setFormData] = useState<User>(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value as User['role'] }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Editar Usuario</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FiXCircle size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
            <input
              type="text"
              name="apellido"
              id="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
           <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rol</label>
            <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-5 mt-2 border-t">
            <button type="button" onClick={onClose} disabled={isSaving} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50">
              Cancelar
            </button>
            <button type="submit" disabled={isSaving} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50">
              <FiSave /> {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
