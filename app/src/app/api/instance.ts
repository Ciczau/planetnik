import axios from "axios";

const instance = axios.create({
  baseURL: "https://planetnik-backend-7ff91dff2443.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;
