import instance from "./instance";

export const getFiltersRequest = async () => {
  try {
    const res = await instance.get("/api/search/filters");
    return res.data;
  } catch (err) {
    return err;
  }
};
