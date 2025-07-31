import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Pages
import Login from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Dashboard from './pages/Dashboard';
import MapPage from './pages/Map';
import AlertsPage from './pages/AlertsPage';
import ProfilePage from './pages/ProfilePage';
import NodeManagementPage from './pages/NodeManagementPage';
import UserManagementPage from './pages/UserManagementPage';
import CreateNodePage from './pages/CreateNodePage';

/**
 * Componente guardián para rutas privadas.
 * Si el usuario no está autenticado, lo redirige al login.
 * Si lo está, renderiza el layout principal con las rutas hijas.
 */
function PrivateRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />;
}

/**
 * Componente guardián para rutas públicas.
 * Si el usuario YA está autenticado, lo redirige al dashboard.
 * Si no, le permite ver la página pública (Login, Register, etc.).
 */
function PublicRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}


const App: React.FC = () => {
  return (
    <Routes>
      {/* --- Rutas Públicas --- 
          Solo accesibles si NO has iniciado sesión */}
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* --- Rutas Privadas --- 
          Solo accesibles si HAS iniciado sesión */}
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mapa" element={<MapPage />} />
        <Route path="/alertas" element={<AlertsPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/users/add" element={<RegisterPage />} />
        <Route path="/nodes/manage" element={<NodeManagementPage />} />
        <Route path="/users/manage" element={<UserManagementPage />} />
        <Route path="/nodes/create" element={<CreateNodePage />} />
        
        {/* Redirección por defecto si ya estás logueado */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default App;