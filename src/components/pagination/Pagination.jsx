import React, { useState } from "react";
import styless from "./Pagination.module.css";

const Pagination = ({
  onPageCurrent,
  fixCount = 5,
  totalCount,
  fixPortion = 10,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalCount / fixCount);
  const pages = [];
  for (let i = 0; i <= totalPages; i++) {
    pages.push(i);
  }
  const portionCount = Math.ceil(totalPages / fixPortion);
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortion = (portionNumber - 1) * fixPortion + 1;
  const rightPortion = portionNumber * fixPortion;
  return (
    <div className={styless.paginationsContent}>
      {portionNumber > 1 && (
        <button onClick={() => setPortionNumber(portionNumber - 1)}>
          Prev
        </button>
      )}
      {pages
        .filter((page) => page >= leftPortion && page <= rightPortion)
        .map((page) => {
          return (
            <span
              key={page}
              className={
                page === currentPage
                  ? styless.paginationsActive
                  : styless.paginations
              }
              onClick={() => {
                onPageCurrent(page);
              }}
            >
              {page}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
