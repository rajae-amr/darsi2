import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalCount,
  itemsPerPage,
  onPageChange
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  
  if (totalCount <= itemsPerPage) {
    return null;
  }
  
  return (
    <div className="mt-8 flex justify-center">
      <nav className="flex items-center space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
        >
          السابق
        </button>
        
        {/* أرقام الصفحات */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(page => 
            page === 1 || 
            page === totalPages || 
            (page >= currentPage - 1 && page <= currentPage + 1)
          )
          .map((page, index, array) => (
            <React.Fragment key={page}>
              {index > 0 && array[index - 1] !== page - 1 && (
                <span className="px-2">...</span>
              )}
              <button
                className={`px-3 py-1 rounded-md ${
                  currentPage === page 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </React.Fragment>
          ))
        }
        
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50 mr-2"
        >
          التالي
        </button>
      </nav>
    </div>
  );
}
