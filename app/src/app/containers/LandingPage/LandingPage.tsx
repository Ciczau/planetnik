import Navigation from "@/app/components/Navigation/Navigation";
import * as S from "./LandingPage.styled";
import { useLocationContext } from "@/app/context/location";
import Input from "@/app/components/Input/Input";
import { Typography } from "@/app/components/Typography/Typography.styled";
import { useRouter } from "next/router";

const LandingPage = () => {
  const location = useLocationContext();
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push("/search/" + e.currentTarget.value);
    }
  };

  const renderActivities = () => {
    if (location?.activities?.length) {
      return location.activities.map((activity: string) => {
        return (
          <Typography tag="h4" key={activity}>
            {activity}
          </Typography>
        );
      });
    } else {
      return <Typography tag="h4">Brak aktywności w Twoim regionie</Typography>;
    }
  };
  return (
    <S.Wrapper>
      <Navigation />
      <S.Container>
        <S.Header>
          <div>
            <Typography tag="h1">Hello</Typography>
            <Typography tag="h2">
              Check today&apos;s weather forecast
            </Typography>
          </div>
          <Input
            placeholder="Search for a city"
            width={500}
            onKeyUp={handleSearch}
          />
          <div />
        </S.Header>
        {location?.error && <S.Warning>{location.error}</S.Warning>}
        <S.Content>
          <S.Calendar>Kalendarz pogodowy</S.Calendar>
          <S.WeatherAlerts>Alerty pogodowe</S.WeatherAlerts>
          <S.RecommendedActivities>
            <Typography tag="h3">Polecane aktywności</Typography>
            {renderActivities()}
          </S.RecommendedActivities>
        </S.Content>
      </S.Container>
    </S.Wrapper>
  );
};

export default LandingPage;
