import axios from 'axios'

const client = axios.create({
  baseURL: "/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  }
});

export default client;
