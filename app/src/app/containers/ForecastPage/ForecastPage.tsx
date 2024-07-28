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
