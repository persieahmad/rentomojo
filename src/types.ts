export type TUserPosts = {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export type TUsers = {
  id: number;
  name: string;
  company: {
    name: string;
  } 
}
export type TComments = {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string;
}
