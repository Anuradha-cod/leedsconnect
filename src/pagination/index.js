import React, { useEffect, useState, useMemo } from "react";
import Pagination from "react-bootstrap/Pagination";

const PaginationComponent = ({
  total = 0,
  itemsPerPage ,
  currentPage ,
  onPageChange
}) => {
    const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

    const paginationItems = useMemo(() => {
        const pages = [];
    
        for (let i = 1; i <= totalPages; i++) {
          pages.push(
            <Pagination.Item
              key={i}
              active={i === currentPage}
              onClick={() => onPageChange(i)}
            >
              {i}
            </Pagination.Item>
          );
        }
        return pages
    }, [totalPages, currentPage, onPageChange]);

    
  return (
    <Pagination className="justify-content-center">
    <Pagination.Prev
      onClick={() => onPageChange(currentPage-1)}
    />
    {paginationItems}
    <Pagination.Next
      onClick={() => onPageChange(currentPage+1)}
    />
  </Pagination>
  );
};

export default PaginationComponent;
