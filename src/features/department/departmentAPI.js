import instance from "../../app/instance";

export const getDepartmentID = (id) => instance.get(`departments/${id}`);
