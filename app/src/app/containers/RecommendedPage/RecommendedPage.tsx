import Navigation from "@/app/components/Navigation/Navigation";
import * as S from "./RecommendedPage.styled";
import Typography from "@/app/components/Typography/Typography";
import Input from "@/app/components/Input/Input";
import { useRouter } from "next/router";
import { useLocationContext } from "@/app/context/location";
import Activity from "@/app/components/Activity/Activity";
import Pagination from "@/app/components/Pagination/Pagination";

const RecommendedPage = () => {
  const router = useRouter();
  const location = useLocationContext();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push("/search/" + e.currentTarget.value);
    }
  };

  const renderActivities = () => {
    if (location?.activities?.length === 0) {
      return <Typography tag="h2">Brak aktywności w danym miejscu.</Typography>;
    } else {
      return location?.activities?.map((activityByCity: any) => {
        return (
          <Activity
            activity={activityByCity}
            key={`${activityByCity.city}-${activityByCity.date}`}
          />
        );
      });
    }
  };

  return (
    <S.Wrapper>
      <Navigation />
      <S.Container>
        <S.Header>
          <div>
            <Typography tag="h2">Polecane aktywności dla Ciebie</Typography>
          </div>
          <div />
        </S.Header>
        <S.Content>{renderActivities()}</S.Content>
        <Pagination />
      </S.Container>
    </S.Wrapper>
  );
};

export default RecommendedPage;
