import { api } from "./axiosInstance";

export function getUsers() {
  return api.get('users').then((res) => res.data).catch(err => err);
}
export function getUserPosts(id: number) {
  return api.get(`posts/?userId=${id}&skip=0&limit=10`).then((res) => res.data).catch(err => err);
}
export function getPost(id: number) {
  return api.get(`posts/${id}`).then((res) => res.data).catch(err => err);
}
export function getComments(id: number) {
  return api.get(`comments?postId=${id}`).then((res) => res.data).catch(err => err);
}
export function deletePost(id: number) {
  return api.delete(`posts/${id}`).then((res) => res.data).catch(err => err);
}
