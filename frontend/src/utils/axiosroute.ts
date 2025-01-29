 import axios from "axios";

class ConcurrencyHandler {
  queue: { resolve: (value?: unknown) => void; reject: (reason?: any) => void; }[];
  isRefreshing: boolean;

  constructor() {
    this.queue = [];
    this.isRefreshing = false;
  }

  execute(refreshTokenFunction:()=>Promise<string>) {
    return new Promise((resolve, reject) => {
      this.queue.push({ resolve, reject });

      if (!this.isRefreshing) {
        this.isRefreshing = true;

        refreshTokenFunction()
          .then(token => {
            this.queue.forEach(promise => promise.resolve(token));
            this.queue = [];
            this.isRefreshing = false;
          })
          .catch(err => {
            this.queue.forEach(promise => promise.reject(err));
            this.queue = [];
            this.isRefreshing = false;
          });
      }
    });
  }
}

export const api = axios.create({
  baseURL: process.env.BASE_URL,
});

const concurrencyHandler = new ConcurrencyHandler();

const refreshTokenFunction = async () => {
  const refreshToken = localStorage.getItem('refreshtoken');
  try {
    const response = await axios.post(`${process.env.BASE_URL}/refresh`, { refreshtoken: refreshToken });
    if (response.status === 200) {
      const newAccessToken = response.data.token;
      const newRefreshToken = response.data.refreshtoken;

      // Update tokens in local storage
      localStorage.setItem('authtoken', newAccessToken);
      localStorage.setItem('refreshtoken', newRefreshToken);

      return newAccessToken;
    }
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
};

// Request interceptor to attach the access token
api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("authtoken");
    if (!token) {
      window.location.href = "/login";
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration and refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Redirect to login if refresh token fails
    if (
      error.response.status === 403 &&
      originalRequest.url.includes("/refresh")
    ) {
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
      return Promise.reject(error);
    }

    // If token is expired (401) and the request has not been retried yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Execute refresh token logic using the concurrency handler
        const newAccessToken = await concurrencyHandler.execute(
          refreshTokenFunction
        );

        // If token is refreshed successfully, set the new token in headers
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new access token
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        setTimeout(() => {
          window.location.href = "/login";
        }, 500);
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    return Promise.reject(error);
  }
);
