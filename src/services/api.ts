import axios from "axios";

const BACKEND_URL =
  "http://listing-service-env.eba-rtff238k.eu-north-1.elasticbeanstalk.com";

const baseURL = import.meta.env.DEV
  ? BACKEND_URL
  : import.meta.env.VITE_API_BASE_URL || "/api";

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});
