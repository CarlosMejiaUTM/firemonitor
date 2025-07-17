import { useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Íconos
import {
  FiGrid, FiMap, FiBell, FiUser, FiSettings, FiLogOut,
  FiArrowLeftCircle, FiArrowRightCircle, FiUserPlus, FiChevronDown, 
  FiHardDrive, FiUsers, FiShare2, FiCpu // <-- Añadimos FiCpu
} from "react-icons/fi";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isManagementMenuOpen, setManagementMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Enlaces base para todos los usuarios
  const baseNavLinks = [
    { to: "/dashboard", icon: <FiGrid />, text: "Dashboard" },
    { to: "/mapa", icon: <FiMap />, text: "Mapa" },
    { to: "/alertas", icon: <FiBell />, text: "Alertas" },
    { to: "/perfil", icon: <FiUser />, text: "Perfil" },
  ];

  // Enlaces del submenú de gestión, ahora con "Crear Nodos"
  const managementLinks = useMemo(() => {
    const links = [
      { to: "/users/add", icon: <FiUserPlus />, text: "Añadir Usuario" },
      { to: "/nodes/create", icon: <FiCpu />, text: "Crear Nodos" }, // <-- ENLACE AÑADIDO
      { to: "/nodes/manage", icon: <FiHardDrive />, text: "Gestión de Nodos" },
      { to: "/users/manage", icon: <FiUsers />, text: "Gestión de Usuarios" },
    ];
    return links;
  }, []);


  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <aside
      className={`h-screen bg-white text-gray-700 flex flex-col shadow-lg relative transition-all duration-300 ease-in-out ${isOpen ? "w-64" : "w-20"}`}
    >
      {/* Botón para colapsar/expandir */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-9 z-10 p-1.5 bg-white border-2 border-red-500 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <FiArrowLeftCircle /> : <FiArrowRightCircle />}
      </button>

      {/* Logo y Título */}
      <div className="flex items-center gap-3 h-20 px-6 border-b border-gray-200 flex-shrink-0">
        <span className="text-red-500 text-3xl">🔥</span>
        <span className={`font-bold text-xl transition-opacity duration-300 whitespace-nowrap ${isOpen ? "opacity-100" : "opacity-0"}`}>
          FireMonitor
        </span>
      </div>

      {/* Navegación */}
      <nav className="flex-1 py-4 px-4 space-y-2 overflow-y-auto">
        {baseNavLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${isActive(link.to) ? "bg-red-50 text-red-600 font-semibold" : "hover:bg-gray-100"}`}
          >
            <span className="text-2xl min-w-[28px]">{link.icon}</span>
            <span className={`whitespace-nowrap transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>{link.text}</span>
          </Link>
        ))}

        {/* Menú de Gestión (SOLO PARA ADMINS) */}
        {user?.role === 'admin' && (
          <div>
            <button
              onClick={() => setManagementMenuOpen(!isManagementMenuOpen)}
              className="w-full flex items-center justify-between gap-4 p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl min-w-[28px]"><FiSettings /></span>
                <span className={`whitespace-nowrap transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>Gestión</span>
              </div>
              {isOpen && (
                <FiChevronDown className={`transition-transform duration-200 ${isManagementMenuOpen ? 'rotate-180' : ''}`} />
              )}
            </button>

            {isManagementMenuOpen && isOpen && (
              <div className="pl-8 pt-2 space-y-1">
                {managementLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-3 p-2 rounded-lg text-sm transition-colors ${isActive(link.to) ? "bg-red-50 text-red-600 font-semibold" : "hover:bg-gray-100"}`}
                  >
                    {link.icon}
                    <span>{link.text}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>
      
      {/* Separador y Perfil */}
      <div className="px-4 py-2 flex-shrink-0">
        <hr className="border-gray-200" />
      </div>
      <div className="p-4 space-y-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <img
            src="https://ui-avatars.com/api/?name=Carlos+Perez&background=random"
            alt="Avatar de usuario"
            className="w-10 h-10 rounded-full"
          />
          <div className={`flex flex-col transition-opacity duration-300 whitespace-nowrap overflow-hidden ${isOpen ? "opacity-100" : "opacity-0"}`}>
            <span className="font-semibold text-sm">{user?.usuario || 'Invitado'}</span>
            <span className="text-xs text-gray-500">{user?.role || ''}</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <FiLogOut className="text-2xl text-red-500" />
          <span className={`text-red-500 font-medium whitespace-nowrap transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
            Cerrar sesión
          </span>
        </button>
      </div>
    </aside>
  );
}
