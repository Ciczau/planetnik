import Navigation from "@/app/components/Navigation/Navigation";
import * as S from "./SearchPage.styled";
import Typography from "@/app/components/Typography/Typography";
import Input from "@/app/components/Input/Input";
import { useRouter } from "next/router";
import { IActivity } from "@/app/types/activity";
import Activity from "@/app/components/Activity/Activity";
import Checkbox from "@/app/components/Checkbox/Checkbox";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { motion } from "framer-motion";
import Pagination from "@/app/components/Pagination/Pagination";

type Props = {
  activitiesByCity: IActivity[];
};

const MOCK_FILTERS = [
  { title: "Data", filters: ["Dzisiaj", "Jutro", "Pojutrze"] },
  {
    title: "Aktywności",
    filters: ["Wycieczka rowerowa", "Lot paralotnią z Jarmuży"],
  },
];

const SearchPage = ({ activitiesByCity }: Props) => {
  const [loaded, setLoaded] = useState<boolean>(true);
  const [filters, setFilters] = useState<string[]>([]);

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
      return activitiesByCity?.slice(0, 6).map((activityByCity: IActivity) => {
        return (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            key={`search-page-${activityByCity.type.name}-${activityByCity.date}`}
          >
            <Activity activity={activityByCity} />
          </motion.div>
        );
      });
    }
  };

  const debouncedFilters = debounce((filter: string) => {
    setLoaded(true);
    if (filters.includes(filter))
      setFilters(filters.filter((f) => f !== filter));
    else setFilters([...filters, filter]);
  }, 500);

  const handleCheckboxChange = (filter: string) => {
    setLoaded(false);
    debouncedFilters(filter);
  };

  useEffect(() => {
    console.log(filters);
  }, [filters]);
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
            {!loaded ? <S.Loader /> : renderActivities()}
          </S.Activities>
          <S.Filters>
            {/* TODO: Handle filters */}
            <Typography tag="h3">Filtry</Typography>
            {MOCK_FILTERS.map((filter) => {
              return (
                <S.FilterCategory key={filter.title}>
                  <Typography tag="h3">{filter.title}</Typography>
                  {filter.filters.map((filter) => {
                    return (
                      <Checkbox
                        key={filter}
                        label={filter}
                        onChange={() => handleCheckboxChange(filter)}
                      />
                    );
                  })}
                </S.FilterCategory>
              );
            })}
          </S.Filters>
        </S.Content>
        <Pagination />
      </S.Container>
    </S.Wrapper>
  );
};

export default SearchPage;
