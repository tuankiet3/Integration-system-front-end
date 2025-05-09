import "./EmployeeManagement.scss";
import React, { useState } from "react";
import {
  Table,
  Dropdown,
  Button,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import "bootstrap/dist/css/bootstrap.min.css";
import plus from "../../../assets/plus.png";
import Pagination from "../Pagination/Pagination";
import { useEffect } from "react";
import {
  addEmployee,
  getEmployee,
} from "../../../../Services/EmployeeController";

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

  // // Add
  const [showAdd, setShowAdd] = useState(false);
  const itemsPerPage = 5;

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

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

  return (
    <div className="employee-management-container">
      <div className="employee-management-header">
        <div className="emh-title">
          <div className="emh-user">
            Hue <FaAngleRight />{" "}
          </div>
          <div className="emh-fc">Employee Management</div>
        </div>
        <div className="emh-button">
          <button
            className="emh-button-addemp"
            onClick={() => setShowAdd(true)}
          >
            <img src={plus} alt="" className="emh-button-addemp-icon" />
            Add Employee
          </button>
        </div>
      </div>

      <div className="employee-management-content">
        <div className="emc-detail">
          <div className="emcd-search">
            <IoIosSearch className="smt-search-icon" />
            <input
              type="text"
              placeholder="Search"
              className="emcd-search-input"
            />
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
                      {["name", "id", "phone", "department", "email"].map(
                        (field) => {
                          const value = String(employee[field] || "");
                          const isLongText = value.length > 20; // Kiểm tra nếu nội dung dài hơn 15 ký tự
                          return (
                            <td
                              key={field}
                              className="td-hover"
                              data-long={isLongText}
                            >
                              <span>{employee[field]}</span>
                            </td>
                          );
                        }
                      )}
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
                        <span
                          className={`badge ${getStatusClass(employee.status)}`}
                        >
                          {employee.status}
                        </span>
                      </td>
                      <td className="smt-action">
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="none"
                            id={`dropdown-${index}`}
                            className="no-caret"
                          >
                            <FaEllipsisV />
                          </Dropdown.Toggle>
                          <Dropdown.Menu /*flip="true"*/>
                            <Dropdown.Item /*onClick={() => handleDeleteClick(employee)} href="#" className="delete" style={{color: "red"}}*/
                            >
                              Delete
                            </Dropdown.Item>
                            <Dropdown.Item /*onClick={() => handleUpdateClick(employee)} href="#" className="update"*/
                            >
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
              employees={employees}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </div>
      </div>

      {/* Modal Add Employee */}
      <div className="modal-add">
        <Modal show={showAdd} centered size="lg">
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
                  status: form.status.value,
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
                    <Form.Control type="date" name="joiningDate" required />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date of birth</Form.Label>
                    <Form.Control type="date" name="dateofBirth" required />
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
              <Button
                variant="secondary"
                onClick={() => setShowAdd(false)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default EmployeeManagement;
