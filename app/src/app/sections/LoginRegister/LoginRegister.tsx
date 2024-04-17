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
          <Typography tag="h1">
            {type === "register" ? "Sign up" : "Sign in"}
          </Typography>
          <Input
            {...register("email")}
            placeholder="Email"
            border={true}
            width={300}
          />
          {type === "register" && (
            <Input
              {...register("name")}
              placeholder="Name"
              border={true}
              width={300}
            />
          )}
          <Input
            {...register("password")}
            border={true}
            width={300}
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
          <Button version="secondary">
            {type === "register" ? "Sign up" : "Sign in"}
          </Button>
        </S.Form>
      </S.RightContainer>
    </S.Wrapper>
  );
};

export default LoginRegister;
