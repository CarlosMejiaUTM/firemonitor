import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  onPageChange: (page: number) => void;
  limit?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalResults,
  onPageChange,
  limit = 10
}: PaginationProps) {
  // No se muestra nada si no hay resultados, lo cual es correcto.
  if (totalResults === 0) return null;

  const startResult = (currentPage - 1) * limit + 1;
  const endResult = Math.min(currentPage * limit, totalResults);

  return (
    // MEJORA: El layout se apila en móvil (flex-col) y se expande en desktop (sm:flex-row).
    <div className="py-2 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Información de resultados */}
      <div>
        <p className="text-sm text-gray-700">
          Mostrando <span className="font-medium text-gray-900">{startResult}</span> a <span className="font-medium text-gray-900">{endResult}</span> de <span className="font-medium text-gray-900">{totalResults}</span> resultados
        </p>
      </div>

      {/* Controles de Navegación */}
      <div className="flex items-center gap-2">
        {/* MEJORA: Botón con icono, borde y mejores estilos de estado. */}
        <button 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          className="flex items-center justify-center h-9 w-9 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Página anterior"
        >
          <FiChevronLeft size={20} />
        </button>
        
        <span className="px-3 py-1 text-sm text-gray-700">
          Página <span className="font-bold">{currentPage}</span> de <span className="font-bold">{totalPages}</span>
        </span>

        {/* MEJORA: Botón con icono, borde y mejores estilos de estado. */}
        <button 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className="flex items-center justify-center h-9 w-9 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Página siguiente"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}