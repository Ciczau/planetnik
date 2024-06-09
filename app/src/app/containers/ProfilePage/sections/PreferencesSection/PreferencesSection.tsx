import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/app/components/Button/Button";
import Modal from "@/app/components/Modal/Modal";

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
    margin-bottom: 25px;
  }
  li,
  ul {
    list-style-type: none;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
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

const Input = styled.input<{ width?: number; error?: boolean }>`
  margin: 10px 0;
  padding: 10px;
  border: ${({ error }) => (error ? "1px solid red" : "1px solid #000000")};
  width: ${({ width }) => (width ? `${width}px` : "100%")};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;

  p {
    width: 240px;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;

  input {
    display: none;
  }

  label {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    color: #333;
  }

  label::before {
    content: "";
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid #000000;
    border-radius: 4px;
    margin-right: 10px;
    background-color: white;
    transition: background-color 0.2s;
  }

  input:checked + label::before {
    background-color: #000000;
    border-color: #000000;
  }

  label::after {
    content: "";
    position: absolute;
    display: none;
    top: 3px;
    left: 7.5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  input:checked + label::after {
    display: block;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`;

const schema = yup.object().shape({
  location: yup
    .string()
    .max(255, "Lokalizacja nie może być dłuższa niż 255 znaków"),
  windDirection: yup
    .string()
    .oneOf(
      [
        "Wschód",
        "Zachód",
        "Południe",
        "Północ",
        "Południowy Wschód",
        "Południowy Zachód",
        "Północny Wschód",
        "Północny Zachód",
      ],
      "Niepoprawny kierunek wiatru"
    )
    .required("Kierunek wiatru jest wymagany"),
  windSpeedMin: yup
    .number()
    .typeError("Prędkość wiatru min musi być liczbą")
    .min(0, "Prędkość wiatru min nie może być mniejsza niż 0")
    .required("Prędkość wiatru min jest wymagana"),
  windSpeedMax: yup
    .number()
    .typeError("Prędkość wiatru max musi być liczbą")
    .min(0, "Prędkość wiatru max nie może być mniejsza niż 0")
    .required("Prędkość wiatru max jest wymagana"),
  precipitation: yup.boolean().required("Opady są wymagane"),
  activity: yup
    .string()
    .max(255, "Nazwa aktywności nie może być dłuższa niż 255 znaków")
    .required("Nazwa aktywności jest wymagana"),
});

const PreferencesSection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [patterns, setPatterns] = useState<any>(weatherPatterns);
  const [showForm, setShowForm] = useState(false);

  const onSubmit = (data: any) => {
    const newPattern = {
      location: data.location,
      conditions: {
        windDirection: data.windDirection,
        windSpeed: {
          min: data.windSpeedMin ? parseInt(data.windSpeedMin) : 0,
          max: data.windSpeedMax ? parseInt(data.windSpeedMax) : 0,
        },
        precipitation: data.precipitation ? "Tak" : "Nie",
      },
      activity: data.activity,
    };

    setPatterns([newPattern, ...patterns]);
    reset();
    setShowForm(false);
  };

  return (
    <Container>
      <Title>Wybierz lub dodaj aktywność</Title>
      <Button onClick={() => setShowForm(true)}>Dodaj nową aktywność</Button>
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <Title>Dodaj nową aktywność</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Lokalizacja (opcjonalnie)"
            error={!!errors.location}
            {...register("location")}
          />
          {errors.location && (
            <ErrorMessage>{errors.location.message}</ErrorMessage>
          )}
          <Input
            type="text"
            placeholder="Kierunek wiatru"
            error={!!errors.windDirection}
            {...register("windDirection")}
          />
          {errors.windDirection && (
            <ErrorMessage>{errors.windDirection.message}</ErrorMessage>
          )}
          <Row>
            <Input
              type="number"
              width={240}
              error={!!errors.windSpeedMin}
              placeholder="Prędkość wiatru min"
              {...register("windSpeedMin")}
            />
            <Input
              type="number"
              width={240}
              error={!!errors.windSpeedMax}
              placeholder="Prędkość wiatru max"
              {...register("windSpeedMax")}
            />
          </Row>
          <Row>
            {errors.windSpeedMin && (
              <ErrorMessage>{errors.windSpeedMin.message}</ErrorMessage>
            )}
            {errors.windSpeedMax && (
              <ErrorMessage>{errors.windSpeedMax.message}</ErrorMessage>
            )}
          </Row>
          <CheckboxContainer>
            <input
              type="checkbox"
              {...register("precipitation")}
              id="precipitation"
            />
            <label htmlFor="precipitation">Opady</label>
          </CheckboxContainer>
          {errors.precipitation && (
            <ErrorMessage>{errors.precipitation.message}</ErrorMessage>
          )}
          <Input
            type="text"
            error={!!errors.activity}
            placeholder="Nazwa aktywności"
            {...register("activity")}
          />
          {errors.activity && (
            <ErrorMessage>{errors.activity.message}</ErrorMessage>
          )}
          <Button>Dodaj aktywność</Button>
        </Form>
      </Modal>
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
