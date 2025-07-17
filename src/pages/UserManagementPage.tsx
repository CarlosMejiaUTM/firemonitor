import { useFireMonitor } from '../hooks/useFireMonitor';
import api from '../api/api';
import UserManagementListItem from '../components/management/UserManagementListItem';

export default function UserManagementPage() {
  // Obtenemos todos los usuarios y todos los nodos del hook
  const { users, nodes } = useFireMonitor();

  const handleEditUser = (user) => {
    // Lógica para abrir un modal de edición
    alert(`Funcionalidad de editar para '${user.usuario}' no implementada.`);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario? Esta acción es irreversible.")) {
      alert(`Funcionalidad de eliminar para el usuario ${userId} no implementada.`);
      // En una implementación real, aquí iría la llamada a la API:
      // try {
      //   await api.delete(`/users/${userId}`);
      //   alert('Usuario eliminado exitosamente.');
      //   // Aquí se necesitaría una función para refrescar la lista de usuarios en el hook
      // } catch (error) {
      //   alert('Error al eliminar el usuario.');
      // }
    }
  };

  const handleSendRecovery = async (email) => {
    if (window.confirm(`¿Enviar correo de recuperación de contraseña a ${email}?`)) {
      try {
        // La API debe tener un endpoint para esto, por ejemplo /auth/forgot-password
        await api.post('/auth/forgot-password', { correo: email });        alert('Correo de recuperación enviado exitosamente.');
      } catch (error) {
        console.error('Error al enviar correo de recuperación:', error);
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
            // Para cada usuario, filtramos la lista completa de nodos
            // para encontrar los que le pertenecen.
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
          <p className="p-8 text-center text-gray-500 bg-white rounded-lg shadow-md">No hay usuarios registrados en el sistema.</p>
        )}
      </div>
    </div>
  );
}
