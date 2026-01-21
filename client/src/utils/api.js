import axios from "axios";

// 🔥 LIVE BACKEND URL
const apiBaseURL = "https://chatboard-zewg.onrender.com";

export const GET = (url, header = {}, callback, errorcallback) => {
  return axios
    .get(`${apiBaseURL}${url}`, {
      headers: header,
    })
    .then((response) => {
      if (callback) callback(response);
    })
    .catch((err) => {
      console.error("GET Error:", err.response?.data || err.message);
      if (errorcallback) errorcallback(err);
    });
};

export const POST = (url, data, header = {}, callback, errorcallback) => {
  return axios
    .post(`${apiBaseURL}${url}`, data, {
      headers: header,
    })
    .then((response) => {
      if (callback) callback(response);
    })
    .catch((err) => {
      console.error("POST Error:", err.response?.data || err.message);
      if (errorcallback) errorcallback(err);
    });
};

export const DELETE = (url, header = {}, callback, errorcallback) => {
  return axios
    .delete(`${apiBaseURL}${url}`, {
      headers: header,
    })
    .then((response) => {
      if (callback) callback(response);
    })
    .catch((err) => {
      console.error("DELETE Error:", err.response?.data || err.message);
      if (errorcallback) errorcallback(err);
    });
};
