import axios from "axios";
class ConcurrencyHandler {
  constructor() {
    this.queue = [];
    this.isRefreshing = false;
  }

  execute(refreshTokenFunction) {
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
  const response = await api.post('/refresh', { refreshtoken: refreshToken });
  const newAccessToken = response.data.token;
  const newRefreshToken = response.data.refreshtoken;

  localStorage.setItem('authtoken', newAccessToken);
  localStorage.setItem('refreshtoken', newRefreshToken);

  return newAccessToken;
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 403 && originalRequest.url === '/refresh') {
      setTimeout(() => {
        window.location.href = '/login';
      }, 500);
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken =concurrencyHandler.execute(refreshTokenFunction) 
        api.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
        return api(originalRequest);
      } catch (err) {
        setTimeout(() => {
          window.location.href = '/login';
        }, 500);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);


