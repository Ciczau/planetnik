import * as S from "./Navigation.styled";

const Navigation = () => {
  return (
    <S.Wrapper>
      <S.Menu>
        <S.GlobeIcon />
        <S.CloudSunRainIcon />
        <S.WindIcon />
      </S.Menu>
      <S.Menu>
        <S.SignInIcon />
      </S.Menu>
    </S.Wrapper>
  );
};

export default Navigation;
