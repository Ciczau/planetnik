import { useForm, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as S from "./LoginRegister.styled";
import Button from "@/app/components/Button/Button";
import { useRouter } from "next/router";
import { loginUserRequest, registerUserRequest } from "@/app/api/userRequests";
import { useCookies } from "react-cookie";
import Input from "@/app/components/Input/Input";
import Typography from "@/app/components/Typography/Typography";
import { useEffect, useState } from "react";

type Props = {
  type: "login" | "register";
  updateType: (type: "login" | "register") => void;
};

type LoginFormInputs = {
  email: string;
  password: string;
};

type RegisterFormInputs = {
  email: string;
  name: string;
  password: string;
};

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Niepoprawny email")
    .required("Email jest wymagany"),
  password: yup.string().required("Hasło jest wymagane"),
});

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Niepoprawny email")
    .required("Email jest wymagany"),
  name: yup.string().required("Imię jest wymagane"),
  password: yup
    .string()
    .min(6, "Hasło musi mieć przynajmniej 6 znaków")
    .required("Hasło jest wymagane"),
});

const LoginRegister = ({ type, updateType }: Props) => {
  const [cookie, setCookie] = useCookies(["refreshToken"]);
  const [isSwapped, setIsSwapped] = useState<boolean>(false);
  const [typeStatus, setTypeStatus] = useState<"login" | "register">(type);

  const schema = type === "register" ? registerSchema : loginSchema;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormInputs | RegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const onSubmit = async (data: LoginFormInputs | RegisterFormInputs) => {
    const res =
      type === "register"
        ? await registerUserRequest(data)
        : await loginUserRequest(data);
    if (res.success) {
      if (type === "login") {
        setCookie("refreshToken", res.token, { path: "/" });
        router.push("/");
      } else {
        router.push("/login");
      }
    } else {
      if (res.field) {
        setError(res.field, { type: "server", message: res.message });
      }
    }
  };

  const handleTypeUpdate = (type: "login" | "register") => {
    setIsSwapped(!isSwapped);
    setTypeStatus(type);
    setTimeout(() => {
      updateType(type);
      // router.push({ pathname: `/${type}` }, undefined, { shallow: true });
    }, 170);
  };
  return (
    <S.Wrapper reverse={typeStatus === "login"}>
      <S.LeftContainer
        initial={{ x: !(typeStatus === "login") ? 0 : "100%" }}
        animate={{
          x: isSwapped ? (typeStatus === "login" ? "-100%" : "100%") : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        <S.OverlayContainer swap={isSwapped}>
          <S.OverlayContent swap={isSwapped} type={true}>
            <p>Nie masz jeszcze konta?</p>
            <Button
              version="secondary"
              onClick={() => {
                handleTypeUpdate("register");
              }}
            >
              Zarejestruj się
            </Button>
          </S.OverlayContent>
          <S.OverlayContent swap={!isSwapped} type={false}>
            <p>Masz już konto?</p>
            <Button
              version="secondary"
              onClick={() => handleTypeUpdate("login")}
            >
              Zaloguj się!
            </Button>
          </S.OverlayContent>
        </S.OverlayContainer>
      </S.LeftContainer>
      <S.RightContainer
        initial={{ x: !(typeStatus === "login") ? 0 : "-100%" }}
        animate={{
          x: isSwapped ? (typeStatus === "login" ? "100%" : "-100%") : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <Typography tag="h1">
            {type === "register" ? "Rejestracja" : "Logowanie"}
          </Typography>
          <S.Input
            {...register("email")}
            placeholder="Email"
            width={300}
            error={!!errors.email}
          />
          {errors.email && (
            <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>
          )}

          {type === "register" && (
            <>
              <S.Input
                {...register("name")}
                placeholder="Imię"
                width={300}
                error={!!(errors as FieldErrors<RegisterFormInputs>).name}
              />
              {(errors as FieldErrors<RegisterFormInputs>).name && (
                <S.ErrorMessage>
                  {(errors as FieldErrors<RegisterFormInputs>).name?.message}
                </S.ErrorMessage>
              )}
            </>
          )}
          <S.Input
            {...register("password")}
            width={300}
            placeholder="Hasło"
            error={!!errors.password}
            type="password"
          />
          {errors.password && (
            <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>
          )}

          <Button>
            {type === "register" ? "Zarejestruj się" : "Zaloguj się"}
          </Button>
        </S.Form>
      </S.RightContainer>
    </S.Wrapper>
  );
};

export default LoginRegister;
