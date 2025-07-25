// src/components/layout/MainLayout.tsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // <-- Inicia abierto en desktop

  return (
    // MEJORA: 'h-screen' y 'overflow-hidden' evitan el scroll de la página completa.
    <div className="flex bg-gray-100 h-screen overflow-hidden">
      
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
        
        {/* MEJORA: Esta área es la única que tendrá scroll, no toda la página. */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


import { FiMenu, FiSearch, FiBell } from 'react-icons/fi';

function Topbar({ onMenuClick }) {
  return (
    <header className="bg-white p-4 flex items-center justify-between sticky top-0 z-20 flex-shrink-0 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden text-gray-600 hover:text-red-500">
          <FiMenu size={24} />
        </button>
        <div className="relative hidden md:block">
          <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            placeholder="Buscar nodos, alertas..."
            className="bg-gray-50 rounded-full pl-10 pr-4 py-2 text-sm w-80 focus:ring-2 focus:ring-red-500 focus:outline-none border border-gray-200"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative text-gray-600 hover:text-red-500">
          <FiBell size={22} />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </button>
        <div className="w-10 h-10 rounded-full bg-gray-300">
          <img 
            src={`https://ui-avatars.com/api/?name=US&background=f87171&color=fff&bold=true`}
            alt="Avatar de usuario"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}