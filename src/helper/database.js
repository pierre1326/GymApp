import axios from 'axios';
import { backendURL } from "../constants/api";

export const insertDatabase = (data, collection) => {
  return axios.post(`${backendURL}/${collection}.json`, data);
};

export const updateDatabase = (id, data, collection) => {
  return axios.put(`${backendURL}/${collection}/${id}.json`, data);
};

export const deleteDatabase = (id, collection) => {
  return axios.delete(`${backendURL}/${collection}/${id}.json`);
};

export const getData = collection => {
  return axios.get(`${backendURL}/${collection}.json`).then(result => result.data).catch(() => undefined);
};