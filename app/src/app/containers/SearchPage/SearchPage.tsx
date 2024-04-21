import Navigation from "@/app/components/Navigation/Navigation";
import * as S from "./SearchPage.styled";
import Typography from "@/app/components/Typography/Typography";
import Input from "@/app/components/Input/Input";
import { useRouter } from "next/router";

type Props = {
  activitiesByCity: any;
};

const SearchPage = ({ activitiesByCity }: Props) => {
  const router = useRouter();
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
      return activitiesByCity.map((activityByCity: any) => {
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
          <div />
        </S.Header>
        <S.Content>{renderActivities()}</S.Content>
      </S.Container>
    </S.Wrapper>
  );
};

export default SearchPage;
