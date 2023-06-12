import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'http://localhost:9000/api/v1/';

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

axiosClient.defaults.withCredentials = true;

export function getRequest(URL) {
  return axiosClient.get(`${URL}`).then(response => response);
}

export function postRequest(URL, payload) {
    console.log("axiosClient", axiosClient);
  return axiosClient.post(`${URL}`, payload).then(response => response);
}

export function patchRequest(URL, payload) {
  return axiosClient.patch(`${URL}`, payload).then(response => response);
}

export function deleteRequest(URL) {
  return axiosClient.delete(`${URL}`).then(response => response);
}