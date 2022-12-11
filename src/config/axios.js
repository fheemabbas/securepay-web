import axios from "axios";
import { get } from "lodash";
import JwtService from "./../services/jwt.service";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});
let isRefreshing = false;
let failedQueue = [];

// Process all failed request 
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error)
      prom.reject(error);
    else
      prom.resolve(token);
  });
  failedQueue = [];
};

instance.interceptors.request.use(config => {
  if (JwtService.getToken())
    config.headers['Authorization'] = JwtService.getToken();
  return config;
});

instance.interceptors.response.use(
  response => response.data,
  error => {
    const originalRequest = error.config;
    const responseStatus = get(error, "response.status", "")

    // If refresh token fails
    if (responseStatus === 401 && error.config.url.indexOf("refresh-token") != -1) {
      processQueue(error, null);
      isRefreshing = false;
      return Promise.reject(error);
    }

    if (responseStatus === 401 && error.config.url.indexOf("login") != -1) {
      return Promise.reject(error);
    }

    // Check if original request 
    if (responseStatus === 401 && !originalRequest._retry) {
      // Push all the failed request due to expired token in queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
          .then(token => {
            originalRequest.headers["Authorization"] = "Token " + token;
            return instance(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      // Try to refresh token
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/auth/refresh-tokens`, { refreshToken: JwtService.getRefreshToken() })

          /* 
              On success save token, set headers and start processing 
              previously failed requests with new token
          */
          .then(response => {
            JwtService.saveToken(response.data.payload.tokens);
            axios.defaults.headers.common["Authorization"] = response.data.payload.tokens.access.token;
            originalRequest.headers["Authorization"] = response.data.payload.tokens.access.token;
            processQueue(null, response.data.payload.tokens.access.token);
            resolve(axios(originalRequest));
          })
          /* 
              On error proccess old failed request with token value null
              and redirect to respective authentication page
          */
          .catch(err => {
            processQueue(err, null);
            reject(err);
            // router.push({ name: "signin" });
          })
          /* 
              Finally set isRefreshing token to false in either success or failure
          */
          .finally(() => isRefreshing = false);
      });
    }

    return Promise.reject(error);
  }
);

/**
 * Set the default HTTP request headers
 */
const setHeader = () => {
  instance.defaults.headers.common["Authorization"] = `Token ${JwtService.getToken()}`;
}

export default instance