import { getActivityTypesRequest } from "@/app/api/activityRequests";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const response = await getActivityTypesRequest();
  console.log(response);
  return {
    props: {
      fetchedActivityTypes: response?.activityTypes || [],
    },
  };
};
