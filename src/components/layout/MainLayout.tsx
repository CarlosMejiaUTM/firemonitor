import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
// La ruta ahora es correcta según tu estructura de archivos
import { useFireMonitor } from '../../hooks/useFireMonitor'; 

const MainLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // CORRECCIÓN: Se usan los nombres correctos que devuelve el hook: `users`, `nodes`, y `liveAlerts`.
  const { users, nodes, liveAlerts } = useFireMonitor();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex bg-gray-100 h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Topbar 
          onMenuClick={() => setIsSidebarOpen(true)} 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          // Pasa todos los datos al Topbar para que él pueda buscar
          allUsers={users}
          allNodes={nodes}
          // CORRECCIÓN: Se pasa `liveAlerts` al Topbar
          allAlerts={liveAlerts}
          clearSearch={() => setSearchTerm('')} // Función para limpiar la búsqueda
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* El Outlet ya no necesita pasar el searchTerm, su trabajo es solo renderizar la página */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
