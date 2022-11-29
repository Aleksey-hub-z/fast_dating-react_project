import React from "react";
import _ from "lodash";

const Pagination = ({ totalUsers, pageSize, onPageChange, currentPage }) => {
  const totalPages = Math.ceil(totalUsers / pageSize);
  const pages = _.range(1, totalPages + 1);

  if (totalPages === 1) {
    return null;
  }

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={"page-item" + (page === currentPage ? " active" : "")}
            key={"page_" + page}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
