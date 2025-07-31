import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

export function DefaultRedirect() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Muestra un estado de carga mientras se determina la autenticación
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  // Si el usuario está autenticado, lo redirige al dashboard.
  // Si no lo está, lo redirige al login.
  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
}