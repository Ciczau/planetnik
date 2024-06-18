"use client";
import Navigation from "@/app/components/Navigation/Navigation";
import * as S from "./LandingPage.styled";
import { useLocationContext } from "@/app/context/location";
import Input from "@/app/components/Input/Input";
import { Typography } from "@/app/components/Typography/Typography.styled";
import { useRouter } from "next/router";
import Button from "@/app/components/Button/Button";
import { IDailyWeather } from "@/app/types/weather";
import { PureComponent, useEffect, useState } from "react";
import { getWeatherForNextWeek } from "@/app/api/weatherRequests";
import { Line, LineChart } from "recharts";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { IActivity } from "@/app/types/activity";
import { formatDate } from "@/app/utils/date";

const Globe = dynamic(() => import("@/app/components/Globe/Globe"), {
  ssr: false,
});

const LandingPage = () => {
  const location = useLocationContext();
  const router = useRouter();
  const [weather, setWeather] = useState<IDailyWeather[]>([]);
  const [chartData, setChartData] = useState<{ name: string; uv: number }[]>(
    []
  );

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push("/search/" + e.currentTarget.value);
    }
  };

  useEffect(() => {
    const getDataForCharts = () => {
      const dayData = weather.map((day) => ({
        name: new Date(day.dt * 1000).toLocaleDateString().slice(0, -5),
        uv: day.temp.day,
      }));
      setChartData(dayData);
    };
    if (weather) {
      getDataForCharts();
    }
    console.log(weather);
  }, [weather]);

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
    console.log(location);
    getWeatherForecast();
  }, [location]);

  const renderActivities = () => {
    if (location?.activities?.length) {
      return location.activities.slice(0, 4).map((activity: IActivity) => {
        return (
          <S.Activity
            key={`landing-page-${activity.type.name}-${activity.date}`}
          >
            <div>
              <Typography tag="h4">{activity.type.name}</Typography>
              <Typography tag="h5">{activity.city}</Typography>
            </div>
            <Typography tag="p">{formatDate(activity.date)}</Typography>
          </S.Activity>
        );
      });
    } else {
      return (
        <Typography tag="p">
          Brak rekomendowanych aktywności w tej lokalizacji
        </Typography>
      );
    }
  };
  class CustomizedLabel extends PureComponent {
    render() {
      const { x, y, stroke, value } = this.props as any;

      return (
        <text
          x={x}
          y={y}
          dy={25}
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
        <S.Header>
          <div>
            <Typography tag="h1">Witaj!</Typography>
            <Typography tag="h3">
              Sprawdź dzisiejsze warunki pogodowe w swoim regionie
            </Typography>
          </div>
          <S.InputWrapper>
            <Input
              placeholder="Wyszukaj lokalizację"
              width={500}
              onKeyUp={handleSearch}
            />
            <S.SearchIcon />
          </S.InputWrapper>
        </S.Header>
        {location?.error && <S.Warning>{location.error}</S.Warning>}
        <S.Content>
          <S.Calendar>
            <Typography tag="h3">Kalendarz pogodowy</Typography>
            <S.IconsWrapper>
              {weather.map((day, index) => {
                if (day.weather[0].main === "Rain") {
                  return <S.RainIcon key={index} />;
                } else if (day.weather[0].main === "Clouds") {
                  return <S.CloudIcon key={index} />;
                } else {
                  return <S.SunIcon key={index} />;
                }
              })}
            </S.IconsWrapper>
            <LineChart
              data={chartData}
              width={510}
              height={150}
              margin={{ left: 30, right: 30 }}
            >
              <Line
                type="monotone"
                dataKey="uv"
                stroke="#fce309"
                isAnimationActive={false}
                strokeWidth={2}
                label={<CustomizedLabel />}
              />
            </LineChart>
            <S.ChartLegend>
              {weather.map((day, index) => {
                return (
                  <div key={index}>
                    {new Date(day.dt * 1000).toLocaleDateString().slice(0, -5)}
                  </div>
                );
              })}
            </S.ChartLegend>
          </S.Calendar>
          <S.WeatherAlerts>
            Alerty pogodowe
            {/* TODO: Handle weather alerts - add endpoint and show it here */}
          </S.WeatherAlerts>
          <S.RecommendedActivities>
            <Typography tag="h3">Polecane aktywności</Typography>
            {renderActivities()}
            <Button onClick={() => router.push(`/recommended`)}>
              Zobacz więcej
            </Button>
          </S.RecommendedActivities>
          <S.Glob>
            <Canvas>
              <Globe />
            </Canvas>
          </S.Glob>
        </S.Content>
      </S.Container>
    </S.Wrapper>
  );
};

export default LandingPage;
