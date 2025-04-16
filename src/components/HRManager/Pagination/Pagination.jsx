import React from 'react'
import "./Pagination.scss";

const Pagination = ({ currentPage, setCurrentPage, employees, itemsPerPage }) => {

  const handlePreviousPage = () => {
      if (currentPage > 0){
      setCurrentPage(currentPage - 1);
      }
  }
      
  const handleNextPage = () => {
      if (currentPage < Math.ceil(employees.length / itemsPerPage) - 1){
      setCurrentPage(currentPage + 1);
      }
  }

  const previousLable = (
      <span
      className={`page-link ${currentPage === 0 ? "disabled" : ""}`}
      onClick={handlePreviousPage}
      style={{ cursor: currentPage === 0 ? "not-allowed" : "pointer" }}
      >
      Prev
      </span>
  );

  const nextLable = (
    <span
      className={`page-link ${
        currentPage === Math.ceil(employees.length / itemsPerPage) -1
          ? "disabled"
          : ""
      }`}
      onClick={handleNextPage}
      style={{ cursor: currentPage === Math.ceil(employees.length / itemsPerPage) -1 ? "not-allowed" : "pointer" }}
    >
      Next
    </span>
  );
  return (
    <div className='Pagination'>
        {previousLable}
        {nextLable}
        <label className="current-page-lable">
            Page: <input type="text" value={currentPage + 1} readOnly/>{" "}
            <span>
            {"  "}
            of {Math.ceil(employees.length / itemsPerPage)} Pages
            </span>
        </label>
    </div>
  )
}

export default Pagination