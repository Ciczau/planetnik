import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Button from "@/app/components/Button/Button";

const weatherPatterns = [
  {
    location: "Szczawnica",
    conditions: {
      windDirection: "Wschód",
      windSpeed: {
        min: 2,
        max: 4,
      },
      precipitation: "Brak",
    },
    activity: "Latanie na paralotni z Jarmuty",
  },
  {
    location: "Zalew Zegrzyński",
    conditions: {
      windDirection: "Dowolny",
      windSpeed: {
        min: 5,
        max: 12,
      },
      precedingConditions: {
        freezingDays: 4,
        freezingTemperature: -8,
      },
    },
    activity: "Regaty bojerowe",
  },
  {
    conditions: {
      temperature: {
        min: 15,
        max: 21,
      },
      windSpeed: {
        min: 0,
        max: 5,
      },
    },
    activity: "Wycieczka rowerowa z dziećmi",
  },
  {
    location: "Zatoka Pucka",
    conditions: {
      windDirection: "Południe",
      windSpeed: {
        min: 6,
      },
      weather: "Słonecznie",
    },
    activity: "Kitesurfing, surfing",
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 20px;
  button {
    margin: 20px 0;
  }
  li,
  ul {
    list-style-type: none;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 500px;
`;

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  color: #000000;
  margin-bottom: 10px;
`;

const CardContent = styled.div`
  font-size: 14px;
  color: #555;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  max-width: 500px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;

  border: 1px solid #000000;
  width: calc(100% - 24px);
`;

const PreferencesSection = () => {
  const { register, handleSubmit, reset } = useForm();
  const [patterns, setPatterns] = useState<any>(weatherPatterns);
  const [showForm, setShowForm] = useState(false);

  const onSubmit = (data: any) => {
    const newPattern = {
      location: data.location,
      conditions: {
        windDirection: data.windDirection,
        windSpeed: {
          min: data.windSpeedMin ? parseInt(data.windSpeedMin) : undefined,
          max: data.windSpeedMax ? parseInt(data.windSpeedMax) : undefined,
        },
        precipitation: data.precipitation,
      },
      activity: data.activity,
    };

    setPatterns([...patterns, newPattern]);
    reset();
    setShowForm(false);
    alert("Nowa aktywność została dodana!");
  };

  return (
    <Container>
      <Title>Wybierz lub dodaj aktywność</Title>
      <Button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Anuluj" : "Dodaj nową aktywność"}
      </Button>

      {showForm && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Lokalizacja (opcjonalnie)"
            {...register("location")}
          />
          <Input
            type="text"
            placeholder="Kierunek wiatru"
            {...register("windDirection")}
          />
          <Input
            type="number"
            placeholder="Prędkość wiatru min"
            {...register("windSpeedMin")}
          />
          <Input
            type="number"
            placeholder="Prędkość wiatru max"
            {...register("windSpeedMax")}
          />
          <Input
            type="text"
            placeholder="Opady"
            {...register("precipitation")}
          />
          <Input
            type="text"
            placeholder="Nazwa aktywności"
            {...register("activity", { required: true })}
          />
          <Button>Dodaj aktywność</Button>
        </Form>
      )}
      <CardList>
        {patterns.map((pattern: any, index: number) => (
          <Card key={index}>
            <CardTitle>{pattern.activity}</CardTitle>
            <CardContent>
              {pattern.location && (
                <p>
                  <strong>Lokalizacja:</strong> {pattern.location}
                </p>
              )}
              <p>
                <strong>Warunki:</strong>
              </p>
              <ul>
                {pattern.conditions.windDirection && (
                  <li>Kierunek wiatru: {pattern.conditions.windDirection}</li>
                )}
                {pattern.conditions.windSpeed && (
                  <li>
                    Prędkość wiatru: {pattern.conditions.windSpeed.min} -{" "}
                    {pattern.conditions.windSpeed.max} m/s
                  </li>
                )}
                {pattern.conditions.precipitation && (
                  <li>Opady: {pattern.conditions.precipitation}</li>
                )}
              </ul>
            </CardContent>
          </Card>
        ))}
      </CardList>
    </Container>
  );
};

export default PreferencesSection;
