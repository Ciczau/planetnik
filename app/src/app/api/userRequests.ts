import instance from "./instance";

export const registerUserRequest = async (data: Object) => {
  try {
    const response = await instance({
      url: "/api/user/register",
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
    const response = await instance.post("/api/user/login", data);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const tokenRequest = async (token: string) => {
  try {
    const res = await instance({
      url: "/api/user/refresh",
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
      url: `/api/user/${id}`,
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
      url: "/api/user/update",
      method: "POST",
      data: data,
    });
    return response.data;
  } catch (e) {
    return e;
  }
};
