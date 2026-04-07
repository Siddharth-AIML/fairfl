import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000"
});

export const submitClient = (data) =>
  API.post("/submit-client", data);

export const getTrainingStatus = () =>
  API.get("/status");