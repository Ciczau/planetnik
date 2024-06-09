import instance from "./instance";

export const getWeatherForLocation = async (location: string) => {
  try {
    const response = await instance({
      url: `/api/weather/search/${location}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getActivitiesForCoordinates = async (lat: number, lng: number) => {
  try {
    const response = await instance({
      url: `/api/weather/search/${lat}/${lng}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getWeatherForNextWeek = async (lat: number, lng: number) => {
  try {
    const res = await instance.get(`/api/weather/forecast/${lat}/${lng}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
