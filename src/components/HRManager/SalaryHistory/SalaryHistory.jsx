// import React from 'react'
import { FaAngleRight } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SalaryHistory.scss";
import React, { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import { getSalaryHistoryByEmployeeID } from "../../../Services/ViewSalaryController";

const SalaryHistory = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchSalaryData = async () => {
<<<<<<< HEAD
      const employeeID = localStorage.getItem("Id");
      console.log("employeeID:", employeeID);
      if (!employeeID) return;
=======
        const employeeID = localStorage.getItem("Id");
        console.log("employeeID:", employeeID);
        if (!employeeID) return;
>>>>>>> 71b46df07f67c490f5b5aa06ba446a31155260b3

      console.log("Token đang dùng:", localStorage.getItem("token"));

      try {
        const data = await getSalaryHistoryByEmployeeID(employeeID);
        console.log("Fetched salary data:", data);
        setSalaryData(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Error fetching salary:", err);
      }
    };

    fetchSalaryData();
  }, []);

  // Lọc theo ngày tháng (chứa)
  const filteredData = salaryData.filter((salary) =>
    salary.salaryMonth?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="salary-history-container">
      <div className="salary-history-header">
        <div className="shh-title">
          <div className="shh-user">
            Hue <FaAngleRight />
          </div>
          <div className="shh-fc">Salary History</div>
        </div>
      </div>

      <div className="salary-history-content">
        <div className="shc-detail">
          <div className="shcd-search">
            <IoIosSearch className="shcd-search-icon" />
            <input
              type="text"
              placeholder="Search by month, eg: 2025-04"
              className="shcd-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="shcd-title">Your Salary History</div>

          <div className="shc-table">
            <div className="container mt-4">
              <Table bordered hover responsive>
                <thead style={{ backgroundColor: "#f5f5f5" }}>
                  <tr>
                    <th style={{ width: "170px" }}>Basic Salary</th>
                    <th style={{ width: "170px" }}>Bonus</th>
                    <th style={{ width: "170px" }}>Deductions</th>
                    <th style={{ width: "170px" }}>Total Salary</th>
                    <th style={{ width: "200px" }}>Payment Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((salary, index) => (
                      <tr key={index}>
                        <td>{salary.baseSalary?.toLocaleString()}</td>
                        <td>{salary.bonus?.toLocaleString()}</td>
                        <td>{salary.deductions?.toLocaleString()}</td>
                        <td>{salary.netSalary?.toLocaleString()}</td>
                        <td>
                          {salary.salaryMonth
                            ? new Date(salary.salaryMonth).toLocaleDateString(
                                "vi-VN",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                }
                              )
                            : ""}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No salary data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>

          <div className="shc-pagination">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              employees={filteredData}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryHistory;
