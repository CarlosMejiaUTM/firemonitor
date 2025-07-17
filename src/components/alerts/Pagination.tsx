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
  if (totalResults === 0) return null;

  const startResult = (currentPage - 1) * limit + 1;
  const endResult = Math.min(currentPage * limit, totalResults);

  return (
    <div className="py-4 flex items-center justify-between">
      <p className="text-sm text-gray-700">
        Mostrando <span className="font-medium">{startResult}</span> a <span className="font-medium">{endResult}</span> de <span className="font-medium">{totalResults}</span> resultados
      </p>
      <div className="flex items-center gap-1">
        <button 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md text-gray-500 hover:bg-gray-200 disabled:opacity-50"
        >
          {"<"}
        </button>
        <span className="px-3 py-1 text-sm">Página {currentPage} de {totalPages}</span>
        <button 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md text-gray-500 hover:bg-gray-200 disabled:opacity-50"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}