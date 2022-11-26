import axios from "axios";

const firmaApi = axios.create({
  baseURL: "/api",
});

export default firmaApi;
