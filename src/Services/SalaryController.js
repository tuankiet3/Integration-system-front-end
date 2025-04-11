import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7280/api",
});

const getSalary = async () => {
  return instance.get("/salaries");
};

export { getSalary };
