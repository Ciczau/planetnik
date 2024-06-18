import axios from "axios";

const instance = axios.create({
  baseURL: "https://lit-spire-72639-2dab392f74b8.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;
