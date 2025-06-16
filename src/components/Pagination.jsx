import { useCallback, useMemo } from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  // GitHub API limits to max 100 items per page and 1000 total results
  const MAX_VISIBLE_PAGES = 5;
  
  const getVisiblePageNumbers = useMemo(() => {
    // Return empty array if no pages
    if (!totalPages || totalPages <= 0) return [];
    
    const pages = [];
    
    if (totalPages <= MAX_VISIBLE_PAGES) {
      // If we have few pages, show all of them
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Calculate the range of visible pages around current page
      let startPage = Math.max(2, currentPage - Math.floor((MAX_VISIBLE_PAGES - 2) / 2));
      let endPage = Math.min(totalPages - 1, startPage + MAX_VISIBLE_PAGES - 3);
      
      // Adjust the start if we're near the end
      if (endPage >= totalPages - 1) {
        startPage = Math.max(2, totalPages - MAX_VISIBLE_PAGES + 2);
      }
      
      // If there's a gap after page 1, show ellipsis
      if (startPage > 2) {
        pages.push('...');
      }
      
      // Add the middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // If there's a gap before the last page, show ellipsis
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      
      // Always include last page if there is more than one page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  }, [currentPage, totalPages]);

  const handlePageClick = useCallback((page) => {
    if (page !== '...' && page !== currentPage) {
      onPageChange(page);
    }
  }, [currentPage, onPageChange]);
  
  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);
  
  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <nav className="inline-flex items-center">
        {/* First page button */}
        <button
          onClick={() => handlePageClick(1)}
          disabled={currentPage === 1}
          className={`hidden sm:block px-2 py-1 rounded-l-md border ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          aria-label="First Page"
        >
          &laquo;&laquo;
        </button>

        {/* Previous page button */}
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-3 py-1 ${currentPage === 1 ? '' : 'sm:rounded-none'} rounded-l-md border ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          aria-label="Previous"
        >
          &laquo;
        </button>
        
        {/* Page numbers */}
        <div className="hidden sm:flex">
          {getVisiblePageNumbers.map((page, index) => (
            <button
              key={`${page}-${index}`}
              onClick={() => handlePageClick(page)}
              disabled={page === '...'}
              className={`px-3 py-1 border-t border-b ${
                page === currentPage
                  ? 'bg-blue-600 text-white border-blue-600'
                  : page === '...'
                  ? 'bg-white text-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Mobile page indicator */}
        <div className="flex sm:hidden px-3 py-1 border-t border-b bg-white">
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
        </div>
        
        {/* Next page button */}
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 ${currentPage === totalPages ? '' : 'sm:rounded-none'} rounded-r-md border ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          aria-label="Next"
        >
          &raquo;
        </button>

        {/* Last page button */}
        <button
          onClick={() => handlePageClick(totalPages)}
          disabled={currentPage === totalPages}
          className={`hidden sm:block px-2 py-1 rounded-r-md border ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          aria-label="Last Page"
        >
          &raquo;&raquo;
        </button>
      </nav>
    </div>
  );
}

export default Pagination;