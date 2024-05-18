import { useRouter } from "next/router";
import * as S from "./Navigation.styled";
import { useUserContext } from "@/app/context/user";
import { useCookies } from "react-cookie";

const Navigation = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["refreshToken"]);
  const router = useRouter();
  const user = useUserContext();

  const handleLogout = () => {
    removeCookie("refreshToken");
  };
  return (
    <S.Wrapper>
      <S.Menu>
        <S.GlobeIcon onClick={() => router.push("/")} />
        <S.CloudSunRainIcon onClick={() => router.push("/forecast")} />
        <S.RecommendedIcon onClick={() => router.push("/recommended")} />
      </S.Menu>
      <S.Menu>
        {user?._id ? (
          <>
            <S.SettingsIcon onClick={() => router.push("/profile")} />
            <S.SingOutIcon onClick={handleLogout} />
          </>
        ) : (
          <S.SignInIcon onClick={() => router.push("/register")} />
        )}
      </S.Menu>
    </S.Wrapper>
  );
};

export default Navigation;
