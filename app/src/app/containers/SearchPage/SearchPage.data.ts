import { getWeatherForLocation } from "@/app/api/weatherRequests";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { location_id: "location_id" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const location = params?.location_id;
  const response = await getWeatherForLocation(location as string);

  return {
    props: {
      activitiesByCity: response?.activitiesByCity || [],
    },
  };
};
