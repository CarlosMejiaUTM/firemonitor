import React, { useState } from 'react';
import { useFireMonitor } from '../hooks/useFireMonitor';
import api from '../api/api';
import UserManagementListItem from '../components/management/UserManagementListItem';
// CORRECCIÓN FINAL: Se vuelve a la importación por defecto.
import EditUserModal from '../components/management/EditUserModal'; 

// 1. Definir las interfaces para los datos
interface User {
  id: string;
  nombre: string;
  apellido: string;
  usuario: string;
  correo: string;
  role: 'admin' | 'user';
}

interface Node {
  id: string;
  userId: string;
  // Añade otros campos del nodo que necesites
}

const UserManagementPage: React.FC = () => {
  // Asumimos que el hook devuelve los datos ya tipados. Si no, hacemos un cast.
  const { users, nodes, refreshData } = useFireMonitor() as { users: User[], nodes: Node[], refreshData?: () => void };

  // 2. Tipar los estados para el modal
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // 3. Tipar las funciones
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  const handleSaveUser = async (updatedUser: User) => {
    setIsSaving(true);
    try {
      const payload = {
        nombre: updatedUser.nombre,
        apellido: updatedUser.apellido,
        role: updatedUser.role,
      };
      await api.patch(`/users/${updatedUser.id}`, payload);
      alert('Usuario actualizado exitosamente.');
      
      if (refreshData) refreshData();
      
      handleCloseModal();
    } catch (error: any) {
      console.error('Error al actualizar el usuario:', error);
      alert('Error al actualizar el usuario: ' + (error.response?.data?.message || ''));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      try {
        await api.delete(`/users/${userId}`);
        alert('Usuario eliminado exitosamente.');
        if (refreshData) refreshData();
      } catch (error) {
        alert('Error al eliminar el usuario.');
      }
    }
  };

  const handleSendRecovery = async (email: string) => {
    if (window.confirm(`¿Enviar correo de recuperación a ${email}?`)) {
      try {
        await api.post('/auth/forgot-password', { correo: email });
        alert('Correo de recuperación enviado.');
      } catch (error) {
        console.error('Error al enviar correo:', error);
        alert('Error al enviar el correo de recuperación.');
      }
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Usuarios</h1>
        <p className="text-gray-600 mt-1">Administra los usuarios, sus roles y los nodos que tienen asignados.</p>
      </div>
      
      <div className="space-y-3">
        {users.length > 0 ? (
          users.map(user => {
            const assignedNodes = nodes.filter(node => node.userId === user.id);
            return (
              <UserManagementListItem 
                key={user.id}
                user={user}
                assignedNodes={assignedNodes}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                onSendRecovery={handleSendRecovery}
              />
            );
          })
        ) : (
          <p className="p-8 text-center text-gray-500 bg-white rounded-lg shadow-md">No hay usuarios registrados.</p>
        )}
      </div>

      {/* 4. Renderizar el modal solo si hay un usuario para editar */}
      {editingUser && (
        <EditUserModal 
          user={editingUser}
          onSave={handleSaveUser}
          onClose={handleCloseModal}
          isSaving={isSaving}
        />
      )}
    </div>
  );
};

export default UserManagementPage;
