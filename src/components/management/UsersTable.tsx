import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

export default function UsersTable({ users, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Nombre Completo</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Usuario</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Correo</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Rol</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.nombre} {user.apellido}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.usuario}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.correo}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                <button onClick={() => onEdit(user)} className="text-blue-600 hover:text-blue-900 transition-colors">
                  <FiEdit />
                </button>
                <button onClick={() => onDelete(user.id)} className="text-red-600 hover:text-red-900 transition-colors">
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
