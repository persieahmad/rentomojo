import { api } from "./axiosInstance";

export function getUsers() {
  return api.get('users').then((res) => res.data).catch(err => err);
}
export function getPosts(id: number | string) {
  return api.get(`posts/?userId=${id}&skip=0&limit=10`).then((res) => res.data).catch(err => err);
}
