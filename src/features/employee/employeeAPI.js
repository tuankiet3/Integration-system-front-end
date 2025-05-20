import instance from "../../app/instance";

export const getEmployee = () => instance.get("employees");

export const getEmployeeById = (id) => {
  return instance.get(`employees/${id}`);
};
