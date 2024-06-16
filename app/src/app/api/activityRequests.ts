import { API_ACTIVITY } from "../consts";
import { IActivityType } from "../types/activity";
import instance from "./instance";

export const getFavouritesByUserIdRequest = async (userId: string) => {
  try {
    const res = await instance.get(`${API_ACTIVITY}/${userId}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getActivityTypesRequest = async () => {
  try {
    const res = await instance.get(`${API_ACTIVITY}/type/`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const addActivityTypeRequest = async (
  userId: string,
  type: IActivityType
) => {
  try {
    const res = await instance.post(`${API_ACTIVITY}/type/add`, {
      userId,
      type,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
