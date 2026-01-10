import axios from "axios";

const API_BASE_URL = "http://listing-service-env.eba-rtff238k.eu-north-1.elasticbeanstalk.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});
