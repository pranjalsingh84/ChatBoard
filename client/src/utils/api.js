import axios from "axios";

// 🔴 Render backend base URL (NO localhost, NO trailing extra logic)
const apiBaseURL = "https://chatboard-zewg.onrender.com";

// Axios instance
const api = axios.create({
  baseURL: apiBaseURL,
});

// Automatically attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

// ================= GET =================
export const GET = (url, header = {}, callback, errorcallback) => {
  return api
    .get(url, {
      headers: header,
    })
    .then((response) => {
      if (callback) callback(response);
    })
    .catch((err) => {
      if (errorcallback) errorcallback(err);
    });
};

// ================= POST =================
export const POST = (url, data, header = {}, callback, errorcallback) => {
  return api
    .post(url, data, {
      headers: header,
    })
    .then((response) => {
      if (callback) callback(response);
    })
    .catch((err) => {
      if (errorcallback) errorcallback(err);
    });
};
