import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Asumo que la ruta es correcta
import ResetPasswordPage from "./pages/ResetPasswordPage";

// Layouts
import MainLayout from './components/layout/MainLayout';

// Pages
import Login from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import MapPage from './pages/Map';
import AlertsPage from './pages/AlertsPage';
import ProfilePage from './pages/ProfilePage';
import NodeManagementPage from './pages/NodeManagementPage';
import UserManagementPage from './pages/UserManagementPage';
import CreateNodePage from './pages/CreateNodePage';

/**
 * Componente de capa de seguridad.
 * Verifica la autenticación antes de renderizar el layout principal.
 */
function PrivateLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Muestra un estado de carga mientras se verifica el token.
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  if (!isAuthenticated) {
    // Si no está autenticado, redirige a la página de login.
    return <Navigate to="/login" replace />;
  }
  
  // Si está autenticado, renderiza el MainLayout, que a su vez renderizará las páginas hijas.
  return <MainLayout />;
}

const App: React.FC = () => {
  return (
    // El <BrowserRouter> ha sido eliminado de aquí.
    // Debe estar en tu archivo `main.tsx`.
    <Routes>
      {/* --- RUTAS PÚBLICAS (Accesibles sin iniciar sesión) --- */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* --- RUTAS PRIVADAS (Requieren iniciar sesión y usan el MainLayout) --- */}
      <Route element={<PrivateLayout />}>
        {/* El `Outlet` en `MainLayout` renderizará estas rutas hijas */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mapa" element={<MapPage />} />
        <Route path="/alertas" element={<AlertsPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        
        {/* --- RUTAS DE GESTIÓN --- */}
        <Route path="/users/add" element={<RegisterPage />} />
        <Route path="/nodes/manage" element={<NodeManagementPage />} />
        <Route path="/users/manage"element={<UserManagementPage />} />
        <Route path="/nodes/create" element={<CreateNodePage />} />
      </Route>

      {/* --- REDIRECCIÓN POR DEFECTO --- */}
      {/* Si se accede a la raíz, redirige al dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* Opcional: Una ruta "catch-all" para páginas no encontradas */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
