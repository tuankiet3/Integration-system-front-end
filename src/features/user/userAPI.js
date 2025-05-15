import instance from "../../app/instance";

const getNoti = async () => {
  return instance.get("/Notifications/list");
};

export { getNoti };
