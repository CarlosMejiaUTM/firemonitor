import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

// --- Componentes Auxiliares para un código más limpio ---

const UserCell = ({ user }) => (
  <div className="flex items-center gap-3">
    <img
      className="h-10 w-10 rounded-full object-cover"
      src={`https://ui-avatars.com/api/?name=${user.nombre}+${user.apellido}&background=random&color=fff&bold=true`}
      alt={`${user.nombre} ${user.apellido}`}
    />
    <div>
      <p className="font-medium text-gray-900">{user.nombre} {user.apellido}</p>
      <p className="text-sm text-gray-500 md:hidden">{user.correo}</p>
    </div>
  </div>
);

const RoleBadge = ({ role }) => {
  const is_admin = role === 'admin';
  const styles = {
    dot: is_admin ? "bg-red-500" : "bg-green-500",
    main: is_admin ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800",
  };
  
  return (
    <div className={`inline-flex items-center gap-x-2 px-2.5 py-1 rounded-full text-xs font-bold ${styles.main}`}>
      <span className={`h-2 w-2 rounded-full ${styles.dot}`}></span>
      <span className="capitalize">{role}</span>
    </div>
  );
};

// --- Componente Principal de la Tabla ---

export default function UsersTable({ users, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 hidden md:table-header-group">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Nombre Completo</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Usuario</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Correo</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Rol</th>
            <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="block md:table-row border-b md:border-none hover:bg-gray-50 transition-colors">
              
              {/* --- Celda Nombre (con Avatar) --- */}
              <td className="px-6 py-4 whitespace-nowrap block md:table-cell">
                <span className="font-bold text-xs text-gray-500 uppercase md:hidden">Usuario: </span>
                <UserCell user={user} />
              </td>

              {/* --- Otras Celdas (con etiquetas para móvil) --- */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 block md:table-cell">
                <span className="font-bold text-xs text-gray-500 uppercase md:hidden">Username: </span>
                {user.usuario}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                <span className="font-bold text-xs text-gray-500 uppercase md:hidden">Correo: </span>
                {user.correo}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm block md:table-cell">
                <span className="font-bold text-xs text-gray-500 uppercase md:hidden">Rol: </span>
                <RoleBadge role={user.role} />
              </td>

              {/* --- Celda Acciones --- */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium block md:table-cell md:text-right">
                <div className="flex items-center gap-2 md:justify-end">
                  <button onClick={() => onEdit(user)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors" title="Editar usuario">
                    <FiEdit size={16} />
                  </button>
                  <button onClick={() => onDelete(user.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors" title="Eliminar usuario">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}