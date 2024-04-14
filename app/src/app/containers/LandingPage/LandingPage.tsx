import Navigation from "@/app/components/Navigation/Navigation";
import * as S from "./LandingPage.styled";

const LandingPage = () => {
  return (
    <S.Wrapper>
      <Navigation />
      <S.Content>
        <S.ContentHeader>
          <div>
            <S.Title>Hello</S.Title>
            <S.Subtitle>Check today&apos;s weather forecast</S.Subtitle>
          </div>
          <S.SearchInput placeholder="Search for a city" />
          <div />
        </S.ContentHeader>
      </S.Content>
    </S.Wrapper>
  );
};

export default LandingPage;
