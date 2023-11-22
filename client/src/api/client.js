import axios from "axios";

const BASE_URL = "https://mern-real-estate-orpin.vercel.app/api/v1";

const client = axios.create({
  baseURL: BASE_URL,
});

export default client;
