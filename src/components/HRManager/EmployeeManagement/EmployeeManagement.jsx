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

const EmployeeManagement = () => {
  // Sample employee data
  const initialEmployees = [
    { id: "AOBTNC028", name: "Jeremy Neibour Bella", phone: "123456789", department: "Support", email: "abc@gmail.com", status: "Working", joiningDate: "9/23/16", job: "abc" },
    { id: "AOBTNC088", name: "Annette Bi", phone: "123456789", department: "QA", email: "abc@gmail.com", status: "Working", joiningDate: "7/27/13", job: "abc" },
    { id: "AOBTNC025", name: "Theresa Wu", phone: "123456789", department: "People Ops", email: "abc@gmail.com", status: "Working", joiningDate: "11/7/16", job: "abc" },
    { id: "AOBTNC044", name: "Kathryn Mt", phone: "123456789", department: "IT", email: "abc@gmail.com", status: "Working", joiningDate: "6/19/14", job: "abc" },
    { id: "AOBTNC099", name: "Courtney H", phone: "123456789", department: "Customer Success", email: "abc@gmail.com", status: "Working", joiningDate: "7/11/19", job: "abc" },
    { id: "AOBTNC095", name: "Jane Coop", phone: "123456789", department: "Product", email: "abc@gmail.com", status: "Working", joiningDate: "8/2/19", job: "abc" },
    { id: "AOBTNC027", name: "Theresa Wu", phone: "123456789", department: "People Ops", email: "abc@gmail.com", status: "Working", joiningDate: "11/7/16", job: "abc" },
    { id: "AOBTNC040", name: "Kathryn Mt", phone: "123456789", department: "IT", email: "abc@gmail.com", status: "Working", joiningDate: "6/19/14", job: "abc" },
    { id: "AOBTNC098", name: "Courtney H", phone: "123456789", department: "Customer Success", email: "abc@gmail.com", status: "Working", joiningDate: "7/11/19", job: "abc" },
    { id: "AOBTNC090", name: "Jane Coop", phone: "123456789", department: "Product", email: "abc@gmail.com", status: "Working", joiningDate: "8/2/19", job: "abc" },
  ];

  const [employees, setEmployees] = useState(initialEmployees);
  const [currentPage, setCurrentPage] = useState(0);
  const [showUpdate, setShowUpdate] = useState(false); // State for showing the modal
  const [selectedEmployee, setSelectedEmployee] = useState(null); // To store the employee being edited

  // Delete
  const [showDelete, setShowDelete] = useState(false); // State for showing the modal
  const [selectedEmployeeDelete, setSelectedEmployeeDelete] = useState(null); // To store the employee being edited

  // Add
  const [showAdd, setShowAdd] = useState(false); // State for showing the modal
  const [selectedEmployeeAdd, setSelectedEmployeeAdd] = useState(null); // To store the employee being edited
  const itemsPerPage = 5;

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);
  
  // Function to get status badge color
  const getStatusClass = (status) => {
    switch (status) {
      case "Working":
        return "bg-success text-white";
      case "Quit":
        return "bg-danger text-dark";
      case "Temporary":
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
                    <th style={{ width: "110px" }}>Profile</th>
                    <th style={{ width: "50px" }}>ID</th>
                    <th style={{ width: "100px" }}>Phone</th>
                    <th style={{ width: "100px" }}>Department</th>
                    <th style={{ width: "170px" }}>Email</th>
                    <th style={{ width: "100px" }}>Joining date</th>
                    <th style={{ width: "100px" }}>Job</th>
                    <th style={{ width: "100px" }}>Status</th>
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
                      <td className="smt-action">
                        <Dropdown>
                          <Dropdown.Toggle variant="none" id={`dropdown-${index}`} className="no-caret">
                            <FaEllipsisV />
                          </Dropdown.Toggle>
                          <Dropdown.Menu /*flip="true"*/>
                            <Dropdown.Item onClick={() => handleDeleteClick(employee)} href="#" className="delete" style={{color: "red"}}>Delete</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleUpdateClick(employee)} href="#" className="update">Update</Dropdown.Item>
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

      <div className="modal-update">
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
      <div className="modal-delete">
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
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const newEmployee = {
                  id: `AOBTNC${Math.floor(Math.random() * 900 + 100)}`, // Tạo ID ngẫu nhiên
                  name: form.name.value,
                  phone: form.phone.value,
                  department: form.department.value,
                  email: form.email.value,
                  status: form.status.value,
                  joiningDate: form.joiningDate.value,
                  job: form.job.value,
                };

                setEmployees([...employees, newEmployee]);
                setShowAdd(false);
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
                    <Form.Control
                      type="text"
                      name="department"
                      placeholder="Enter department"
                      required
                    />
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
                      <option value="Working">Working</option>
                      <option value="Quit">Quit</option>
                      <option value="Temporary">Temporary</option>
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

                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Job</Form.Label>
                    <Form.Control
                      type="text"
                      name="job"
                      placeholder="Enter job"
                      required
                    />
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