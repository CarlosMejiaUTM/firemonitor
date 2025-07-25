import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FiGrid, FiMap, FiBell, FiUser, FiSettings, FiLogOut,
  FiArrowLeftCircle, FiArrowRightCircle, FiUserPlus, FiChevronDown, 
  FiHardDrive, FiUsers, FiCpu
} from "react-icons/fi";

const NavItem = ({ to, icon, text, active, isOpen, onClick = () => {} }) => {
  const commonClasses = "flex items-center gap-4 p-3 rounded-lg transition-colors w-full";
  const activeClasses = "bg-red-50 text-red-600 font-semibold";
  const inactiveClasses = "hover:bg-gray-100 text-gray-600";

  const content = (
    <>
      {active && <div className="absolute left-0 h-6 w-1 bg-red-600 rounded-r-full"></div>}
      <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center">{icon}</span>
      <span className={`whitespace-nowrap transition-opacity duration-200 ${isOpen ? "opacity-100 delay-100" : "opacity-0"}`}>
        {text}
      </span>
    </>
  );

  const tooltip = (
    <div className={`absolute left-full ml-4 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md shadow-sm 
      transition-all duration-200 scale-0 origin-left group-hover:scale-100
      ${isOpen ? 'hidden' : 'block z-50'}`}
    >
      {text}
    </div>
  );

  if (to) {
    return <Link to={to} className={`relative group ${commonClasses} ${active ? activeClasses : inactiveClasses}`}>{content}{tooltip}</Link>;
  }

  return <button onClick={onClick} className={`relative group ${commonClasses} ${active ? activeClasses : inactiveClasses}`}>{content}{tooltip}</button>;
};

export default function Sidebar({ isOpen, setIsOpen }) {
  const [isManagementMenuOpen, setManagementMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname.startsWith(path);
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const baseNavLinks = [
    { to: "/dashboard", icon: <FiGrid />, text: "Dashboard" },
    { to: "/mapa", icon: <FiMap />, text: "Mapa" },
    { to: "/alertas", icon: <FiBell />, text: "Alertas" },
  ];

  const managementLinks = [
    { to: "/users/add", icon: <FiUserPlus />, text: "Añadir Usuario" },
    { to: "/nodes/create", icon: <FiCpu />, text: "Crear Nodos" },
    { to: "/nodes/manage", icon: <FiHardDrive />, text: "Gestión de Nodos" },
    { to: "/users/manage", icon: <FiUsers />, text: "Gestión de Usuarios" },
  ];

  return (
    <aside 
      className={`relative h-full bg-white text-gray-700 flex flex-col border-r border-gray-200
        transition-all duration-300 ease-in-out z-30
        ${isOpen ? 'w-64' : 'w-24'}`}
    >
      <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="text-red-500 text-3xl flex-shrink-0">🔥</span>
          <span className={`font-bold text-xl whitespace-nowrap transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}>
            FireMonitor
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-4 top-8 p-1.5 bg-white border-2 border-red-500 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors"
        >
          {isOpen ? <FiArrowLeftCircle size={20} /> : <FiArrowRightCircle size={20} />}
        </button>
      </div>

      <nav className="flex-1 py-4 px-4 space-y-2 overflow-y-auto">
        {baseNavLinks.map((link) => (
          <NavItem key={link.to} {...link} active={isActive(link.to)} isOpen={isOpen} />
        ))}

        {user?.role === 'admin' && (
          <div className="pt-2">
             <hr className="border-gray-100 my-2" />
            <button
              onClick={() => isOpen && setManagementMenuOpen(!isManagementMenuOpen)}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-gray-600 ${isOpen ? 'hover:bg-gray-100 cursor-pointer' : 'cursor-default'}`}
            >
              <div className="flex items-center gap-4">
                <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center"><FiSettings /></span>
                <span className={`whitespace-nowrap transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}>Gestión</span>
              </div>
              {isOpen && <FiChevronDown className={`transition-transform duration-200 ${isManagementMenuOpen ? 'rotate-180' : ''}`} />}
            </button>
            {isOpen && isManagementMenuOpen && (
              <div className="pl-12 pt-2 space-y-1">
                {managementLinks.map((link) => (
                  <Link key={link.to} to={link.to} className={`flex items-center gap-3 p-2 rounded-lg text-sm transition-colors ${isActive(link.to) ? "text-red-600 font-semibold" : "text-gray-500 hover:text-gray-900"}`}>
                    {link.icon} <span>{link.text}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>
      
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.usuario || 'U'}&background=f87171&color=fff&bold=true`}
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className={`flex flex-col transition-opacity duration-200 whitespace-nowrap overflow-hidden ${isOpen ? "opacity-100" : "opacity-0"}`}>
            <span className="font-semibold text-sm">{user?.usuario || 'Invitado'}</span>
            <span className="text-xs text-gray-500 capitalize">{user?.role || ''}</span>
          </div>
        </div>
        <div className="mt-2">
            <NavItem
                onClick={handleLogout}
                icon={<FiLogOut className="text-gray-600" />}
                text="Cerrar sesión"
                isOpen={isOpen}
            />
        </div>
      </div>
    </aside>
  );
}