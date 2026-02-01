import { httpAxios } from "@/helper/httphelper";

export const addtask = async (task) => {
  try {
    const response = await httpAxios.post("api/users/tasks", task);
    return response.data; // ✅ return data
  } catch (error) {
    throw error; // ✅ rethrow error
  }
};

export const getTasksForUser = async (UserId) => {
  try {
    const response = await httpAxios.get(`api/users/${UserId}/tasks`);
    return response.data.tasks; // ✅ return data
  } catch (error) {
    throw error; // ✅ rethrow error
  }
};

export const DeleteTaskForUser = async (TaskId) => {
  try {
    const response = await httpAxios.delete(`api/users/tasks/${TaskId}`);
    return response.data.tasks; // ✅ return data
  } catch (error) {
    throw error; // ✅ rethrow error
  }
};

