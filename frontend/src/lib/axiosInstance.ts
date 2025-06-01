import axios, { AxiosInstance } from "axios";
import { config } from "./config";

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

function getAccessToken() {
  return localStorage.getItem("accessToken");
}
function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}
function setAccessToken(token: string) {
  localStorage.setItem("accessToken", token);
}

const API_BASE_URL_USER = config.userServiceBaseUrl;

export const attachInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => {
      const newToken = response?.data?.accessToken;
      if (newToken) {
        localStorage.setItem("accessToken", newToken);
      }

      return response;
    },
    async (error) => {
      const originalRequest = error.config;
 
       if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = "Bearer " + token;
              return instance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          
  
   
    const response = await axios.post(
  `${API_BASE_URL_USER}refresh-token`,
  {}, 
  {
    withCredentials: true, 
  }
);

          const newToken = response.data.accessToken;
          setAccessToken(newToken);

          instance.defaults.headers.common["Authorization"] =
            "Bearer " + newToken;
          processQueue(null, newToken);

          originalRequest.headers["Authorization"] = "Bearer " + newToken;
          return instance(originalRequest);
        } catch (err) {
          processQueue(err, null);
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};
