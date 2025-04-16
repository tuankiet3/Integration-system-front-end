// import React from 'react'
import { FaAngleRight } from 'react-icons/fa';
import { IoIosSearch } from "react-icons/io";
import { Table, Dropdown, Button, Modal, Form, Row, Col}  from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './SalaryHistory.scss';
import React, { useState } from "react";
import Pagination from "../Pagination/Pagination";

const SalaryHistory = () => {
    const salaryData = [
        { department: "IT", basicSalary: 10000, bonus: 500, deductions: 200, totalSalary: 10300, paymentDate: "11/12/025" },
        { department: "IT", basicSalary: 10000, bonus: 500, deductions: 200, totalSalary: 10300, paymentDate: "11/12/025" },
        { department: "Support", basicSalary: 10000, bonus: 500, deductions: 200, totalSalary: 10300, paymentDate: "11/12/025" },
        { department: "People Ops", basicSalary: 10000, bonus: 500, deductions: 200, totalSalary: 10300, paymentDate: "11/12/025" },
        { department: "IT", basicSalary: 10000, bonus: 500, deductions: 200, totalSalary: 10300, paymentDate: "11/12/025" },
    ];

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="salary-history-container">
        <div className="salary-history-header">
            <div className="shh-title">
                <div className="shh-user">Hue <FaAngleRight /> </div>
                <div className="shh-fc">Salary History</div>
            </div>
        </div>
        <div className="salary-history-content">
            <div className="shc-detail">
                <div className="shcd-search">
                    <IoIosSearch className="shcd-search-icon" />
                    <input type="text" placeholder='Search By Date, eg: 20/03/2024' className='shcd-search-input' />
                </div>
                <div className="shcd-title">Your Salary History</div>
                <div className="shc-table">
                    <div className="container mt-4">
                        <Table bordered hover responsive>
                            <thead style={{ backgroundColor: "#f5f5f5" }}>
                                <tr>
                                    <th style={{ width: "150px" }}>Department</th>
                                    <th style={{ width: "150px" }}>Basic Salary</th>
                                    <th style={{ width: "150px" }}>Bonus</th>
                                    <th style={{ width: "140px" }}>Deductions</th>
                                    <th style={{ width: "140px" }}>Total Salary</th>
                                    <th style={{ width: "150px" }}>Payment Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salaryData.map((salary, index) => (
                                    <tr key={index}>
                                        <td>{salary.department}</td>
                                        <td>{salary.basicSalary}</td>
                                        <td>{salary.bonus}</td>
                                        <td>{salary.deductions}</td>
                                        <td>{salary.totalSalary}</td>
                                        <td>{salary.paymentDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="shc-pagination">
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        employees={salaryData}
                        itemsPerPage={itemsPerPage}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default SalaryHistory