import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { Table } from "react-bootstrap";
import "./AttendanceEmp.scss";
import Pagination from "../../HRManager/Pagination/Pagination";
import { getAttendanceByID } from "../../../Services/AttendanceController";
import { toast } from "react-toastify";
import { postAbsentNotification } from "../../../features/salary/salaryAPI";

const AttendanceEmp = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const notifiedMonthsRef = useRef(new Set());
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchAttendanceData = async () => {
      const employeeID = localStorage.getItem("Id");
      console.log("👤 Employee ID:", employeeID);
      if (!employeeID) return;

      try {
        const data = await getAttendanceByID(employeeID);
        console.log("📊 Attendance data:", data);

        const attendanceArray = Array.isArray(data) ? data : [data];
        setAttendanceData(attendanceArray);

        // Load dữ liệu đã thông báo từ localStorage
        const storedNotified = localStorage.getItem("notifiedMonthsEmp");
        if (storedNotified) {
          notifiedMonthsRef.current = new Set(JSON.parse(storedNotified));
        }

        const currentMonth = new Date().getMonth() + 1;

        const overAbsent = attendanceArray.filter((record) => {
          const monthNumber = new Date(record.attendanceMonth).getMonth() + 1;
          const key = `${employeeID}-${monthNumber}`;
          return (
            record.absentDays >= 5 &&
            monthNumber === currentMonth &&
            !notifiedMonthsRef.current.has(key)
          );
        });

        console.log("⚠️ Over absent records:", overAbsent);

        if (overAbsent.length > 0) {
          toast.warning("⚠️ Bạn đã nghỉ quá số ngày cho phép trong tháng!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          await Promise.all(
            overAbsent.map(async (record) => {
              const monthNumber =
                new Date(record.attendanceMonth).getMonth() + 1;
              const key = `${employeeID}-${monthNumber}`;

              try {
                console.log("📤 Posting notification for:", {
                  employeeId: employeeID,
                  month: monthNumber,
                });

                await postAbsentNotification({
                  employeeId: parseInt(employeeID),
                  month: monthNumber,
                });

                // ✅ Đánh dấu đã gửi + lưu vào localStorage
                notifiedMonthsRef.current.add(key);
                localStorage.setItem(
                  "notifiedMonthsEmp",
                  JSON.stringify(Array.from(notifiedMonthsRef.current))
                );

                console.log(`✅ Đã gửi thông báo cho tháng ${monthNumber}`);
              } catch (err) {
                console.error(
                  `❌ Gửi thông báo thất bại cho tháng ${monthNumber}:`,
                  err
                );
              }
            })
          );
        }
      } catch (err) {
        console.error("❌ Lỗi khi lấy dữ liệu điểm danh:", err);
      }
    };

    fetchAttendanceData();
  }, []);

  const filteredData = attendanceData.filter((attendance) => {
    const monthNumber = new Date(attendance.attendanceMonth).getMonth() + 1;
    return String(monthNumber)
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="attendance-history-container">
      <div className="attendance-history-header">
        <div className="ahh-title">
          <div className="ahh-fc">Attendance</div>
        </div>
      </div>

      <div className="attendance-history-content">
        <div className="ahc-detail" style={{ width: "100%" }}>
          <div className="ahcd-search">
            <IoIosSearch className="ahcd-search-icon" />
            <input
              type="text"
              placeholder="Search by month, eg: 5"
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
                            ? new Date(
                                record.attendanceMonth
                              ).toLocaleDateString("vi-VN", {
                                month: "2-digit",
                                year: "numeric",
                              })
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
