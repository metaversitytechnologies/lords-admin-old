import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    // Simple logic for now: show all if <= 7, otherwise condensed logic could be added
    // For this task, getting basic 1, 2, 3... functional is priority.
    // Let's implement a simple sliding window or just basic list.
    
    // Logic: Always show first, last, current, and neighbours.
    // 1 ... 4 [5] 6 ... 10

    const maxVisibleButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = startPage + maxVisibleButtons - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? "active" : ""}`}
        >
          <button
            type="button"
            className="page-link"
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };

  return (
    <ul className="pagination my-0 b-pagination justify-content-end">
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button
          type="button"
          className="page-link"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          «
        </button>
      </li>
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button
          type="button"
          className="page-link"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ‹
        </button>
      </li>
      
      {renderPageNumbers()}

      <li
        className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
      >
        <button
          type="button"
          className="page-link"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ›
        </button>
      </li>
      <li
        className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
      >
        <button
          type="button"
          className="page-link"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
