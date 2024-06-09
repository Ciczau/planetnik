import Navigation from "@/app/components/Navigation/Navigation";
import * as S from "./RecommendedPage.styled";
import Typography from "@/app/components/Typography/Typography";
import Input from "@/app/components/Input/Input";
import { useRouter } from "next/router";

const mockActivites = [
  {
    city: "Zduńska Wola",
    activities: ["Przejażdżka rowerowa z dziećmi", "Spacer po parku"],
  },
  {
    city: "Henryków",
    activities: ["Spacer po lesie"],
  },
];

const SearchPage = () => {
  const router = useRouter();
  const location_id = router.query.location_id as string;

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push("/search/" + e.currentTarget.value);
    }
  };

  const renderActivities = () => {
    if (mockActivites.length === 0) {
      return <Typography tag="h2">Brak aktywności w danym miejscu.</Typography>;
    } else {
      return mockActivites.map((activityByCity: any) => {
        return (
          <S.Activity key={`search-page-${activityByCity.city}`}>
            <Typography tag="h4">{activityByCity.city}</Typography>
            {activityByCity.activities.map((activity: any) => {
              return (
                <div key={`search-page-${activityByCity.city}-${activity}`}>
                  <Typography tag="h5">{activity}</Typography>
                </div>
              );
            })}
          </S.Activity>
        );
      });
    }
  };

  //TODO: Apply <Activity /> component and get data from API, so handle this by favourites
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
        <S.PaginationContainer>
          <S.PageButton>
            <S.PrevButton />
          </S.PageButton>
          <S.PageButton active>1</S.PageButton>
          <S.PageButton>
            <S.NextButton />
          </S.PageButton>
        </S.PaginationContainer>
      </S.Container>
    </S.Wrapper>
  );
};

export default SearchPage;
