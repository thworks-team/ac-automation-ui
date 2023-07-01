import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'https://api-sensor.thworks.org/api/v1';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjoiNjQ3NjNmZjRmMzVhZjM2ODhmNmJjNmU2IiwiaWF0IjoxNjg1NDcxMjc5LCJleHAiOjE2ODU1MjUyNzl9.7jH__nsQ1EZgYieUl79VXjVoP0vKtaFpJ8joKm0WXyY';

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Authorization : `Bearer ${token}`,
};

//All request will wait 2 seconds before timeout
// axiosClient.defaults.timeout = 2000;


export function getRequest(URL) {
  return axiosClient.get(`${URL}`).then(response => response);
}

export function postRequest(URL, payload) {
  return axiosClient.post(`${URL}`, payload).then(response => response);
}

export function patchRequest(URL, payload) {
  return axiosClient.patch(`${URL}`, payload).then(response => response);
}

export function deleteRequest(URL) {
  return axiosClient.delete(`${URL}`).then(response => response);
}
