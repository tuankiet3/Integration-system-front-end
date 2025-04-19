<<<<<<< HEAD
import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7280/api/",
});

const getSalary = async () => {
  return instance.get("salaries");
};

const postSalary = async (salaryData) => {
  return instance.post("salaries", salaryData);
};

export { getSalary, postSalary };
=======
// import axios from "axios";

// const instance = axios.create({
//   baseURL: "https://localhost:7280/api/",
// });

// const getSalary = async () => {
//   return instance.get("salaries");
// };

// const postSalary = async (salaryData) => {
//   return instance.post("salaries", salaryData);
// };

// export { getSalary, postSalary };
>>>>>>> 504e25a29de091e5a9d6cdfb5ed19f4ece79415c
