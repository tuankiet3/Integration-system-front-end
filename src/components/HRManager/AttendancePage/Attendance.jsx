import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Attendance.scss";
import Pagination from "../Pagination/Pagination";
import { getAllAttendance } from "../../../Services/AttendanceController";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const data = await getAllAttendance();
        setAttendanceData(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    };

    fetchAttendanceData();
  }, []);

  const filteredData = attendanceData.filter((attendance) =>
    attendance.attendanceMonth?.toString().includes(searchTerm)
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
              placeholder="Search by month (e.g. 4 for April)"
              className="ahcd-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="ahcd-title">Attendance Records</div>

          <div className="ahc-table" style={{ width: "100%" }}>
            <div className="container mt-4">
              <Table bordered hover responsive>
                <thead style={{ backgroundColor: "#f5f5f5" }}>
                  <tr>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
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
                        <td>{record.fullName}</td>
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

export default Attendance;
