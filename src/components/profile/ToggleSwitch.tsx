// src/components/profile/ToggleSwitch.tsx

import { useState } from 'react';

interface ToggleSwitchProps {
  label: string;
  description: string;
  initialState?: boolean;
}

export default function ToggleSwitch({ label, description, initialState = true }: ToggleSwitchProps) {
  const [enabled, setEnabled] = useState(initialState);

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-800">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`${enabled ? 'bg-red-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out`}
      >
        <span
          className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}
        />
      </button>
    </div>
  );
}