import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AttendanceEmp.scss";
import Pagination from "../../HRManager/Pagination/Pagination";
import { getAttendanceByID } from "../../../Services/AttendanceController";

const AttendanceEmp = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchAttendanceData = async () => {
        const employeeID = localStorage.getItem("Id");
        console.log("employeeID:", employeeID);
        if (!employeeID) return;

        console.log("Token đang dùng:", localStorage.getItem("token"));

        try {
        const data = await getAttendanceByID(employeeID);
        console.log("Fetched attendance data:", data);
        setAttendanceData(Array.isArray(data) ? data : [data]);
        } catch (err) {
        console.error("Error fetching attendance:", err);
        }
    };

    fetchAttendanceData();
    }, []);

  const filteredData = attendanceData.filter((attendance) =>
    attendance.attendanceMonth?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="attendance-history-container">
      <div className="attendance-history-header">
        <div className="ahh-title">
          <div className="ahh-user">
            Hue <FaAngleRight />
          </div>
          <div className="ahh-fc">Attendance</div>
        </div>
      </div>

      <div className="attendance-history-content">
        <div className="ahc-detail" style={{ width: "100%" }}>
          <div className="ahcd-search">
            <IoIosSearch className="ahcd-search-icon" />
            <input
              type="text"
              placeholder="Search by date, eg: 2025-04-01"
              className="ahcd-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="ahcd-title">Your Attendance History</div>

          <div className="ahc-table">
            <div className="container mt-4">
              <Table bordered hover responsive>
                <thead style={{ backgroundColor: "#f5f5f5" }}>
                  <tr>
                    <th>Employee ID</th>
                    <th>Work Days</th>
                    <th>Absent Days</th>
                    <th>Leave Days</th>
                    <th>Month</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((record, index) => (
                      <tr key={index}>
                        <td>{record.employeeId}</td>
                        <td>{record.workDays}</td>
                        <td>{record.absentDays}</td>
                        <td>{record.leaveDays}</td>
                        <td>
                          {record.attendanceMonth
                            ? new Date(record.attendanceMonth).toLocaleDateString(
                                "vi-VN",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                }
                              )
                            : ""}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No attendance data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>

          <div className="ahc-pagination">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              employees={filteredData}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceEmp;
