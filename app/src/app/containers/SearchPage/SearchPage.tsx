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
import { IFilter, IFilters } from "@/app/types/filters";
import { getFiltersRequest } from "@/app/api/searchRequests";

type Props = {
  activitiesByCity: IActivity[];
};

const SearchPage = ({ activitiesByCity }: Props) => {
  const [loaded, setLoaded] = useState<boolean>(true);
  const [filters, setFilters] = useState<IFilters[]>([]);
  const [checkedFilters, setCheckedFilters] = useState<
    { name: string; values: string[] }[]
  >([]);
  const [activities, setActivities] = useState<IActivity[]>(
    activitiesByCity || []
  );

  const router = useRouter();

  const location_id = router.query.location_id as string;

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push("/search/" + e.currentTarget.value);
    }
  };

  const renderActivities = () => {
    if (activities.length === 0) {
      return <Typography tag="h2">Brak aktywności w danym miejscu.</Typography>;
    } else {
      return activities?.map((activityByCity: IActivity) => {
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

  const debouncedFilters = debounce((filter: IFilter, section: string) => {
    setLoaded(true);

    const existingValues =
      typeof router.query[section] === "string"
        ? (router.query[section] as string)?.split(",") || []
        : [];

    const newValues = handleChecked(filter, section)
      ? existingValues.filter((v) => v !== filter.value)
      : [...existingValues, filter.value];
    const uniqueValues = Array.from(new Set(newValues));

    router.replace(
      {
        pathname: router.route,
        query: {
          ...router.query,
          [section]:
            uniqueValues.length !== 0 ? uniqueValues.join(",") : undefined,
        },
      },
      { pathname: router.route },
      { shallow: true }
    );

    setCheckedFilters((prev) => {
      const newFilters = prev.map((f) => {
        if (f.name === section) {
          return { name: f.name, values: uniqueValues };
        }
        return f;
      });
      return newFilters;
    });
  }, 500);

  const handleCheckboxChange = (filter: IFilter, section: string) => {
    setLoaded(false);
    debouncedFilters(filter, section);
  };

  useEffect(() => {
    const getFilters = async () => {
      const res = await getFiltersRequest();
      setFilters(res.filters);
    };
    getFilters();
  }, [filters]);

  useEffect(() => {
    const filteredActivites = activitiesByCity.filter((activity) => {
      return checkedFilters.every((filter) => {
        if (filter.values.length === 0) return true;
        if (filter.name === "Data") {
          return filter.values.includes(
            new Date(activity.date * 1000).toISOString().split("T")[0]
          );
        }
        if (filter.name === "Aktywności") {
          return filter.values.includes(activity.type.name);
        }
        return true;
      });
    });
    setActivities(checkedFilters.length ? filteredActivites : activitiesByCity);
  }, [activitiesByCity, checkedFilters]);

  useEffect(() => {
    if (router.query) {
      const fetchedFilters = Object.keys(router.query).map((key) => {
        const value = router.query[key];
        if (value) {
          return {
            name: key,
            values:
              typeof value === "string"
                ? value.split(",")
                : (value as string[]),
          };
        }
        return { name: key, values: [] };
      });
      setCheckedFilters(fetchedFilters);
    }
  }, [router.query]);

  const handleChecked = (filter: IFilter, section: string) => {
    if (
      checkedFilters.map((f) => f.name).includes(section) &&
      checkedFilters
        .filter((f) => f.name === section)[0]
        .values.includes(filter.value)
    ) {
      return true;
    }
    return false;
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
            {!loaded ? <S.Loader /> : renderActivities()}
          </S.Activities>
          <S.Filters>
            <Typography tag="h3">Filtry</Typography>
            {filters.map((section) => {
              return (
                <S.FilterCategory key={`search-filters-${section.name}`}>
                  <Typography tag="h3">{section.name}</Typography>
                  {section.filters.map((filter) => {
                    return (
                      <Checkbox
                        key={filter.value}
                        label={filter.name}
                        checked={handleChecked(filter, section.name)}
                        onChange={() =>
                          handleCheckboxChange(filter, section.name)
                        }
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
