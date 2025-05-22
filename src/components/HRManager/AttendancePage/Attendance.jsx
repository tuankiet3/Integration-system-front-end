import React, { useEffect, useState, useRef } from "react";
import { FaAngleRight } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Attendance.scss";
import Pagination from "../Pagination/Pagination";
import { getAllAttendance } from "../../../Services/AttendanceController";
import { toast } from "react-toastify";
import { postAbsentNotification } from "../../../features/salary/salaryAPI";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const notifiedMonthsRef = useRef(new Map()); // Sử dụng Map để lưu trữ thông tin theo employeeId và tháng

  useEffect(() => {
    // Load thông tin đã gửi từ localStorage
    const storedNotified = localStorage.getItem("notifiedMonths");
    if (storedNotified) {
      notifiedMonthsRef.current = new Map(JSON.parse(storedNotified));
    }

    const fetchAttendanceData = async () => {
      try {
        const data = await getAllAttendance();
        const attendanceArray = Array.isArray(data) ? data : [data];
        setAttendanceData(attendanceArray);

        const currentMonth = new Date().getMonth() + 1;

        const overAbsent = attendanceArray.filter((record) => {
          const monthNumber = new Date(record.attendanceMonth).getMonth() + 1;
          const key = `${record.employeeId}-${monthNumber}`;

          const hasNotified = notifiedMonthsRef.current.has(key);
          console.log(
            `Kiểm tra thông báo cho nhân viên ${record.employeeId} tháng ${monthNumber}:`,
            hasNotified ? "Đã thông báo" : "Chưa thông báo"
          );

          return (
            record.absentDays >= 5 &&
            monthNumber === currentMonth &&
            !hasNotified
          );
        });

        if (overAbsent.length > 0) {
          console.log("📊 Danh sách nhân viên nghỉ quá số ngày:", overAbsent);
          toast.warning(
            "⚠️ Có nhân viên nghỉ quá số ngày cho phép trong tháng!",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );

          await Promise.all(
            overAbsent.map(async (record) => {
              const monthNumber =
                new Date(record.attendanceMonth).getMonth() + 1;
              const key = `${record.employeeId}-${monthNumber}`;

              // Kiểm tra lại để chắc chắn
              if (notifiedMonthsRef.current.has(key)) {
                console.log(
                  `⏭️ Bỏ qua thông báo cho nhân viên ${record.employeeId} tháng ${monthNumber} (đã thông báo trước đó)`
                );
                return;
              }

              try {
                console.log("📤 Gửi thông báo cho:", {
                  employeeId: record.employeeId,
                  employeeName: record.fullName,
                  month: monthNumber,
                });

                await postAbsentNotification({
                  employeeId: record.employeeId,
                  month: monthNumber,
                });

                // Đánh dấu đã thông báo trong Map
                notifiedMonthsRef.current.set(key, true);
                // Lưu Map vào localStorage
                localStorage.setItem(
                  "notifiedMonths",
                  JSON.stringify(
                    Array.from(notifiedMonthsRef.current.entries())
                  )
                );

                console.log(
                  `✅ Đã gửi thông báo thành công cho nhân viên ${record.employeeId} tháng ${monthNumber}`
                );
              } catch (err) {
                console.error(
                  `❌ Gửi thông báo thất bại cho nhân viên ${record.fullName} (ID: ${record.employeeId}) tháng ${monthNumber}:`,
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
                            ? new Date(
                                record.attendanceMonth
                              ).toLocaleDateString("vi-VN", {
                                day: "2-digit",
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

export default Attendance;
