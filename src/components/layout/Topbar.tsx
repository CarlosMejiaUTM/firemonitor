import { FiMenu, FiSearch, FiBell } from 'react-icons/fi';

export default function Topbar({ onMenuClick }) {
  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-10">
      {/* Botón de Menú (Hamburguesa) para móvil */}
      <button onClick={onMenuClick} className="lg:hidden text-gray-600">
        <FiMenu size={24} />
      </button>

      {/* Barra de Búsqueda */}
      <div className="relative hidden md:block">
        <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        <input 
          type="text"
          placeholder="Buscar nodos, alertas..."
          className="bg-gray-100 rounded-full pl-10 pr-4 py-2 text-sm w-80 focus:ring-2 focus:ring-red-500 focus:outline-none"
        />
      </div>

      {/* Acciones de Usuario */}
      <div className="flex items-center gap-4">
        <button className="relative text-gray-600">
          <FiBell size={22} />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </button>
        <div className="w-9 h-9 rounded-full bg-gray-300">
          {/* Aquí iría la imagen del avatar del usuario */}
          <img 
            src="https://avatar.vercel.sh/user.png" // Placeholder de avatar
            alt="Avatar de usuario"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}