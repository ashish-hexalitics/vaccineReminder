// src/utils/apiUtils.js

import axios from "axios";
// import toastr from 'toastr';

const API_URL = process.env.REACT_APP_API_URL || "http://192.168.1.21:8071/api";

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.request.use(function (config) {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    // if (authToken !== undefined && authToken !== null) {
    // }
    config.headers["Authorization"] = `Bearer ${authToken}`;
  } else {
    config.headers["x-api-key"] = "vaccine2024";
  }
  return config;
});

axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    // const isLogin = localStorage.getItem('authToken');
    // const role = localStorage.getItem('authRole');
    // const authUser = localStorage.getItem('authUser');

    // if (isLogin && error.response?.status === 401) {
    //   const parseUser = authUser && JSON.parse(authUser);
    //   const token = parseUser.activeToken;
    //   const refreshToken = localStorage.getItem('refreshToken');

    //   if (refreshToken && isLogin === token) {
    //     try {
    //       const res = await axiosApi.post(
    //         '/users/refreshToken',
    //         { refreshToken: `Bearer ${refreshToken}` },
    //         {
    //           headers: {
    //             'refresh-token': `Bearer ${refreshToken}`,
    //           },
    //         }
    //       );

    //       localStorage.setItem('authToken', res.data.activeToken);
    //       localStorage.setItem('refreshToken', res.data.refreshToken);
    //       localStorage.setItem('authUser', JSON.stringify(res.data.data.user));
    //       setTimeout(() => {
    //         window.location.reload();
    //       }, 1500);
    //     } catch (err) {
    //       console.error('Error refreshing token:', err);
    //       handleAuthRedirect(role);
    //       localStorage.clear();
    //     }
    //   } else {
    //     handleAuthRedirect(role);
    //   }
    // }

    return Promise.reject(error);
  }
);

export async function get(url, config = {}) {
  return axiosApi.get(url, { ...config }).then((response) => response.data);
}

export async function post(url, data, config = {}) {
  console.log(url, "url");
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function patch(url, data, config = {}) {
  return axiosApi
    .patch(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  return axiosApi.delete(url, { ...config }).then((response) => response.data);
}

export default axiosApi;
