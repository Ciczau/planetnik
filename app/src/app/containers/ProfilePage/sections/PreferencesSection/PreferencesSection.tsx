import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/app/components/Button/Button";
import Modal from "@/app/components/Modal/Modal";
import { motion } from "framer-motion";
import { IActivityType } from "@/app/types/activity";
import {
  addActivityTypeRequest,
  getActivityTypesRequest,
} from "@/app/api/activityRequests";
import { useUserContext } from "@/app/context/user";

const Container = styled(motion.div)`
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
  tempMin: yup
    .number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue.trim() === "" ? null : value
    )
    .typeError("Temperatura min musi być liczbą")
    .min(0, "Temperatura min nie może być mniejsza niż 0"),
  tempMax: yup
    .number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue.trim() === "" ? null : value
    )
    .typeError("Temperatura max musi być liczbą")
    .min(0, "Temperatura max nie może być mniejsza niż 0"),
  windSpeedMin: yup
    .number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue.trim() === "" ? null : value
    )
    .typeError("Prędkość wiatru min musi być liczbą")
    .min(0, "Prędkość wiatru min nie może być mniejsza niż 0"),
  windSpeedMax: yup
    .number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue.trim() === "" ? null : value
    )
    .typeError("Prędkość wiatru max musi być liczbą")
    .min(0, "Prędkość wiatru max nie może być mniejsza niż 0"),
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
  const [activityTypes, setActivityTypes] = useState<IActivityType[]>([]);
  const [showForm, setShowForm] = useState(false);

  const user = useUserContext();

  //TODO: SSR
  useEffect(() => {
    const getActivityTypes = async () => {
      const res = await getActivityTypesRequest();
      if (res.success) {
        setActivityTypes(res.activityTypes);
      }
    };
    getActivityTypes();
  }, []);

  const onSubmit = async (data: any) => {
    if (!user) return;

    const newPattern: IActivityType = {
      location: data.location,
      conditions: {
        windDirection: data.windDirection,
        temperature: {
          min: data.tempMin ? parseInt(data.tempMin) : undefined,
          max: data.tempMax ? parseInt(data.tempMax) : undefined,
        },
        windSpeed: {
          min: data.windSpeedMin ? parseInt(data.windSpeedMin) : undefined,
          max: data.windSpeedMax ? parseInt(data.windSpeedMax) : undefined,
        },
        precipitation: data.precipitation,
      },
      name: data.activity,
    };

    const res = await addActivityTypeRequest(user._id, newPattern);
    if (res.success) {
      setActivityTypes([res.activityType, ...activityTypes]);
      reset();
      setShowForm(false);
    }
  };

  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
              error={!!errors.tempMin}
              placeholder="Temperatura minimalna"
              {...register("tempMin")}
            />
            <Input
              type="number"
              width={240}
              error={!!errors.tempMax}
              placeholder="Temperatura maksymalna"
              {...register("tempMax")}
            />
          </Row>
          <Row>
            {errors.tempMin && (
              <ErrorMessage>{errors.tempMin.message}</ErrorMessage>
            )}
            {errors.tempMax && (
              <ErrorMessage>{errors.tempMax.message}</ErrorMessage>
            )}
          </Row>
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
        {activityTypes.map((pattern: any, index: number) => (
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
                  <li>
                    Opady: {pattern.conditions.precipitation ? "Tak" : "Nie"}
                  </li>
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
