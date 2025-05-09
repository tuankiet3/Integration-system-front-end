import instance from "../../app/instance";

const Login = async (email, password) => {
  try {
    const data = { email, password };
    const response = await instance.post("Auth/login", data);
    return response.data; // Return only the response data if that's what's needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export { Login };
