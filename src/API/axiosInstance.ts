import axios from "axios";

const url: string = 'https://jsonplaceholder.typicode.com/'

export const api = axios.create({
  baseURL: url,
});
