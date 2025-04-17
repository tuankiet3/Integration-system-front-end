import React, { useEffect, useState } from "react";
import "./SalaryManagement.scss";
import { Table, Dropdown, Modal } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaAngleRight } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
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

  const [selectedSalary, setSelectedSalary] = useState(null);
  const [showNewMonth, setShowNewMonth] = useState(false);
  const [newSalaryData, setNewSalaryData] = useState({
    employeeId: "",
    salaryMonth: "",
    baseSalary: "",
    bonus: "",
    deductions: "",
  });

  useEffect(() => {
    dispatch(fetchSalaries());
  }, [dispatch]);

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
    }
  };

  const handleSearch = (e) => {
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
                  {currentSalaries.map((emp) => (
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
            </label>
          </div>
        </div>
      </div>

      <Modal show={showNewMonth} className="modal-update" centered>
        <div className="update-pr-header">
          <div className="update-pr-header-title">New Month</div>
          <div className="update-pr-header-user">
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
