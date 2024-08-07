import { API_WEATHER } from "../consts";
import instance from "./instance";

export const getWeatherForLocation = async (location: string) => {
  try {
    const response = await instance({
      url: `${API_WEATHER}/search/${location}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getActivitiesForCoordinates = async (
  lat: number,
  lng: number,
  userId: string,
  radius: number
) => {
  try {
    const response = await instance({
      url: `${API_WEATHER}/search`,
      method: "POST",
      data: {
        lat,
        lng,
        userId,
        radius,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getWeatherForNextWeek = async (lat: number, lng: number) => {
  try {
    const res = await instance.get(`${API_WEATHER}/forecast/${lat}/${lng}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getAlertsRequest = async (lat: number, lng: number) => {
  try {
    const res = await instance.get(`${API_WEATHER}/alerts/${lat}/${lng}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
