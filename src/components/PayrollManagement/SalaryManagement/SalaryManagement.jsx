import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./SalaryManagement.scss";
import { Table, Dropdown } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
const SalaryManagement = () => {
  const employees = [
    {
      id: "A0B1C028",
      name: "Jeremy",
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
      name: "Annett",
      phone: "123456789",
      department: "QA",
      email: "abc@gmail.com",
      basicSalary: 12000,
      bonus: 800,
      deductions: 300,
      totalSalary: 12500,
      paymentDate: "7/21/19",
    },
    {
      id: "A0B1C025",
      name: "Therese",
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
      name: "Kathyr",
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
      name: "Courtn",
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
      name: "Jane C.",
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
      name: "Jane C.",
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
      name: "Jane C.",
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
      name: "Jane C.",
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
      name: "Jane C.",
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
      name: "Jane C.",
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
      name: "Jane C.",
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
      name: "Jane C.",
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
      name: "Jane C.",
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
      name: "Jane C.",
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
      name: "Jane C.",
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
  const [currentPage, setCurrentPage] = useState(0); // react-paginate starts from page 0
  const itemsPerPage = 5;

  // Tính toán các phần tử cần hiển thị trong bảng
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

  // Xử lý thay đổi trang
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected); // `selected` có sẵn từ react-paginate
  };
  return (
    <div className="salary-management-container">
      <div className="salary-management-header">
        <div className="smh-top">
          <div className="smh-user">Hue</div>
          <div className="smh-fc">Salary Management</div>
        </div>
      </div>
      <div className="salary-management-content">
        <div className="smt-detail">
          <div className="smt-search">
            <input type="search" placeholder="Search" />
          </div>
          <div className="smt-title">Announcements</div>
          <div className="smt-table">
            <div className="container mt-4">
              <Table bordered hover className="smt-table-content">
                <thead style={{ backgroundColor: "#f5f5f5" }}>
                  <tr>
                    <th>Profile</th>
                    <th>ID</th>
                    <th>Phone</th>
                    <th>Department</th>
                    <th>Email</th>
                    <th>Basic Salary</th>
                    <th>Bonus</th>
                    <th>Deductions</th>
                    <th>Total Salary</th>
                    <th>Payment Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {currentItems.map((emp, index) => (
                    <tr key={index}>
                      <td className="td-click">{emp.name}</td>
                      <td className="td-click">{emp.id}</td>
                      <td className="td-click">{emp.phone}</td>
                      <td className="td-click">{emp.department}</td>
                      <td className="td-click">{emp.email}</td>
                      <td className="td-click">
                        {emp.basicSalary.toLocaleString()}
                      </td>
                      <td className="td-click">{emp.bonus.toLocaleString()}</td>
                      <td className="td-click">
                        {emp.deductions.toLocaleString()}
                      </td>
                      <td className="td-click">
                        {emp.totalSalary.toLocaleString()}
                      </td>
                      <td className="td-click">{emp.paymentDate}</td>
                      <td className="smt-action">
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="none"
                            id={`dropdown-${index}`}
                          >
                            <FaEllipsisV />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item href="#">Delete</Dropdown.Item>
                            <Dropdown.Item href="#">Update</Dropdown.Item>
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

          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={Math.ceil(employees.length / itemsPerPage)} // Tổng số trang
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
          />
        </div>
      </div>
    </div>
  );
};

export default SalaryManagement;
