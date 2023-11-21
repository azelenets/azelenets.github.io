import React from 'react';
import PropTypes from 'prop-types';

function Pagination({
  itemsPerPage, totalItems, paginate, currentPage,
}) {
  const pageNumbers = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="blog-pagination text-center">
      <ul>
        {currentPage === 1 ? null : (
          <li>
            <a onClick={(e) => paginate(e, currentPage - 1)} href="!#" aria-label="First page">
              <i className="icon-arrow-left" />
            </a>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={currentPage === number ? 'is-active' : null}
          >
            <a onClick={(e) => paginate(e, number)} href="!#">
              {number}
            </a>
          </li>
        ))}
        {currentPage === pageNumbers[pageNumbers.length - 1] ? null : (
          <li>
            <a onClick={(e) => paginate(e, currentPage + 1)} href="!#" aria-label="Last page">
              <i className="icon-arrow-right" />
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
