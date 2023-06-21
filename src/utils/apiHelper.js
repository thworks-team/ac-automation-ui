import axios from 'axios';

const baseURL =  'http://api.sensor.thworks.org/api/v1';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjoiNjQ3NjNmZjRmMzVhZjM2ODhmNmJjNmU2IiwiaWF0IjoxNjg1NDcxMjc5LCJleHAiOjE2ODU1MjUyNzl9.7jH__nsQ1EZgYieUl79VXjVoP0vKtaFpJ8joKm0WXyY';

//All request will wait 2 seconds before timeout
// axiosClient.defaults.timeout = 2000;

// axiosClient.withCredentials = true;

export function getRequest(URL) {
  return axios({
    method: 'get',
    url: `${baseURL}${URL}`,
    headers: {
      Authorization:
        `Bearer ${token}`
    },
  });
}

export function postRequest(URL, payload) {
  return axios({
    method: 'post',
    url: `${baseURL}${URL}`,
    headers: {
      Authorization:
        `Bearer ${token}`
    },
    data: payload
  });
  // return axiosClient.post(`${URL}`, payload).then(response => response);
}

export function patchRequest(URL, payload) {
  return axios({
    method: 'get',
    url: `${baseURL}${URL}`,
    headers: {
      Authorization:
        `Bearer ${token}`
    },
    data: payload
  });
  // return axiosClient.patch(`${URL}`, payload).then(response => response);
}

export function deleteRequest(URL) {
  return axios({
    method: 'get',
    url: `${baseURL}${URL}`,
    headers: {
      Authorization:
        `Bearer ${token}`
    },
  });
  // return axiosClient.delete(`${URL}`).then(response => response);
}