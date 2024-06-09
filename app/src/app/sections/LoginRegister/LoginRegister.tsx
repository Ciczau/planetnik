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

type Props = {
  type: "login" | "register";
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

const LoginRegister = ({ type }: Props) => {
  const [cookie, setCookie] = useCookies(["refreshToken"]);

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

  return (
    <S.Wrapper reverse={type === "login"}>
      <S.LeftContainer></S.LeftContainer>
      <S.RightContainer>
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
          <S.Information>
            {type === "register" ? (
              <>
                Masz już konto?{" "}
                <b onClick={() => router.push("/login")}>Zaloguj się!</b>
              </>
            ) : (
              <>
                Nie posiadasz jeszcze konta?{" "}
                <b onClick={() => router.push("/register")}>Zarejestruj się!</b>
              </>
            )}
          </S.Information>
          <Button version="secondary">
            {type === "register" ? "Zarejestruj się" : "Zaloguj się"}
          </Button>
        </S.Form>
      </S.RightContainer>
    </S.Wrapper>
  );
};

export default LoginRegister;
