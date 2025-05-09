import instance from "../../app/instance";

export const getEmployee = () => instance.get("employees");
