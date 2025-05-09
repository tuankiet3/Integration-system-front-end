import React, { useState } from "react";
import { Table, Dropdown, Modal, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaAngleRight } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import anh from "../../../assets/hue.jpg";
import "./HistoryPayroll.scss";

const HistoryPayroll = () => {
  const employees = [
    {
      id: "A0B1C028",
      avatar: anh,
      phone: "123456789",
      department: "Support",
      email: "abc@gmail.com",
      basicSalary: 10000,
      bonus: 500,
      deductions: 200,
      totalSalary: 10300,
      paymentDate: "11/7/2016",
    },
    {
      id: "A0B1C086",
      avatar: anh,
      phone: "123456789",
      department: "QA",
      email: "abcxyzsds@gmail.com",
      basicSalary: 12000,
      bonus: 800,
      deductions: 300,
      totalSalary: 12500,
      paymentDate: "7/21/2019",
    },
    {
      id: "A0B1C025",
      avatar: anh,
      phone: "123456789",
      department: "People Ops",
      email: "abc@gmail.com",
      basicSalary: 11500,
      bonus: 700,
      deductions: 250,
      totalSalary: 11950,
      paymentDate: "11/7/16",
    },
    {
      id: "A0B1C044",
      avatar: anh,
      phone: "123456788",
      department: "IT",
      email: "abc@gmail.com",
      basicSalary: 13000,
      bonus: 1000,
      deductions: 400,
      totalSalary: 13800,
      paymentDate: "6/19/14",
    },
    {
      id: "A0B1C099",
      avatar: anh,
      phone: "123456789",
      department: "Customer",
      email: "abc@gmail.com",
      basicSalary: 10000,
      bonus: 500,
      deductions: 200,
      totalSalary: 10300,
      paymentDate: "7/11/19",
    },
    {
      id: "A0B1C095",
      avatar: anh,
      phone: "123456789",
      department: "Product",
      email: "abc@gmail.com",
      basicSalary: 11500,
      bonus: 800,
      deductions: 300,
      totalSalary: 12500,
      paymentDate: "8/2/25",
    },
    {
      id: "A0B1C0950",
      avatar: anh,
      phone: "123456789",
      department: "Product",
      email: "abc@gmail.com",
      basicSalary: 11500,
      bonus: 800,
      deductions: 300,
      totalSalary: 12500,
      paymentDate: "8/2/25",
    },
    {
      id: "A0B1C0980",
      avatar: anh,
      phone: "123456789",
      department: "Product",
      email: "abc@gmail.com",
      basicSalary: 11500,
      bonus: 800,
      deductions: 300,
      totalSalary: 12500,
      paymentDate: "8/2/25",
    },
    {
      id: "A0B1C0580",
      avatar: anh,
      phone: "123456789",
      department: "Product",
      email: "abc@gmail.com",
      basicSalary: 11500,
      bonus: 800,
      deductions: 300,
      totalSalary: 12500,
      paymentDate: "8/2/25",
    },
    {
      id: "A0B1C0580",
      avatar: anh,
      phone: "123456789",
      department: "Product",
      email: "abc@gmail.com",
      basicSalary: 11500,
      bonus: 800,
      deductions: 300,
      totalSalary: 12500,
      paymentDate: "8/2/25",
    },
    {
      id: "A0B1C0580",
      avatar: anh,
      phone: "123456789",
      department: "Product",
      email: "abc@gmail.com",
      basicSalary: 11500,
      bonus: 800,
      deductions: 300,
      totalSalary: 12500,
      paymentDate: "8/2/25",
    },
    {
      id: "A0B1C0580",
      avatar: anh,
      phone: "123456789",
      department: "Product",
      email: "abc@gmail.com",
      basicSalary: 11500,
      bonus: 800,
      deductions: 300,
      totalSalary: 12500,
      paymentDate: "8/2/25",
    },
    {
      id: "A0B1C0580",
      avatar: anh,
      phone: "123456789",
      department: "Product",
      email: "abc@gmail.com",
      basicSalary: 11500,
      bonus: 800,
      deductions: 300,
      totalSalary: 12500,
      paymentDate: "8/2/25",
    },
    {
      id: "A0B1C0580",
      avatar: anh,
      phone: "123456789",
      department: "Product",
      email: "abc@gmail.com",
      basicSalary: 11500,
      bonus: 800,
      deductions: 300,
      totalSalary: 12500,
      paymentDate: "8/2/25",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // Hàm xử lý tìm kiếm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0); // Reset về trang đầu tiên khi tìm kiếm
  };

  // Lọc dữ liệu dựa trên searchTerm
  const filteredEmployees = employees.filter((emp) => {
    return emp.paymentDate.includes(searchTerm);
  });

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredEmployees.length / itemsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousLabel = (
    <span
      className={`page-link ${currentPage === 0 ? "disabled" : ""}`}
      onClick={handlePreviousPage}
      style={{ cursor: currentPage === 0 ? "not-allowed" : "pointer" }}
    >
      Prev
    </span>
  );

  const nextLabel = (
    <span
      className={`page-link ${
        currentPage >= Math.ceil(filteredEmployees.length / itemsPerPage) - 1
          ? "disabled"
          : ""
      }`}
      onClick={handleNextPage}
      style={{
        cursor:
          currentPage >= Math.ceil(filteredEmployees.length / itemsPerPage) - 1
            ? "not-allowed"
            : "pointer",
      }}
    >
      Next
    </span>
  );

  return (
    <div className="salary-management-container">
      <div className="salary-management-header">
        <div className="smh-top">
          <div className="smh-user">
            Hue <FaAngleRight />
          </div>
          <div className="smh-fc">Salary History</div>
        </div>
      </div>
      <div className="salary-management-content">
        <div className="smt-detail" style={{ width: "100%" }}>
          <div className="smt-search">
            <div className="smt-search-container">
              <input
                type="search"
                placeholder="Search by Date, eg: 03/20/2024"
                className="smt-search-input"
                value={searchTerm}
                onChange={handleSearch}
              />
              <IoIosSearch className="smt-search-icon" />
            </div>
          </div>

          <div className="smt-table">
            <div className="container mt-4">
              <Table bordered hover className="smt-table-content">
                <thead style={{ backgroundColor: "#f5f5f5" }}>
                  <tr>
                    <th>Department</th>
                    <th>Basic Salary</th>
                    <th>Bonus</th>
                    <th>Deductions</th>
                    <th>Total Salary</th>
                    <th>Payment Date</th>
                  </tr>
                </thead>

                <tbody>
                  {currentItems.map((emp, index) => (
                    <tr key={index}>
                      <td style={{ padding: "15px 0" }}>{emp.department}</td>
                      <td style={{ padding: "15px 0" }}>
                        {emp.basicSalary.toLocaleString()}
                      </td>
                      <td style={{ padding: "15px 0" }}>
                        {emp.bonus.toLocaleString()}
                      </td>
                      <td style={{ padding: "15px 0" }}>
                        {emp.deductions.toLocaleString()}
                      </td>
                      <td style={{ padding: "15px 0" }}>
                        {emp.totalSalary.toLocaleString()}
                      </td>
                      <td style={{ padding: "15px 0" }}>{emp.paymentDate}</td>{" "}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="smt-pagination">
            {previousLabel}
            {nextLabel}
            <label className="current-page-label">
              Page <input type="text" value={currentPage + 1} readOnly />{" "}
              <span>
                {" "}
                of {Math.ceil(filteredEmployees.length / itemsPerPage)} pages
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPayroll;
