import React, { useEffect, useState } from "react";
import "./SalaryManagement.scss";
import { Table, Dropdown, Modal } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaAngleRight } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import anh from "../../../assets/hue.jpg";
import { getSalary, postSalary } from "../../../Services/SalaryController";
import { getEmployee } from "../../../Services/EmployeeController";

const SalaryManagement = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [showNewMonth, setShowNewMonth] = useState(false);
  const [newSalaryData, setNewSalaryData] = useState({
    employeeId: "",
    salaryMonth: "",
    baseSalary: "",
    bonus: "",
    deductions: "",
  });

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSalary();
        const employeeResponse = await getEmployee();

        const employeeMap = {};
        employeeResponse.data.forEach((emp) => {
          employeeMap[emp.employeeId] = emp.fullName;
        });

        const enrichedSalaryData = response.data.map((salary) => ({
          ...salary,
          fullName: employeeMap[salary.employeeId] || "Unknown",
        }));

        setSalaryData(enrichedSalaryData);
      } catch (error) {
        console.error("Error fetching salaries:", error);
      }
    };

    fetchData();
  }, []);

  const handleNewMonthClick = (salary) => {
    setSelectedSalary(salary);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    setNewSalaryData({
      employeeId: salary.employeeId,
      salaryMonth: formattedDate,
      baseSalary: "",
      bonus: "",
      deductions: "",
    });
    setShowNewMonth(true);
  };

  const handleNewSalaryInputChange = (e) => {
    const { name, value } = e.target;
    setNewSalaryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveNewSalary = async () => {
    try {
      const newData = {
        employeeId: newSalaryData.employeeId,
        salaryMonth: newSalaryData.salaryMonth,
        baseSalary: parseFloat(newSalaryData.baseSalary || 0),
        bonus: parseFloat(newSalaryData.bonus || 0),
        deductions: parseFloat(newSalaryData.deductions || 0),
      };

      console.log("Data to be sent:", newData);

      const response = await postSalary(newData);
      console.log("API Response:", response);

      const updatedResponse = await getSalary();
      const employeeResponse = await getEmployee();

      const employeeMap = {};
      employeeResponse.data.forEach((emp) => {
        employeeMap[emp.employeeId] = emp.fullName;
      });

      const enrichedSalaryData = updatedResponse.data.map((salary) => ({
        ...salary,
        fullName: employeeMap[salary.employeeId] || "Unknown",
      }));

      setSalaryData(enrichedSalaryData);
      setShowNewMonth(false);
      setNewSalaryData({
        employeeId: "",
        salaryMonth: "",
        baseSalary: "",
        bonus: "",
        deductions: "",
      });
    } catch (error) {
      console.error("Error creating new salary record:", error);
      if (error.response) {
        console.error("Error details:", error.response.data);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const filteredEmployees = salaryData.filter((emp) =>
    emp.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="smh-fc">Salary Management</div>
        </div>
      </div>
      <div className="salary-management-content">
        <div className="smt-detail" style={{ width: "100%" }}>
          <div className="smt-search">
            <div className="smt-search-container">
              <input
                type="search"
                placeholder="Search"
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
                    <th>Profile</th>
                    <th>Basic Salary</th>
                    <th>Bonus</th>
                    <th>Deductions</th>
                    <th>Total Salary</th>
                    <th>Payment Day</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {currentItems.map((emp) => (
                    <tr key={emp.salaryID}>
                      <td>{emp.fullName}</td>
                      <td>{emp.baseSalary?.toLocaleString()}</td>
                      <td>{emp.bonus?.toLocaleString()}</td>
                      <td>{emp.deductions?.toLocaleString()}</td>
                      <td>{emp.netSalary?.toLocaleString()}</td>
                      <td>
                        {emp.salaryMonth
                          ? new Date(emp.salaryMonth).toLocaleDateString(
                              "vi-VN",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )
                          : ""}
                      </td>
                      <td className="smt-action">
                        <Dropdown>
                          <Dropdown.Toggle variant="none" id="dropdown-basic">
                            <FaEllipsisV />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              className="delete"
                              style={{ color: "red" }}
                              onClick={() => handleNewMonthClick(emp)}
                            >
                              New Month
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
                of {Math.ceil(filteredEmployees.length / itemsPerPage)} pages
              </span>
            </label>
          </div>
        </div>
      </div>

      <Modal show={showNewMonth} className="modal-update" centered>
        <div className="update-pr-header">
          <div className="update-pr-header-title">New Month</div>
          <div className="update-pr-header-user">
            <img src={anh} alt="User" />
            {selectedSalary?.fullName}
          </div>
        </div>
        <div className="update-pr-main">
          <div className="update-pr-box">
            <div className="up-box-title">Salary Month</div>
            <input
              type="date"
              name="salaryMonth"
              value={newSalaryData.salaryMonth}
              onChange={handleNewSalaryInputChange}
            />
          </div>
          <div className="update-pr-box">
            <div className="up-box-title">Basic Salary</div>
            <input
              type="number"
              name="baseSalary"
              value={newSalaryData.baseSalary}
              onChange={handleNewSalaryInputChange}
            />
          </div>
          <div className="update-pr-box">
            <div className="up-box-title">Bonus</div>
            <input
              type="number"
              name="bonus"
              value={newSalaryData.bonus}
              onChange={handleNewSalaryInputChange}
            />
          </div>
          <div className="update-pr-box">
            <div className="up-box-title">Deductions</div>
            <input
              type="number"
              name="deductions"
              value={newSalaryData.deductions}
              onChange={handleNewSalaryInputChange}
            />
          </div>
        </div>
        <div className="update-pr-footer">
          <div className="save" onClick={handleSaveNewSalary}>
            Save
          </div>
          <div className="cancel" onClick={() => setShowNewMonth(false)}>
            Cancel
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SalaryManagement;
