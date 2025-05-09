import React, { useState } from "react";
import "../../PayrollManagement/SalaryManagement/SalaryManagement";
import { Table, Dropdown, Modal, Form, Button } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaAngleRight } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import anh from "../../../assets/hue.jpg";
// import ModalUpdatePayroll from "../ModalUpdate/ModalUpdatePayroll";
const SalaryHistoryEmployee = () => {
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
      paymentDate: "11/7/16",
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
      paymentDate: "7/21/19",
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
      paymentDate: "8/2/19",
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
      paymentDate: "8/2/19",
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
      paymentDate: "8/2/19",
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
      paymentDate: "8/2/19",
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
      paymentDate: "8/2/19",
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
      paymentDate: "8/2/19",
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
      paymentDate: "8/2/19",
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
      paymentDate: "8/2/19",
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
      paymentDate: "8/2/19",
    },
  ];

  const [showUpdate, setShowUpdate] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(employees.length / itemsPerPage) - 1) {
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
        currentPage >= Math.ceil(employees.length / itemsPerPage) - 1
          ? "disabled"
          : ""
      }`}
      onClick={handleNextPage}
      style={{
        cursor:
          currentPage >= Math.ceil(employees.length / itemsPerPage) - 1
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
          <div className="smh-fc">Salary Management</div>
        </div>
      </div>
      <div className="salary-management-content">
        <div className="smt-detail">
          <div className="smt-search">
            <div className="smt-search-container">
              <input
                type="search"
                placeholder="Search"
                className="smt-search-input"
              />
              <IoIosSearch className="smt-search-icon" />
            </div>
          </div>
          <div className="smt-table">
            <div className="container mt-4">
              <Table bordered hover className="smt-table-content">
                <thead style={{ backgroundColor: "#f5f5f5" }}>
                  <tr>
                    <th style={{ width: "80px" }}>Profile</th>
                    <th style={{ width: "50px" }}>ID</th>
                    <th style={{ width: "100px" }}>Phone</th>
                    <th style={{ width: "150px" }}>Department</th>
                    <th style={{ width: "170px" }}>Email</th>
                    <th style={{ width: "100px" }}>Basic Salary</th>
                    <th style={{ width: "100px" }}>Bonus</th>
                    <th style={{ width: "100px" }}>Deductions</th>
                    <th style={{ width: "100px" }}>Total Salary</th>
                    <th style={{ width: "100px" }}>Payment Date</th>
                    <th style={{ width: "50px" }}>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {currentItems.map((emp, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          width="30"
                          height="30"
                          style={{ borderRadius: "50%" }}
                        />
                      </td>
                      <td>{emp.id}</td>
                      <td>{emp.phone}</td>
                      <td>{emp.department}</td>
                      <td>{emp.email}</td>
                      <td>{emp.basicSalary.toLocaleString()}</td>
                      <td>{emp.bonus.toLocaleString()}</td>
                      <td>{emp.deductions.toLocaleString()}</td>
                      <td>{emp.totalSalary.toLocaleString()}</td>
                      <td>{emp.paymentDate}</td>
                      <td className="smt-action">
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="none"
                            id={`dropdown-${index}`}
                          >
                            <FaEllipsisV />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              href="#"
                              className="delete"
                              style={{ color: "red" }}
                            >
                              Delete
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setShowUpdate(true)}>
                              Update
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                              History Salary
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
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
                of {Math.ceil(employees.length / itemsPerPage)} pages
              </span>
            </label>
          </div>
        </div>
      </div>
      {/* <ModalUpdatePayroll show={showUpdate} setShow={setShowUpdate} /> */}
      <Modal show={showUpdate} className="modal-update" centered>
        <div className="update-pr-header">
          <div className="update-pr-header-title">Update</div>
          <div className="update-pr-header-user">
            <img src={anh} alt="" />
            Hue
          </div>
        </div>
        <div className="update-pr-main">
          <div className="update-pr-box">
            <div className="up-box-title">salary</div>
            <input type="text" />
          </div>
          <div className="update-pr-box">
            <div className="up-box-title">salary</div>
            <input type="text" />
          </div>
          <div className="update-pr-box">
            <div className="up-box-title">salary</div>
            <input type="text" />
          </div>
        </div>
        <div className="update-pr-footer">
          <div className="save" onClick={() => setShowUpdate(false)}>
            Save
          </div>
          <div className="cancel" onClick={() => setShowUpdate(false)}>
            Cancel
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SalaryHistoryEmployee;
