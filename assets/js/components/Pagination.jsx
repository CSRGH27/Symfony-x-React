import React from "react";

const Pagination = ({ currentPage, itemsPerPage, length, onPageChange }) => {
  const pagesCount = Math.ceil(length / itemsPerPage);
  const pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <ul className="pagination pagination-sm">
        <li className="page-item">
          <button
            className="page-link"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            &laquo;
          </button>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={"page-item" + (currentPage === page ? " active" : "")}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}

        <li className="page-item">
          <button
            disabled={currentPage === pagesCount}
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </div>
  );
};

Pagination.getData = (items, currentPage, itemsPerPage) => {
  const start = currentPage * itemsPerPage - itemsPerPage;
  return items.slice(start, start + itemsPerPage);
};

export default Pagination;
