interface IWeatherDescription {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface IDailyWeather {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: {
    day: number;
    eve: number;
    morn: number;
    night: number;
  };
  humidity: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  pop: number; // probability of precipitation
  pressure: number;
  rain?: number; // optional because it may not always be present
  summary: string;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    eve: number;
    max: number;
    min: number;
    morn: number;
    night: number;
  };
  uvi: number; // UV index
  weather: IWeatherDescription[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}
