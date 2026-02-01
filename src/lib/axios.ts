import Axios, { InternalAxiosRequestConfig } from 'axios';

const CLIENT_API_URL = import.meta.env.CLIENT_API_URL;

const authRequestInterceptor = (
  config: InternalAxiosRequestConfig
  // token?: string
) => {
  const token =
    JSON.parse(sessionStorage.getItem('eagle_app') || '{}')?.accessToken ?? '';
  config.headers.set('Accept', 'application/json');
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  return config;
};

export const axiosInstance = () => {
  const instance = Axios.create({
    baseURL: CLIENT_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(authRequestInterceptor);

  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },

    async (error) => {
      // const originalRequest = error.config;
      // if (
      //   error.response &&
      //   error.response.status === 401 &&
      //   !originalRequest!._retry
      // ) {
      //   originalRequest._retry = true;

      //   try {
      //     const refreshInstance = await refreshTokenInstance();

      //     await refreshInstance.post("/auth/refresh-token");

      //     return instance(originalRequest);
      //   } catch (refreshError) {
      //     return Promise.reject(refreshError);
      //   }
      // }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const axiosInstanceExternal = (url: string) => {
  const instance = Axios.create({
    baseURL: url,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.response.use((response) => {
    return response.data;
  });

  return instance;
};

// const refreshTokenInstance = async () => {
//   const instance = Axios.create({
//     baseURL: CLIENT_API_URL,
//     withCredentials: true,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   instance.interceptors.response.use(
//     (response) => {
//       return response.data;
//     },

//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   return instance;
// };
