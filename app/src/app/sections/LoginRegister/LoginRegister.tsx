import { useForm } from "react-hook-form";
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

const LoginRegister = ({ type }: Props) => {
  const [cookie, setCookie] = useCookies(["refreshToken"]);

  const { register, handleSubmit } = useForm();

  const router = useRouter();
  const onSubmit = async (data: Object) => {
    const res =
      type === "register"
        ? await registerUserRequest(data)
        : await loginUserRequest(data);
    if (res.success) {
      if (type === "login") {
        setCookie("refreshToken", res.token, { path: "/" });
      }
      router.push("/");
    }
  };
  return (
    <S.Wrapper>
      <S.LeftContainer />
      <S.RightContainer>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <Typography tag="h1">
            {type === "register" ? "Rejestracja" : "Logowanie"}
          </Typography>
          <S.Input {...register("email")} placeholder="Email" width={300} />
          {type === "register" && (
            <S.Input {...register("name")} placeholder="Imię" width={300} />
          )}
          <S.Input
            {...register("password")}
            width={300}
            placeholder="Hasło"
            type="password"
          />
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
