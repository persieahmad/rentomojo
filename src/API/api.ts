import { api } from "./axiosInstance";

export function getUsers() {
  return api.get('users').then((res) => res.data).catch(err => err);
}