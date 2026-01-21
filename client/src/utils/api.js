import axios from "axios";

// Render backend URL
const apiBaseURL = "https://chatboard-zewg.onrender.com";

export const GET = (url, header, callback, errorcallback) => {
  return axios
    .get(`${apiBaseURL}/${url}`, {
      headers: header,
    })
    .then((response) => {
      if (callback) callback(response);
    })
    .catch((err) => {
      if (errorcallback) errorcallback(err);
    });
};

export const POST = (url, data, header, callback, errorcallback) => {
  return axios
    .post(`${apiBaseURL}/${url}`, data, {
      headers: header,
    })
    .then((response) => {
      if (callback) callback(response);
    })
    .catch((err) => {
      if (errorcallback) errorcallback(err);
    });
};
