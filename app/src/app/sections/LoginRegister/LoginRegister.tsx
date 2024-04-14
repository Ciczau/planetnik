import { useForm } from "react-hook-form";
import * as S from "./LoginRegister.styled";
import Button from "@/app/components/Button/Button";
import { useRouter } from "next/router";
import { loginUserRequest, registerUserRequest } from "@/app/api/userRequests";
import { useCookies } from "react-cookie";

type Props = {
  type: "login" | "register";
};

const LoginRegister = ({ type }: Props) => {
  const [cookie, setCookie] = useCookies(["refreshToken"]);

  const { register, handleSubmit } = useForm();

  const router = useRouter();
  const onSubmit = async (data: Object) => {
    console.log("test");
    const res =
      type === "register"
        ? await registerUserRequest(data)
        : await loginUserRequest(data);
    console.log(res);
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
          <S.Title>{type === "register" ? "Sign up" : "Sign in"}</S.Title>
          <S.Input {...register("email")} placeholder="Email" />
          {type === "register" && (
            <S.Input {...register("name")} placeholder="Name" />
          )}
          <S.Input
            {...register("password")}
            placeholder="Password"
            type="password"
          />
          <S.Information>
            {type === "register" ? (
              <>
                Already have an account?{" "}
                <b onClick={() => router.push("/login")}>Sign in!</b>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <b onClick={() => router.push("/register")}>Sign up!</b>
              </>
            )}
          </S.Information>
          <Button>{type === "register" ? "Sign up" : "Sign in"}</Button>
        </S.Form>
      </S.RightContainer>
    </S.Wrapper>
  );
};

export default LoginRegister;
