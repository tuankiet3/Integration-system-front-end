import React, { useEffect } from "react";
// import "./SalaryManagement.scss";
import { Table, Dropdown, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaAngleRight } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserSalary,
  selectUserSalary,
} from "../../../features/salary/salarySlice";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import "react-toastify/dist/ReactToastify.css";

const SalaryManagement = () => {
  const dispatch = useDispatch();
  const userSalary = useSelector(selectUserSalary);
  const { loading, error } = useSelector((state) => state.salary);

  useEffect(() => {
    const userID = localStorage.getItem("Id");
    if (userID) {
      dispatch(fetchUserSalary(userID));
    }
  }, [dispatch]);
  console.log("userSalary", userSalary);
  if (loading) return <LoadingSpinner isLoading={true} />;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="salary-management-container">
      <div className="salary-management-header">
        <div className="smh-top">
          <div className="smh-user">
            Hue <FaAngleRight />
          </div>
          <div className="smh-fc">Salary Management</div>
        </div>
      </div>
      <div className="salary-management-content">
        <div className="smt-detail" style={{ width: "100%" }}>
          <div className="smt-table">
            <div className="container mt-4">
              <Table bordered hover className="smt-table-content">
                <thead style={{ backgroundColor: "#f5f5f5" }}>
                  <tr>
                    <th>Basic Salary</th>
                    <th>Bonus</th>
                    <th>Deductions</th>
                    <th>Total Salary</th>
                    <th>Payment Day</th>
                  </tr>
                </thead>

                <tbody>
                  {userSalary &&
                    userSalary.length > 0 &&
                    userSalary.map((salary) => (
                      <tr key={salary.salaryId}>
                        <td>{salary.baseSalary?.toLocaleString()}</td>
                        <td>{salary.bonus?.toLocaleString()}</td>
                        <td>{salary.deductions?.toLocaleString()}</td>
                        <td>{salary.netSalary?.toLocaleString()}</td>
                        <td>
                          {salary.salaryMonth
                            ? new Date(salary.salaryMonth).toLocaleDateString(
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
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryManagement;
