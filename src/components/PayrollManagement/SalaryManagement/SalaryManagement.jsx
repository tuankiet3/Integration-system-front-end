import React, { useEffect, useState } from "react";
import "./SalaryManagement.scss";
import { Table, Dropdown, Modal } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaAngleRight } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
<<<<<<< HEAD
import anh from "../../../assets/hue.jpg";
import { getSalary, postSalary } from "../../../Services/SalaryController";
import { getEmployee } from "../../../Services/EmployeeController";

const SalaryManagement = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
=======
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSalaries,
  createSalary,
  setCurrentPage,
  setSearchTerm,
  selectCurrentPageSalaries,
  selectTotalPages,
} from "../../../features/salary/salarySlice";

const SalaryManagement = () => {
  const dispatch = useDispatch();
  const currentSalaries = useSelector(selectCurrentPageSalaries);
  const totalPages = useSelector(selectTotalPages);
  const { loading, error, currentPage } = useSelector((state) => state.salary);

>>>>>>> 504e25a29de091e5a9d6cdfb5ed19f4ece79415c
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [showNewMonth, setShowNewMonth] = useState(false);
  const [newSalaryData, setNewSalaryData] = useState({
    employeeId: "",
    salaryMonth: "",
    baseSalary: "",
    bonus: "",
    deductions: "",
  });

<<<<<<< HEAD
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
=======
  useEffect(() => {
    dispatch(fetchSalaries());
  }, [dispatch]);
>>>>>>> 504e25a29de091e5a9d6cdfb5ed19f4ece79415c

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
<<<<<<< HEAD
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
=======
    const { employeeId, salaryMonth, baseSalary, bonus, deductions } =
      newSalaryData;
    if (!employeeId || !salaryMonth || !baseSalary || !bonus || !deductions) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const newData = {
        employeeId,
        salaryMonth,
        baseSalary: parseFloat(baseSalary),
        bonus: parseFloat(bonus),
        deductions: parseFloat(deductions),
      };

      await dispatch(createSalary(newData));
>>>>>>> 504e25a29de091e5a9d6cdfb5ed19f4ece79415c
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
<<<<<<< HEAD
      if (error.response) {
        console.error("Error details:", error.response.data);
      }
=======
>>>>>>> 504e25a29de091e5a9d6cdfb5ed19f4ece79415c
    }
  };

  const handleSearch = (e) => {
<<<<<<< HEAD
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

=======
    dispatch(setSearchTerm(e.target.value));
  };

  const handlePreviousPage = () => {
    dispatch(setCurrentPage(Math.max(0, currentPage - 1)));
  };

  const handleNextPage = () => {
    dispatch(setCurrentPage(Math.min(totalPages - 1, currentPage + 1)));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
>>>>>>> 504e25a29de091e5a9d6cdfb5ed19f4ece79415c
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
<<<<<<< HEAD
                value={searchTerm}
=======
>>>>>>> 504e25a29de091e5a9d6cdfb5ed19f4ece79415c
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
<<<<<<< HEAD
                  {currentItems.map((emp) => (
=======
                  {currentSalaries.map((emp) => (
>>>>>>> 504e25a29de091e5a9d6cdfb5ed19f4ece79415c
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
<<<<<<< HEAD
            {previousLabel}
            {nextLabel}
            <label className="current-page-label">
              Page <input type="text" value={currentPage + 1} readOnly />{" "}
              <span>
                {" "}
                of {Math.ceil(filteredEmployees.length / itemsPerPage)} pages
              </span>
=======
            <button
              className="page-link"
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
            >
              Prev
            </button>
            <button
              className="page-link"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
            >
              Next
            </button>
            <label className="current-page-label">
              Page <input type="text" value={currentPage + 1} readOnly />{" "}
              <span>of {totalPages} pages</span>
>>>>>>> 504e25a29de091e5a9d6cdfb5ed19f4ece79415c
            </label>
          </div>
        </div>
      </div>

      <Modal show={showNewMonth} className="modal-update" centered>
        <div className="update-pr-header">
          <div className="update-pr-header-title">New Month</div>
          <div className="update-pr-header-user">
<<<<<<< HEAD
            <img src={anh} alt="User" />
=======
>>>>>>> 504e25a29de091e5a9d6cdfb5ed19f4ece79415c
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
