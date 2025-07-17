// src/components/profile/InfoField.tsx

import React from 'react';

// Un ícono simple de lápiz
const EditIcon = () => (
  <svg className="w-4 h-4 text-gray-400 hover:text-gray-700 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536l12.232-12.232z"></path></svg>
);

interface InfoFieldProps {
  label: string;
  value: string;
  isEditable?: boolean;
}

export default function InfoField({ label, value, isEditable = false }: InfoFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
      <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
        <span className="text-sm text-gray-900">{value}</span>
        {isEditable && <EditIcon />}
      </div>
    </div>
  );
}