import { API_USER } from "../consts";
import instance from "./instance";

export const registerUserRequest = async (data: Object) => {
  try {
    const response = await instance({
      url: `${API_USER}/register`,
      method: "POST",
      data: data,
    });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const loginUserRequest = async (data: Object) => {
  try {
    const response = await instance.post(`${API_USER}/login`, data);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const tokenRequest = async (token: string) => {
  try {
    const res = await instance({
      url: `${API_USER}/refresh`,
      method: "POST",
      data: { token: token },
    });
    return res.data;
  } catch (e) {
    return e;
  }
};

export const getUserDataRequest = async (id: string) => {
  try {
    const response = await instance({
      url: `${API_USER}/${id}`,
      method: "GET",
    });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const updateUserRequest = async (data: Object) => {
  try {
    const response = await instance({
      url: `${API_USER}/update`,
      method: "POST",
      data: data,
    });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const logoutRequest = async (token: string) => {
  try {
    const response = await instance.post(`${API_USER}/logout`, {
      token: token,
    });
    return response.data;
  } catch (e) {
    return e;
  }
};
