import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Ajusta la ruta para salir de /auth y /components

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Idealmente, aquí muestras un componente de Spinner o una pantalla de carga
    return <div>Cargando...</div>;
  }

  if (!isLoading && !isAuthenticated) {
    // Si ya terminó de cargar y no está autenticado, lo mandas al login
    return <Navigate to="/login" replace />;
  }

  // Si todo está bien, muestras la página solicitada
  return <Outlet />;
}