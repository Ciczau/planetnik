//@ts-nocheck
import express, { Request, Response } from "express";
import axios from "axios";
import ActivityType from "../models/activityTypeModel.js";
import Favourites from "../models/favouritesModel.js";

const router = express.Router();

const checkForWeatherPattern = (weatherData, pattern, city) => {
  if (!weatherData) return;
  const { conditions, name, location } = pattern;
  let matches = true;
  if (conditions.windDirection && conditions.windDirection !== "Any") {
    if (
      !weatherData.wind_deg ||
      weatherData.wind_deg < 0 ||
      (weatherData.wind_deg >= 45 &&
        weatherData.wind_deg < 135 &&
        conditions.windDirection !== "East") ||
      (weatherData.wind_deg >= 135 &&
        weatherData.wind_deg < 225 &&
        conditions.windDirection !== "South")
    ) {
      matches = false;
    }
  }

  if (
    conditions.windSpeed &&
    (weatherData.wind_speed < conditions.windSpeed.min ||
      weatherData.wind_speed > (conditions.windSpeed.max ?? Infinity))
  ) {
    matches = false;
  }

  if (
    conditions.temperature &&
    (weatherData.temp.day < conditions.temperature.min ||
      weatherData.temp.day > conditions.temperature.max)
  ) {
    matches = false;
  }

  if (!conditions.precipitation && weatherData.rain) {
    matches = false;
  }

  if (city && location && !city.includes(location)) {
    matches = false;
  }

  return { matches, activity: name };
};

router.get("/search/:location", async (req: Request, res: Response) => {
  const { location } = req.params;

  try {
    const weatherPatterns = await ActivityType.find().exec();
    const geocodingResponse = await axios.get(
      "https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          q: location,
          key: "b88b17e9647e488ea8588d635a7d617f",
        },
      }
    );

    const allActivities = [];

    await Promise.all(
      geocodingResponse.data.results.map(async (result) => {
        const { lat, lng } = result.geometry;
        const city = result.formatted;

        const weatherResponse = await axios.get(
          "https://api.openweathermap.org/data/3.0/onecall",
          {
            params: {
              lat,
              lon: lng,
              appid: "8fcb7e25d8a1a96fe5e721fd3f69f0af",
              units: "metric",
              exclude: "current,minutely,hourly,alerts",
            },
          }
        );

        const weatherData = weatherResponse.data.daily.slice(0, 7);

        weatherData.forEach((dailyWeather) => {
          weatherPatterns.forEach((pattern) => {
            const { matches, activity } = checkForWeatherPattern(
              dailyWeather,
              pattern,
              city
            );

            if (matches && !allActivities.some((a) => a.city === city)) {
              allActivities.push({
                type: { name: activity },
                date: dailyWeather.dt,
                city: city,
              });
            }
          });
        });
      })
    );

    res.json({ success: true, activitiesByCity: allActivities });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Wystąpił błąd podczas pobierania danych",
    });
  }
});

router.get("/forecast/:lat/:lon", async (req: Request, res: Response) => {
  const { lat, lon } = req.params;

  try {
    const weatherResponse = await axios.get(
      "https://api.openweathermap.org/data/3.0/onecall",
      {
        params: {
          lat,
          lon,
          appid: "8fcb7e25d8a1a96fe5e721fd3f69f0af",
          units: "metric",
        },
      }
    );

    const weatherData = weatherResponse.data.daily.slice(0, 7);
    res.json({ success: true, weatherData });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error fetching weather data",
    });
  }
});

const getCityName = async (lat, lon) => {
  try {
    const geocodingResponse = await axios.get(
      "https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          q: `${lat}+${lon}`,
          key: "b88b17e9647e488ea8588d635a7d617f",
        },
      }
    );
    return geocodingResponse.data.results[0].formatted;
  } catch (error) {
    console.error("Error fetching city name:", error);
    return null;
  }
};

router.post("/search", async (req: Request, res: Response) => {
  const { lat, lng, radius, userId } = req.body;

  try {
    const favouriteActivities = await Favourites.find({ user: userId })
      .populate("activity")
      .exec();
    const weatherPatterns = favouriteActivities.map(
      (favourite) => favourite.activity
    );

    // Pobranie nazwy miasta na podstawie współrzędnych
    const cityName = await getCityName(lat, lng);

    // Obsługa promienia wyszukiwania
    const nearbyCitiesResponse = await axios.get(
      "https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          q: `${lat}+${lng}`,
          key: "b88b17e9647e488ea8588d635a7d617f",
          radius: radius || 500000, // Domyślnie promień 10 km
        },
      }
    );

    const allActivities = [];

    await Promise.all(
      nearbyCitiesResponse.data.results.map(async (result) => {
        const { lat, lng } = result.geometry;
        const city = `${result.components.city || result.components.town}, ${
          result.components.country
        }`;

        const weatherResponse = await axios.get(
          "https://api.openweathermap.org/data/3.0/onecall",
          {
            params: {
              lat,
              lon: lng,
              appid: "8fcb7e25d8a1a96fe5e721fd3f69f0af",
              units: "metric",
              exclude: "current,minutely,hourly,alerts",
            },
          }
        );

        const weatherData = weatherResponse.data.daily.slice(0, 7);

        weatherData.forEach((dailyWeather) => {
          weatherPatterns.forEach((pattern) => {
            const { matches, activity } = checkForWeatherPattern(
              dailyWeather,
              pattern,
              city
            );

            if (matches) {
              allActivities.push({
                type: { name: activity },
                date: dailyWeather.dt,
                city: city,
              });
            }
          });
        });
      })
    );

    res.json({ success: true, activities: allActivities });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Wystąpił błąd podczas pobierania danych",
    });
  }
});

router.get("/alerts/:lat/:lng", async (req: Request, res: Response) => {
  const { lat, lng } = req.params;
  const { radius } = req.query;

  try {
    const weatherResponse = await axios.get(
      "https://api.openweathermap.org/data/3.0/onecall",
      {
        params: {
          lat,
          lon: lng,
          appid: "8fcb7e25d8a1a96fe5e721fd3f69f0af",
          units: "metric",
          exclude: "current,minutely,hourly",
        },
      }
    );
    const alerts = weatherResponse.data.alerts || [];

    const nearbyCitiesResponse = await axios.get(
      "https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          q: `${lat}+${lng}`,
          key: "b88b17e9647e488ea8588d635a7d617f",
          radius: radius || 10000,
        },
      }
    );

    const nearbyCities = nearbyCitiesResponse.data.results.map((result) => ({
      lat: result.geometry.lat,
      lon: result.geometry.lng,
      city: result.formatted,
    }));

    const filteredAlerts = alerts.filter((alert) => {
      return nearbyCities.some((city) => {
        const distance = Math.sqrt(
          Math.pow(city.lat - lat, 2) + Math.pow(city.lon - lng, 2)
        );
        return distance <= radius / 111.32;
      });
    });

    res.json({ success: true, alerts: filteredAlerts });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Wystąpił błąd podczas pobierania alertów pogodowych",
    });
  }
});

export { router };
