import Navigation from "@/app/components/Navigation/Navigation";
import * as S from "./ForecastPage.styled";
import { useLocationContext } from "@/app/context/location";
import { PureComponent, useCallback, useEffect, useState } from "react";
import { getWeatherForNextWeek } from "@/app/api/weatherRequests";
import { IDailyWeather } from "@/app/types/weather";
import { FaSun, FaMoon } from "react-icons/fa";
import { Line, LineChart, XAxis, YAxis } from "recharts";

const ForecastPage = () => {
  const [weather, setWeather] = useState<IDailyWeather[]>([]);
  const location = useLocationContext();
  const [dayTemp, setDayTemp] = useState<{ max: number; min: number } | null>(
    null
  );
  const [nightTemp, setNightTemp] = useState<{
    max: number;
    min: number;
  } | null>(null);
  const [dayData, setDayData] = useState<{ name: string; uv: number }[]>([]);
  const [nightData, setNightData] = useState<{ name: string; uv: number }[]>(
    []
  );

  useEffect(() => {
    const getWeatherForecast = async () => {
      if (location?.latitude && location.longitude) {
        const res = await getWeatherForNextWeek(
          location.latitude,
          location.longitude
        );
        setWeather(res.weatherData);
      }
    };
    getWeatherForecast();
  }, [location]);

  useEffect(() => {
    const getDataForCharts = () => {
      const dayData = weather.map((day) => ({
        name: new Date(day.dt * 1000).toLocaleDateString().slice(0, -5),
        uv: day.temp.day,
      }));
      const nightData = weather.map((day) => ({
        name: new Date(day.dt * 1000).toLocaleDateString().slice(0, -5),
        uv: day.temp.night,
      }));
      setDayData(dayData);
      setNightData(nightData);
    };
    if (weather) {
      const minDayTemp = Math.min(...weather.map((day) => day.temp.day));
      const maxDayTemp = Math.max(...weather.map((day) => day.temp.day));
      setDayTemp({ min: minDayTemp, max: maxDayTemp });
      const minNightTemp = Math.min(...weather.map((day) => day.temp.night));
      const maxNightTemp = Math.max(...weather.map((day) => day.temp.night));
      console.log(minNightTemp, maxNightTemp);
      setNightTemp({ min: minNightTemp, max: maxNightTemp });
      getDataForCharts();
    }
    console.log(weather);
  }, [weather]);

  const getRotate = (
    type: "day" | "night",
    index: number,
    value: number,
    expectedValue: "rotate" | "length"
  ) => {
    if (index === weather.length - 1) return 0;
    if (type === "day") {
      return 0;
    } else {
      const chuj = (nightTemp?.max || 0) - value;
      const cipa = (nightTemp?.max || 0) - (nightTemp?.min || 0);
      const test = (chuj / cipa) * 150;
      const chuj1 = (nightTemp?.max || 0) - weather[index + 1].temp.night;
      const cipa1 = (nightTemp?.max || 0) - (nightTemp?.min || 0);
      const test1 = (chuj1 / cipa1) * 150;
      console.log(Math.atan2(test1 - test, 1000 / 7) * (180 / Math.PI));

      if (expectedValue === "rotate") {
        return Math.atan2(test1 - test, 1000 / 7) * (180 / Math.PI);
      } else {
        return Math.sqrt(Math.pow(test1 - test, 2) + Math.pow(1000 / 7, 2));
      }
    }
  };

  class CustomizedLabel extends PureComponent {
    render() {
      const { x, y, stroke, value } = this.props as any;

      return (
        <text
          x={x}
          y={y}
          dy={-10}
          fill={stroke}
          fontSize={14}
          textAnchor="middle"
        >
          {value}°C
        </text>
      );
    }
  }
  return (
    <S.Wrapper>
      <Navigation />
      <S.Container>
        <S.Title>Prognoza pogody na najbliższy tydzień</S.Title>
        <S.Chart>
          <S.ChartTitle>
            <S.SunIcon /> Temperatura w dzień
          </S.ChartTitle>
          <S.ChartLegend>
            {weather.map((day, index) => {
              return (
                <div key={index}>
                  {new Date(day.dt * 1000).toLocaleDateString().slice(0, -5)}
                </div>
              );
            })}
          </S.ChartLegend>
          <LineChart
            data={dayData}
            width={900}
            height={180}
            margin={{ left: 30, right: 30, top: 30 }}
          >
            <Line
              type="monotone"
              dataKey="uv"
              isAnimationActive={false}
              strokeWidth={2}
              stroke="#ffdb0e"
              label={<CustomizedLabel />}
            />
          </LineChart>
        </S.Chart>
        <S.Chart>
          <S.ChartTitle>
            <S.MoonIcon /> Temperatura w nocy
          </S.ChartTitle>
          <S.ChartLegend>
            {weather.map((day, index) => {
              return (
                <div key={index}>
                  {new Date(day.dt * 1000).toLocaleDateString().slice(0, -5)}
                </div>
              );
            })}
          </S.ChartLegend>
          <LineChart
            data={nightData}
            width={900}
            height={180}
            margin={{ left: 30, right: 30, top: 30 }}
          >
            <Line
              type="monotone"
              dataKey="uv"
              stroke="#140d3b"
              isAnimationActive={false}
              strokeWidth={2}
              label={<CustomizedLabel />}
            />
          </LineChart>
        </S.Chart>
      </S.Container>
    </S.Wrapper>
  );
};

export default ForecastPage;
