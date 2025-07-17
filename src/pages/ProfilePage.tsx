// src/pages/ProfilePage.tsx

import PersonalInfo from '../components/profile/PersonalInfo';
import AssignedNode from '../components/profile/AssignedNode';
import Preferences from '../components/profile/Preferences';

// Datos de ejemplo para Carlos Mejía
const userProfile = {
    name: 'Carlos Mejía',
    email: 'carlos.mejia@ejemplo.com',
    phone: '+52 999 123 4567',
    registrationDate: '05/01/2023'
};

export default function ProfilePage() {
  return (
    <>
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Mi Perfil</h1>
        <p className="text-gray-600">Información personal y configuración</p>
      </div>

      <div className="space-y-8">
        {/* Header del Perfil */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white text-2xl font-bold">
            C
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">{userProfile.name}</p>
            <p className="text-sm text-gray-500">{userProfile.email}</p>
          </div>
        </div>
        
        <PersonalInfo user={userProfile} />
        <AssignedNode />
        <Preferences />

        {/* Botones de Acción */}
        <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
            <button className="bg-red-600 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-red-700">
                Cambiar contraseña
            </button>
            <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md text-sm font-semibold hover:bg-gray-300">
                Cerrar sesión
            </button>
        </div>
      </div>
    </>
  );
}