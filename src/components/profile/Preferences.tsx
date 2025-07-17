// src/components/profile/Preferences.tsx

import ToggleSwitch from './ToggleSwitch';

export default function Preferences() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Preferencias</h2>
      <div className="space-y-6">
        <ToggleSwitch
          label="Notificaciones por correo"
          description="Recibir alertas por correo electrónico"
        />
        <ToggleSwitch
          label="Notificaciones push"
          description="Recibir alertas en el navegador"
        />
      </div>
    </div>
  );
}