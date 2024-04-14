import Navigation from "@/app/components/Navigation/Navigation";
import * as S from "./LandingPage.styled";
import { useLocationContext } from "@/app/context/location";

const LandingPage = () => {
  const location = useLocationContext();
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
        <S.Warning>{location?.error}</S.Warning>
      </S.Content>
    </S.Wrapper>
  );
};

export default LandingPage;
