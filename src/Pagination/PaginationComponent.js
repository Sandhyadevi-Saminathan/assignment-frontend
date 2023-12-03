import React from 'react';
import { Pagination } from 'react-bootstrap';

function PaginationComponent({ currentPage, totalPages, onPageChange }) {
  const handlePrevClick = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    onPageChange(currentPage + 1);
  };

  const renderPaginationItems = () => {
    const items = [];
    const displayRange = 7;
    let startPage = Math.max(1, currentPage - Math.floor(displayRange / 2));
    let endPage = Math.min(startPage + displayRange - 1, totalPages);

    if (endPage - startPage < displayRange - 1) {
      startPage = Math.max(1, endPage - displayRange + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <Pagination>
      {currentPage !== 1 && (
        <Pagination.Prev onClick={handlePrevClick} />
      )}
      {renderPaginationItems()}
      {currentPage !== totalPages && (
        <Pagination.Next onClick={handleNextClick} />
      )}
    </Pagination>
  );
}

export default PaginationComponent;
