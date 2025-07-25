import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
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
import AssignNodePage from './pages/AssignNodePage';
import CreateNodePage from './pages/CreateNodePage';

function PrivateLayout() {
  const { isAuthenticated, isLoading } = useAuth(); // <--- Obtén isLoading

  if (isLoading) {
    // Mientras se verifica el token, muestra un mensaje o un spinner
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    // Si ya no está cargando y no está autenticado, redirige
    return <Navigate to="/login" replace />;
  }
  
  // Si todo está correcto, muestra el layout principal con las páginas anidadas
  return <MainLayout />;
}

function App() {
  return (
    <Routes>
      {/* --- RUTAS PÚBLICAS --- */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* --- RUTAS PRIVADAS --- */}
      <Route element={<PrivateLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mapa" element={<MapPage />} />
        <Route path="/alertas"element={<AlertsPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        {/* --- RUTAS DE GESTIÓN --- */}
        <Route path="/users/add" element={<RegisterPage isAdminMode={true} />} />
        <Route path="/nodes/manage" element={<NodeManagementPage />} />
        <Route path="/users/manage" element={<UserManagementPage />} />
        <Route path="/nodes/create" element={<CreateNodePage />} />
      </Route>

      {/* Redirección por defecto */}
      <Route path="/" element={<Navigate to="/dashboard" />} /> {/* Mejorado para redirigir al dashboard si ya está logueado */}
    </Routes>
  );
}

export default App;