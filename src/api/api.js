import axios from "axios";

const api = axios.create({
  baseURL: "https://voting-backend-0b81.onrender.com",
});

export default api;
