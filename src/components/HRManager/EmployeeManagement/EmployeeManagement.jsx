// import React from 'react';
import "./EmployeeManagement.scss";
import React, { useState } from "react";
import { Table, Dropdown, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { FaEllipsisV } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import "bootstrap/dist/css/bootstrap.min.css";
import plus from "../../../assets/plus.png";

const EmployeeManagement = () => {
  // Sample employee data
  const initialEmployees = [
    { id: "AOBTNC028", name: "Jeremy Neibour Bella", phone: "123456789", department: "Support", email: "abc@gmail.com", status: "Part-time", joiningDate: "9/23/16", job: "abc" },
    { id: "AOBTNC088", name: "Annette Bi", phone: "123456789", department: "QA", email: "abc@gmail.com", status: "On-Contract", joiningDate: "7/27/13", job: "abc" },
    { id: "AOBTNC025", name: "Theresa Wu", phone: "123456789", department: "People Ops", email: "abc@gmail.com", status: "Seasonal", joiningDate: "11/7/16", job: "abc" },
    { id: "AOBTNC044", name: "Kathryn Mt", phone: "123456789", department: "IT", email: "abc@gmail.com", status: "Part-time", joiningDate: "6/19/14", job: "abc" },
    { id: "AOBTNC099", name: "Courtney H", phone: "123456789", department: "Customer Success", email: "abc@gmail.com", status: "Full-time", joiningDate: "7/11/19", job: "abc" },
    { id: "AOBTNC095", name: "Jane Coop", phone: "123456789", department: "Product", email: "abc@gmail.com", status: "Full-time", joiningDate: "8/2/19", job: "abc" },
  ];

  const [employees] = useState(initialEmployees);
  // const [showUpdate, setShowUpdate] = useState(flase);
  
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

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

  // Function to get status badge color
  const getStatusClass = (status) => {
    switch (status) {
      case "Part-time":
        return "bg-warning text-dark";
      case "On-Contract":
        return "bg-primary text-white";
      case "Seasonal":
        return "bg-danger text-white";
      case "Full-time":
        return "bg-success text-white";
      default:
        return "bg-secondary text-white";
    }
  };
    
  return (
    <div className='employee-management-container'>
      <div className="employee-management-header">
        <div className="emh-title">
          <div className="emh-user">Hue <FaAngleRight /> </div>
          <div className="emh-fc">Employee Management</div>
        </div>
        <div className="emh-button">
          <button className="emh-button-addemp">
            <img src={plus} alt="" className="emh-button-addemp-icon"/>
            Add Employee
            </button>
        </div>
      </div>

      <div className="employee-management-content">
        <div className="emc-detail">
          <div className="emcd-search">
            <IoIosSearch className="smt-search-icon" />
            <input type="text" placeholder='Search' className="emcd-search-input" />
          </div>
          <div className="emcd-title">Employee List</div>
          <div className="emc-table">
            <div className="container mt-4">
              <Table bordered hover responsive className="emc-table">
                <thead style={{ backgroundColor: "#f5f5f5" }}>
                  <tr>
                    <th style={{ width: "110px" }}>Profile</th>
                    <th style={{ width: "50px" }}>ID</th>
                    <th style={{ width: "100px" }}>Phone</th>
                    <th style={{ width: "100px" }}>Department</th>
                    <th style={{ width: "170px" }}>Email</th>
                    <th style={{ width: "100px" }}>Status</th>
                    <th style={{ width: "100px" }}>Joining date</th>
                    <th style={{ width: "100px" }}>Job</th>
                    <th style={{ width: "50px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((employee, index) => (
                    <tr key={index}>
                      {["name", "id", "phone", "department", "email", "joiningDate", "job"].map((field) => {
                        const isLongText = employee[field].length > 15; // Kiểm tra nếu nội dung dài hơn 15 ký tự
                        return (
                          <td key={field} className="td-hover" data-long={isLongText}>
                            <span>{employee[field]}</span>
                          </td>
                        );
                      })}
                      <td>
                        <span className={`badge ${getStatusClass(employee.status)}`}>
                          {employee.status}
                        </span>
                      </td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle variant="none" id={`dropdown-${index}`} className="no-caret">
                            <FaEllipsisV />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Update</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="emc-pagination">
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
        </div>
      </div>
    </div>
  )
}

export default EmployeeManagement;