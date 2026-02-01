import { httpAxios } from "@/helper/httphelper";

export const addUser = async (user) => {
  try {
    const response = await httpAxios.post("api/users", user);
    return response.data; // ✅ return data
  } catch (error) {
    throw error; // ✅ rethrow error
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await httpAxios.post("api/users/login", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CurrentUser = async () => {
  try {
    const response = await httpAxios.get("/api/current");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Logout = async () => {
  try {
    const response = await httpAxios.post("/api/logout");
    return response.data;
  } catch (error) {
    throw error;
  }
};
