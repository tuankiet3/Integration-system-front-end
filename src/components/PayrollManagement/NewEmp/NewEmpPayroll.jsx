import React, { useEffect, useState } from "react";
import { Table, Dropdown, Modal, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaAngleRight } from "react-icons/fa6";
import { getEmployee } from "../../../Services/EmployeeController";
import { getSalary, postSalary } from "../../../Services/SalaryController";
import { FaEllipsisV } from "react-icons/fa";
const NewEmpPayroll = () => {
  // const employeeData = [
  //   {
  //     id: "A0B1C028",
  //     avatar: anh,
  //     phone: "123456789",
  //     department: "Support",
  //     email: "abc@gmail.com",
  //     basicSalary: 10000,
  //     bonus: 500,
  //     deductions: 200,
  //     totalSalary: 10300,
  //     paymentDate: "11/7/2016",
  //   },
  //   {
  //     id: "A0B1C086",
  //     avatar: anh,
  //     phone: "123456789",
  //     department: "QA",
  //     email: "abcxyzsds@gmail.com",
  //     basicSalary: 12000,
  //     bonus: 800,
  //     deductions: 300,
  //     totalSalary: 12500,
  //     paymentDate: "7/21/2019",
  //   },
  //   {
  //     id: "A0B1C025",
  //     avatar: anh,
  //     phone: "123456789",
  //     department: "People Ops",
  //     email: "abc@gmail.com",
  //     basicSalary: 11500,
  //     bonus: 700,
  //     deductions: 250,
  //     totalSalary: 11950,
  //     paymentDate: "11/7/16",
  //   },
  //   {
  //     id: "A0B1C044",
  //     avatar: anh,
  //     phone: "123456788",
  //     department: "IT",
  //     email: "abc@gmail.com",
  //     basicSalary: 13000,
  //     bonus: 1000,
  //     deductions: 400,
  //     totalSalary: 13800,
  //     paymentDate: "6/19/14",
  //   },
  //   {
  //     id: "A0B1C099",
  //     avatar: anh,
  //     phone: "123456789",
  //     department: "Customer",
  //     email: "abc@gmail.com",
  //     basicSalary: 10000,
  //     bonus: 500,
  //     deductions: 200,
  //     totalSalary: 10300,
  //     paymentDate: "7/11/19",
  //   },
  //   {
  //     id: "A0B1C095",
  //     avatar: anh,
  //     phone: "123456789",
  //     department: "Product",
  //     email: "abc@gmail.com",
  //     basicSalary: 11500,
  //     bonus: 800,
  //     deductions: 300,
  //     totalSalary: 12500,
  //     paymentDate: "8/2/25",
  //   },
  //   {
  //     id: "A0B1C0950",
  //     avatar: anh,
  //     phone: "123456789",
  //     department: "Product",
  //     email: "abc@gmail.com",
  //     basicSalary: 11500,
  //     bonus: 800,
  //     deductions: 300,
  //     totalSalary: 12500,
  //     paymentDate: "8/2/25",
  //   },
  //   {
  //     id: "A0B1C0980",
  //     avatar: anh,
  //     phone: "123456789",
  //     department: "Product",
  //     email: "abc@gmail.com",
  //     basicSalary: 11500,
  //     bonus: 800,
  //     deductions: 300,
  //     totalSalary: 12500,
  //     paymentDate: "8/2/25",
  //   },
  //   {
  //     id: "A0B1C0580",
  //     avatar: anh,
  //     phone: "123456789",
  //     department: "Product",
  //     email: "abc@gmail.com",
  //     basicSalary: 11500,
  //     bonus: 800,
  //     deductions: 300,
  //     totalSalary: 12500,
  //     paymentDate: "8/2/25",
  //   },
  //   {
  //     id: "A0B1C0580",
  //     avatar: anh,
  //     phone: "123456789",
  //     department: "Product",
  //     email: "abc@gmail.com",
  //     basicSalary: 11500,
  //     bonus: 800,
  //     deductions: 300,
  //     totalSalary: 12500,
  //     paymentDate: "8/2/25",
  //   },
  //   {
  //     id: "A0B1C0580",
  //     avatar: anh,
  //     phone: "123456789",
  //     department: "Product",
  //     email: "abc@gmail.com",
  //     basicSalary: 11500,
  //     bonus: 800,
  //     deductions: 300,
  //     totalSalary: 12500,
  //     paymentDate: "8/2/25",
  //   },
  //   {
  //     id: "A0B1C0580",
  //     avatar: anh,
  //     phone: "123456789",
  //     department: "Product",
  //     email: "abc@gmail.com",
  //     basicSalary: 11500,
  //     bonus: 800,
  //     deductions: 300,
  //     totalSalary: 12500,
  //     paymentDate: "8/2/25",
  //   },
  //   {
  //     id: "A0B1C0580",
  //     avatar: anh,
  //     phone: "123456789",
  //     department: "Product",
  //     email: "abc@gmail.com",
  //     basicSalary: 11500,
  //     bonus: 800,
  //     deductions: 300,
  //     totalSalary: 12500,
  //     paymentDate: "8/2/25",
  //   },
  //   {
  //     id: "A0B1C0580",
  //     avatar: anh,
  //     phone: "123456789",
  //     department: "Product",
  //     email: "abc@gmail.com",
  //     basicSalary: 11500,
  //     bonus: 800,
  //     deductions: 300,
  //     totalSalary: 12500,
  //     paymentDate: "8/2/25",
  //   },
  // ];

  const [employeeData, setEmployeeData] = useState([]);
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

  // Cập nhật lại danh sách nhân viên
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEmployee(); // Danh sách nhân viên
        const resSalary = await getSalary(); // Danh sách lương

        console.log("Danh sách nhân viên:", response.data);
        console.log("Danh sách lương:", resSalary.data);

        const employeesWithNoSalary = response.data.filter(
          (emp) =>
            !resSalary.data.some((sal) => sal.employeeId === emp.employeeId)
        );

        setEmployeeData(employeesWithNoSalary);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, []);
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

    const response = await postSalary(newSalary);
    console.log("response", response);
    setShowNewMonth(false);
    setNewSalaryData({
      employeeId: "",
      salaryMonth: "",
      baseSalary: "",
      bonus: "",
      deductions: "",
    });
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employeeData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(employeeData.length / itemsPerPage) - 1) {
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
        currentPage >= Math.ceil(employeeData.length / itemsPerPage) - 1
          ? "disabled"
          : ""
      }`}
      onClick={handleNextPage}
      style={{
        cursor:
          currentPage >= Math.ceil(employeeData.length / itemsPerPage) - 1
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
                  {currentItems.map((emp, index) => (
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
            {previousLabel}
            {nextLabel}
            <label className="current-page-label">
              Page <input type="text" value={currentPage + 1} readOnly />{" "}
              <span>
                {" "}
                of {Math.ceil(employeeData.length / itemsPerPage)} pages
              </span>
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
