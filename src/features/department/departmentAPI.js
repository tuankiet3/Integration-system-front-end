import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7280/api/",
});

export const getDepartmentID = (id) => instance.get(`departments/${id}`);
