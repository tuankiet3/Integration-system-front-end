import React, { useEffect, useState } from "react";
import { Table, Dropdown, Modal, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaAngleRight } from "react-icons/fa6";
import { FaEllipsisV } from "react-icons/fa";
import {
  createEmployeeSalary,
  fetchEmployeeSalary,
  selectCurrentPageSalariesEmp,
  selectTotalPagesEmp,
  setCurrentPage,
} from "../../../features/salary/salarySlice";
import { useDispatch, useSelector } from "react-redux";

const NewEmpPayroll = () => {
  const dispatch = useDispatch();
  const totalPages = useSelector(selectTotalPagesEmp);
  const currentEmp = useSelector(selectCurrentPageSalariesEmp);
  const { loading, error, currentPage } = useSelector((state) => state.salary);

  const [showNewMonth, setShowNewMonth] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [newSalaryData, setNewSalaryData] = useState({
    employeeId: "",
    salaryMonth: "",
    baseSalary: "",
    bonus: "",
    deductions: "",
  });
  const handleNewSalaryInputChange = (e) => {
    const { name, value } = e.target;
    setNewSalaryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("newSalaryData", newSalaryData);
  };
  const handleAddSalary = (emp) => {
    setShowNewMonth(true);
    setSelectedSalary(emp);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0]; // Định dạng ngày tháng
    setNewSalaryData({
      employeeId: emp.employeeId,
      salaryMonth: formattedDate,
      baseSalary: "",
      bonus: "",
      deductions: "",
    });
  };

  useEffect(() => {
    dispatch(fetchEmployeeSalary());
  }, [dispatch]);

  const handleSaveNewSalary = async () => {
    const { employeeId, salaryMonth, baseSalary, bonus, deductions } =
      newSalaryData;
    if (!salaryMonth || !baseSalary || !bonus || !deductions) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    const newSalary = {
      employeeId,
      salaryMonth,
      baseSalary: parseFloat(baseSalary),
      bonus: parseFloat(bonus),
      deductions: parseFloat(deductions),
    };

    await dispatch(createEmployeeSalary(newSalary));
    setShowNewMonth(false);
    setNewSalaryData({
      employeeId: "",
      salaryMonth: "",
      baseSalary: "",
      bonus: "",
      deductions: "",
    });
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
          <div className="smh-fc">New Employee</div>
        </div>
      </div>
      <div className="salary-management-content">
        <div className="smt-detail" style={{ width: "100%" }}>
          <div className="smt-table">
            <div className="container mt-4">
              <Table bordered hover className="smt-table-content">
                <thead style={{ backgroundColor: "#f5f5f5" }}>
                  <tr>
                    <th style={{ padding: "15px 0" }}>Name</th>
                    <th style={{ padding: "15px 0" }}>Department</th>
                    <th style={{ padding: "15px 0" }}>Gender</th>
                    <th style={{ padding: "15px 0" }}>Phone Number</th>
                    <th style={{ padding: "15px 0" }}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {currentEmp.map((emp, index) => (
                    <tr key={index}>
                      <td style={{ padding: "15px 0" }}>{emp.fullName}</td>
                      <td style={{ padding: "15px 0" }}>{emp.departmentId}</td>
                      <td style={{ padding: "15px 0" }}>{emp.gender}</td>
                      <td style={{ padding: "15px 0" }}>{emp.phoneNumber}</td>
                      <td className="smt-action">
                        <Dropdown>
                          <Dropdown.Toggle variant="none" id="dropdown-basic">
                            <FaEllipsisV />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              className="delete"
                              style={{ color: "red" }}
                              onClick={() => handleAddSalary(emp)}
                            >
                              Add Salary
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
          <Modal show={showNewMonth} className="modal-update" centered>
            <div className="update-pr-header">
              <div className="update-pr-header-title">Add Salary</div>
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
      </div>
    </div>
  );
};

export default NewEmpPayroll;
