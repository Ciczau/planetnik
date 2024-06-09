import Navigation from "@/app/components/Navigation/Navigation";
import * as S from "./SearchPage.styled";
import Typography from "@/app/components/Typography/Typography";
import Input from "@/app/components/Input/Input";
import { useRouter } from "next/router";
import { IActivity } from "@/app/types/activity";
import Activity from "@/app/components/Activity/Activity";
import Checkbox from "@/app/components/Checkbox/Checkbox";

type Props = {
  activitiesByCity: IActivity[];
};

const SearchPage = ({ activitiesByCity }: Props) => {
  const router = useRouter();
  console.log(activitiesByCity);
  const location_id = router.query.location_id as string;

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push("/search/" + e.currentTarget.value);
    }
  };

  const renderActivities = () => {
    if (activitiesByCity.length === 0) {
      return <Typography tag="h2">Brak aktywności w danym miejscu.</Typography>;
    } else {
      return activitiesByCity?.slice(0, 4).map((activityByCity: IActivity) => {
        return (
          <Activity
            key={`search-page-${activityByCity.activity}-${activityByCity.date}`}
            activity={activityByCity}
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
            <Typography tag="h2">
              Wyniki wyszukiwania dla <b>{location_id}</b>
            </Typography>
          </div>
          <Input
            placeholder="Search for a city"
            value={location_id}
            width={500}
            onKeyUp={handleSearch}
          />
        </S.Header>
        <S.Content>
          <S.Activities>
            {/* TODO: Add loader*/ renderActivities()}
          </S.Activities>
          <S.Filters>
            {/* TODO: Handle filters */}
            <Typography tag="h3">Filtry</Typography>
            <S.FilterCategory>
              <Typography tag="h4">Data</Typography>
              <Checkbox label="Dzisiaj" checked={true} />
              <Checkbox label="Jutro" checked={true} />
              <Checkbox label="Pojutrze" checked={false} />
            </S.FilterCategory>
            <S.FilterCategory>
              <Typography tag="h4">Aktywności</Typography>
              <Checkbox label="Wspinaczka" checked={true} />
              <Checkbox label="Kolarstwo" checked={true} />
              <Checkbox label="Pedalstwo" checked={true} />
            </S.FilterCategory>
          </S.Filters>
        </S.Content>
        {/* TODO: Move pagination to component and handle query */}
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
