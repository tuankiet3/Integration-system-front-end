// import React from 'react';
import "./EmployeeManagement.scss";
import React, { useState } from "react";
import { Table, Dropdown, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import "bootstrap/dist/css/bootstrap.min.css";
import plus from "../../../assets/plus.png";
import Pagination from "../Pagination/Pagination";
import { getEmployee, addEmployee } from "../../../Services/EmployeeController";
import { useEffect } from "react";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getEmployee();
      setEmployees(data);
    };

    fetchData();
  }, []);
  const [currentPage, setCurrentPage] = useState(0);
  // const [showUpdate, setShowUpdate] = useState(false); // State for showing the modal
  // const [selectedEmployee, setSelectedEmployee] = useState(null); // To store the employee being edited

  // Delete
  // const [showDelete, setShowDelete] = useState(false); // State for showing the modal
  // const [selectedEmployeeDelete, setSelectedEmployeeDelete] = useState(null); // To store the employee being edited

  // // Add
  const [showAdd, setShowAdd] = useState(false); // State for showing the modal
  // const [selectedEmployeeAdd, setSelectedEmployeeAdd] = useState(null); // To store the employee being edited
  const itemsPerPage = 5;

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);
  
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
  // Handle update click from dropdown
  const handleUpdateClick = (employee) => {
    setSelectedEmployee(employee); // Set the employee to be edited
    setShowUpdate(true); // Show the modal
  };

  // Handle modal close
  const handleClose = () => {
    setShowUpdate(false);
    setSelectedEmployee(null);
  };

  //Handle form submission for updating employee
  const handleUpdateSubmit = (e) => {
    e.preventDefault(); // Ngăn reload trang

    if (!selectedEmployee) return;

    // Get form values using form elements
    const form = e.target;
    const updatedEmployee = {
      ...selectedEmployee, // Keep existing data
      name: form.name.value,
      phone: form.phone.value,
      department: form.department.value,
      email: form.email.value,
      status: form.status.value,
      joiningDate: form.joiningDate.value,
      job: form.job.value,
    };

    // Cập nhật danh sách nhân viên
    const updatedEmployees = employees.map((emp) =>
      emp.id === selectedEmployee.id ? updatedEmployee : emp
    );

    setEmployees(updatedEmployees); // Cập nhật state
    setShowUpdate(false); // Đóng modal cập nhật
    setSelectedEmployee(null); // Xóa dữ liệu nhân viên đang chỉnh sửa
  };

  const handleDeleteClick = (employee) => {
    setSelectedEmployeeDelete(employee); // Set the employee to be deleted
    setShowDelete(true); // Show the delete confirmation modal
  }

  // DELETE
  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (selectedEmployeeDelete) {
      const employeeToDelete = selectedEmployeeDelete; // Get the employee to be deleted
      // Filter out the employee to be deleted
      const updatedEmployees = employees.filter(
        (emp) => emp.id !== employeeToDelete.id
      );
      setEmployees(updatedEmployees);

      // Adjust current page if necessary
      const totalPages = Math.ceil(updatedEmployees.length / itemsPerPage);
      if (currentPage >= totalPages && totalPages > 0) {
        setCurrentPage(totalPages - 1);
      }

      // Close the modal
      setShowDelete(false);
      selectedEmployeeDelete(null);
    }
  };

  const handleDeleteClose = () => {
    setShowDelete(false);
    selectedEmployeeDelete(null);
  };

  // ADD EMPLOYEE
  const handleAddClose = () => {
    setShowAdd(false);
    selectedEmployeeAdd(null);
  }

  return (
    <div className='employee-management-container'>
      <div className="employee-management-header">
        <div className="emh-title">
          <div className="emh-user">Hue <FaAngleRight /> </div>
          <div className="emh-fc">Employee Management</div>
        </div>
        <div className="emh-button">
          <button className="emh-button-addemp" onClick={() => setShowAdd(true)}>
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
                    <th style={{ width: "150px" }}>Profile</th>
                    <th style={{ width: "50px" }}>ID</th>
                    <th style={{ width: "100px" }}>Phone</th>
                    <th style={{ width: "150px" }}>Department</th>
                    <th style={{ width: "170px" }}>Email</th>
                    <th style={{ width: "130px" }}>Joining date</th>
                    {/* <th style={{ width: "100px" }}>Job</th> */}
                    <th style={{ width: "120px" }}>Status</th>
                    <th style={{ width: "50px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((employee, index) => (
                    <tr key={index}>
                      {["name", "id", "phone", "department", "email"].map((field) => {
                        const value = String(employee[field] || "");
                        const isLongText = value.length > 20; // Kiểm tra nếu nội dung dài hơn 15 ký tự
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
                        <span className={`badge ${getStatusClass(employee.status)}`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="smt-action">
                        <Dropdown>
                          <Dropdown.Toggle variant="none" id={`dropdown-${index}`} className="no-caret">
                            <FaEllipsisV />
                          </Dropdown.Toggle>
                          <Dropdown.Menu /*flip="true"*/>
                            <Dropdown.Item /*onClick={() => handleDeleteClick(employee)} href="#" className="delete" style={{color: "red"}}*/>Delete</Dropdown.Item>
                            <Dropdown.Item /*onClick={() => handleUpdateClick(employee)} href="#" className="update"*/>Update</Dropdown.Item>
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
            employees={employees}
            itemsPerPage={itemsPerPage}
          />
          </div>
        </div>
      </div>

      {/* <div className="modal-update">
        <Modal show={showUpdate} onHide={handleClose} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Update Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedEmployee && (
              <Form onSubmit={handleUpdateSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        style={{color:"rgb(90, 88, 88)"}}
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
                        style={{color:"rgb(90, 88, 88)"}}
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
                        style={{color:"rgb(90, 88, 88)"}}
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
                      <Form.Control
                        style={{color:"rgb(90, 88, 88)"}}
                        type="text"
                        name="department"
                        defaultValue={selectedEmployee.department}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        style={{color:"rgb(90, 88, 88)"}}
                        type="email"
                        name="email"
                        defaultValue={selectedEmployee.email}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select name="status" defaultValue={selectedEmployee.status} style={{color:"rgb(90, 88, 88)"}}>
                        <option value="Working">Working</option>
                        <option value="Quit">Quit</option>
                        <option value="Temporary">Temporary</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Joining Date</Form.Label>
                      <Form.Control
                        style={{color:"rgb(90, 88, 88)"}}
                        type="text"
                        name="joiningDate"
                        defaultValue={selectedEmployee.joiningDate}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Job</Form.Label>
                      <Form.Control
                        style={{color:"rgb(90, 88, 88)"}}
                        type="text"
                        name="job"
                        defaultValue={selectedEmployee.job}
                        required
                      />
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
            )}
          </Modal.Body>
        </Modal>
      </div>

      {/* Delete Confirmation Modal */}
      {/* <div className="modal-delete">
        <Modal show={showDelete} onHide={handleDeleteClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Manage Users</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedEmployeeDelete && (
              <p>
                <span style={{ fontWeight: "bold", color: "red" }}>
                  <strong>{selectedEmployeeDelete.name}</strong> (ID: {selectedEmployeeDelete.id})
                </span>
                <br />
                Are you sure you want to delete this employee?
              </p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              Delete
            </Button>
            <Button variant="secondary" onClick={handleDeleteClose}>
              Cancel
            </Button>
          </Modal.Footer>
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
                  departmentId: form.department.value, // Lấy trực tiếp departmentId
                  positionId: form.position.value, // Lấy trực tiếp positionId
                  status: form.status.value
                };

                try {
                  const createdEmployee = await addEmployee(newEmployeeData);
                  
                  if (createdEmployee) {
                    const updatedList = await getEmployee();
                    setEmployees(updatedList);
                    setShowAdd(false);
                  } else {
                    alert("Thêm nhân viên thất bại!");
                  }
                } catch (error) {
                  console.error("Lỗi khi thêm nhân viên:", error);
                  alert("Đã xảy ra lỗi khi thêm nhân viên!");
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
                      <option value="1">Human Resources</option>
                      <option value="2">Finance</option>
                      <option value="3">Marketing</option>
                      <option value="4">IT</option>
                      <option value="5">Operations</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Position</Form.Label>
                    <Form.Select name="position" required>
                      <option value="">Select position</option>
                      <option value="1">Human Resources</option>
                      <option value="2">Finance</option>
                      <option value="3">Marketing</option>
                      <option value="4">IT</option>
                      <option value="5">Operations</option>
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
              <Button variant="primary" type="submit">
                Add Employee
              </Button>
              <Button variant="secondary" onClick={() => setShowAdd(false)} style={{ marginLeft: "10px" }}>
                Cancel
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>

    </div>
  )
}

export default EmployeeManagement;