import { axiosUserInstance } from "../axios";

export const addUser = async (formValue) => {
  const response = await axiosUserInstance.post("/registerUser", formValue);
  console.log(response);
  if (response.data) {
    return response.data;
  }
};

export const imageUpload = async (formData, newUserId) => {
  const response = await axiosUserInstance.post(
    `/upload/${newUserId}`,
    formData
  );
  if (response.data) {
    return response.data;
  }
};

export const allUsers = async () => {
  const response = await axiosUserInstance.get("/allUsers");
  if (response.data) {
    return response.data;
  }
};

export const updateStatus = async (status, userId) => {
  const response = await axiosUserInstance.post("/updateStatus", {
    status,
    userId,
  });
  if (response.data) {
    return response.data;
  }
};

export const deleteUser = async (userId) => {
  const response = await axiosUserInstance.delete(`/deleteUser/${userId}`);
  if (response.data) {
    return response.data;
  }
};

export const fetchUser = async (userId) => {
  const response = await axiosUserInstance.get(`/getUser/${userId}`);
  if (response.data) {
    return response.data;
  }
};
export const updateUser = async (formValue, userId) => {
  console.log(formValue);
  console.log(userId);
  const response = await axiosUserInstance.post(
    `/updateUser/${userId}`,
    formValue
  );
  console.log(response);
  if (response.data) {
    return response.data;
  }
};
