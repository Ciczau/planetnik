import Navigation from "@/app/components/Navigation/Navigation";
import * as S from "./LandingPage.styled";
import { useLocationContext } from "@/app/context/location";
import Input from "@/app/components/Input/Input";
import { Typography } from "@/app/components/Typography/Typography.styled";

const LandingPage = () => {
  const location = useLocationContext();
  return (
    <S.Wrapper>
      <Navigation />
      <S.Content>
        <S.ContentHeader>
          <div>
            <Typography tag="h1">Hello</Typography>
            <Typography tag="h2">
              Check today&apos;s weather forecast
            </Typography>
          </div>
          <Input placeholder="Search for a city" width={500} />
          <div />
        </S.ContentHeader>
        <S.Warning>{location?.error}</S.Warning>
      </S.Content>
    </S.Wrapper>
  );
};

export default LandingPage;
