import { API_ACTIVITY } from "../consts";
import { IActivity, IActivityType } from "../types/activity";
import instance from "./instance";

export const getFavouritesByUserIdRequest = async (userId: string) => {
  try {
    const res = await instance.get(`${API_ACTIVITY}/favourites/${userId}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSavedActivitiesByUserIdRequest = async (userId: string) => {
  try {
    const res = await instance.get(`${API_ACTIVITY}/saved/${userId}`);
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

export const addFavouriteRequest = async (userId: string, type: string) => {
  try {
    const res = await instance.post(`${API_ACTIVITY}/favourites/add`, {
      userId,
      type,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const removeFavouriteRequest = async (userId: string, type: string) => {
  try {
    const res = await instance.post(`${API_ACTIVITY}/favourites/remove`, {
      userId,
      type,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const saveActivityRequest = async (
  userId: string,
  activity: IActivity
) => {
  try {
    const res = await instance.post(`${API_ACTIVITY}/saved/add`, {
      userId,
      activity,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const removeSavedActivityRequest = async (
  userId: string,
  activity: IActivity
) => {
  try {
    const res = await instance.post(`${API_ACTIVITY}/saved/remove`, {
      userId,
      activity,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
