import "./EmployeeManagement.scss";
import React, { useState, useEffect } from "react";
import { Table, Dropdown, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { FaEllipsisV, FaAngleRight } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import "bootstrap/dist/css/bootstrap.min.css";
import plus from "../../../assets/plus.png";
import Pagination from "../Pagination/Pagination";
import Swal from "sweetalert2";
import { getEmployee, getEmployeeID, addEmployee, updateEmployee, getDepartments, getPositions, handleDeleteEmployee } from "../../../Services/EmployeeController";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]); // Danh sách nhân viên gốc
  const [filteredEmployees, setFilteredEmployees] = useState([]); // Danh sách nhân viên đã lọc
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
  const [currentPage, setCurrentPage] = useState(0);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);

  // Lấy danh sách nhân viên, phòng ban, và vị trí khi component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeeData, deptData, posData] = await Promise.all([
          getEmployee(),
          getDepartments(),
          getPositions(),
        ]);
        setEmployees(employeeData);
        setFilteredEmployees(employeeData); // Khởi tạo danh sách đã lọc
        setDepartments(deptData);
        setPositions(posData);
      } catch (error) {
        console.error("❌ Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, []);

  // Hàm xử lý tìm kiếm
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setCurrentPage(0); // Reset về trang đầu khi tìm kiếm

    if (term.trim() === "") {
      setFilteredEmployees(employees); // Hiển thị toàn bộ danh sách nếu không có từ khóa
      return;
    }

    const filtered = employees.filter((employee) => {
      return (
        employee.id.toString().toLowerCase().includes(term) ||
        employee.name.toLowerCase().includes(term) ||
        employee.email.toLowerCase().includes(term) ||
        employee.department.toLowerCase().includes(term)
      );
    });

    setFilteredEmployees(filtered);
  };

  const itemsPerPage = 5;
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);

  // Function to get status badge color
  const getStatusClass = (status) => {
    switch (status) {
      case "working":
        return "bg-success text-white";
      case "quit":
        return "bg-danger text-dark";
      case "temporary":
        return "bg-warning text-dark";
      default:
        return "bg-secondary text-white";
    }
  };

  // Update employee function
  useEffect(() => {
    if (selectedEmployee) {
      setShowUpdate(true);
    }
  }, [selectedEmployee]);

  const handleUpdateClick = async (id) => {
    const employee = await getEmployeeID(id);
    if (!employee || !employee.id) {
      Swal.fire({
        icon: 'error',
        title: 'Không tìm thấy nhân viên!',
        text: 'Vui lòng thử lại.',
      });
      return;
    }
    setSelectedEmployee(employee);
    console.log("Employee data fetched:", employee);
  };


  const handleClose = () => {
    setShowUpdate(false);
    setSelectedEmployee(null);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const updatedEmployee = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      gender: formData.get("gender"),
      status: formData.get("status"),
      joiningDate: formData.get("joiningDate"),
      dateofBirth: formData.get("dateofBirth"),
      departmentId: formData.get("department"),
      positionId: formData.get("position"),
    };

    console.log("Selected Employee:", selectedEmployee);

    const result = await updateEmployee(selectedEmployee.id, updatedEmployee);
    if (result) {
      const updatedList = await getEmployee();
      setEmployees(updatedList);
      setFilteredEmployees(updatedList); // Cập nhật danh sách đã lọc
      handleClose();
    }
  };

  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    return dateStr.replaceAll("/", "-").slice(0, 10);
  };


  // Add employee
  const handleAddClose = () => {
    setShowAdd(false);
    setSelectedEmployee(null);
  };

  // Delete employee
  const handleDelete = (id) => {
    handleDeleteEmployee(id, (newEmployees) => {
      setEmployees(newEmployees);
      setFilteredEmployees(newEmployees); // Cập nhật danh sách đã lọc
    });
  };

  return (
    <div className="employee-management-container">
      <div className="employee-management-header">
        <div className="emh-title">
          <div className="emh-user">Hue <FaAngleRight /> </div>
          <div className="emh-fc">Employee Management</div>
        </div>
        <div className="emh-button">
          <button className="emh-button-addemp" onClick={() => setShowAdd(true)}>
            <img src={plus} alt="" className="emh-button-addemp-icon" />
            Add Employee
          </button>
        </div>
      </div>

      <div className="employee-management-content">
        <div className="emc-detail" style={{ width: "100%" }}>
          <div className="emcd-search">
            <IoIosSearch className="smt-search-icon" />
            <input
              type="text"
              placeholder="Search by ID, name, email, or department..."
              className="emcd-search-input"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="emcd-title">Employee List</div>
          <div className="emc-table">
            <div className="container mt-4">
              <Table bordered hover responsive className="emc-table">
                <thead style={{ backgroundColor: "#f5f5f5" }}>
                  <tr>
                    <th>Full name</th>
                    <th>ID</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th>Joining date</th>
                    <th>Date of birth</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((employee, index) => (
                    <tr key={index}>
                      {["name", "id", "phone", "email", "gender","department", "position"].map((field) => {
                        const value = String(employee[field] || "");
                        const isLongText = value.length > 8; // Kiểm tra nếu nội dung dài hơn 15 ký tự
                        return (
                          <td key={field} className="td-hover" data-long={isLongText}>
                            <span>{employee[field]}</span>
                          </td>
                        );
                      })}
                      <td>
                        {employee.joiningDate
                          ? new Date(employee.joiningDate).toLocaleDateString(
                              "vi-VN",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )
                          : ""}
                      </td>
                      <td>
                        {employee.dateofBirth
                          ? new Date(employee.dateofBirth).toLocaleDateString(
                              "vi-VN",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )
                          : ""}
                      </td>
                      <td>
                        <span className={`badge ${getStatusClass(employee.status)}`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="smt-action">
                        <Dropdown>
                          <Dropdown.Toggle variant="none" id={`dropdown-${index}`} className="no-caret">
                            <FaEllipsisV />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleDelete(employee.id)} className="delete" style={{ color: "red" }}>
                              Delete
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleUpdateClick(employee.id)} className="update" style={{ color: "blue" }}>
                              Update
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
          <div className="emc-pagination">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              employees={filteredEmployees}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </div>
      </div>

      {/* Modal Update Employee */}
      <div className="modal-update">
        <Modal show={showUpdate} onHide={handleClose} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Update Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedEmployee ? (
              <Form onSubmit={handleUpdateSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        style={{ color: "rgb(90, 88, 88)" }}
                        type="text"
                        name="name"
                        defaultValue={selectedEmployee.name}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>ID</Form.Label>
                      <Form.Control
                        style={{ color: "rgb(90, 88, 88)" }}
                        type="text"
                        name="id"
                        defaultValue={selectedEmployee.id}
                        readOnly
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        style={{ color: "rgb(90, 88, 88)" }}
                        type="text"
                        name="phone"
                        defaultValue={selectedEmployee.phone}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Department</Form.Label>
                      <Form.Select name="department" defaultValue={selectedEmployee.departmentId} required>
                        {departments.map((dept) => (
                          <option key={dept.departmentId} value={dept.departmentId}>
                            {dept.departmentName}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Position</Form.Label>
                      <Form.Select name="position" required defaultValue={selectedEmployee.positionId}>
                        {positions.map((pos) => (
                          <option key={pos.positionId} value={pos.positionId}>
                            {pos.positionName}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        style={{ color: "rgb(90, 88, 88)" }}
                        type="email"
                        name="email"
                        defaultValue={selectedEmployee.email}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select name="status" defaultValue={selectedEmployee.status} style={{ color: "rgb(90, 88, 88)" }}>
                        <option value="working">working</option>
                        <option value="quit">quit</option>
                        <option value="temporary">temporary</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Joining Date</Form.Label>
                      <Form.Control
                        style={{ color: "rgb(90, 88, 88)" }}
                        type="date"
                        name="joiningDate"
                        defaultValue={formatDateForInput(selectedEmployee.joiningDate)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date of birth</Form.Label>
                      <Form.Control
                        style={{ color: "rgb(90, 88, 88)" }}
                        type="date"
                        name="dateofBirth"
                        defaultValue={formatDateForInput(selectedEmployee.dateofBirth)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select name="gender" defaultValue={selectedEmployee.gender} style={{ color: "rgb(90, 88, 88)" }}>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Modal.Footer>
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                </Modal.Footer>
              </Form>
            ) : (
              <p>Loading...</p>
            )}
          </Modal.Body>
        </Modal>
      </div>

      {/* Modal Add Employee */}
      <div className="modal-add">
        <Modal show={showAdd} onHide={handleAddClose} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Add Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target;

                const newEmployeeData = {
                  name: form.name.value,
                  dateOfBirth: form.dateofBirth.value,
                  gender: form.gender.value,
                  phone: form.phone.value,
                  email: form.email.value,
                  joiningDate: form.joiningDate.value,
                  departmentId: form.department.value,
                  positionId: form.position.value,
                  status: form.status.value,
                };

                try {
                  const createdEmployee = await addEmployee(newEmployeeData);
                  if (createdEmployee) {
                    const updatedList = await getEmployee();
                    setEmployees(updatedList);
                    setFilteredEmployees(updatedList);
                    setShowAdd(false);
                  }
                } catch (error) {
                  console.error("Lỗi khi thêm nhân viên:", error);
                }
              }}
            >
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      placeholder="Enter phone"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Select name="department" required>
                      <option value="">Select department</option>
                      {departments.map((dept) => (
                        <option key={dept.departmentId} value={dept.departmentId}>
                          {dept.departmentName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Position</Form.Label>
                    <Form.Select name="position" required>
                      <option value="">Select position</option>
                      {positions.map((pos) => (
                        <option key={pos.positionId} value={pos.positionId}>
                          {pos.positionName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select name="status" required>
                      <option value="">Select status</option>
                      <option value="working">Working</option>
                      <option value="quit">Quit</option>
                      <option value="temporary">Temporary</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Joining Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="joiningDate"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date of birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateofBirth"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select name="gender" required>
                      <option value="">Select gender</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-end gap-3 mt-3">
                <Button variant="primary" type="submit">
                  Add Employee
                </Button>
                <Button variant="secondary" onClick={() => setShowAdd(false)}>
                  Cancel
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default EmployeeManagement;