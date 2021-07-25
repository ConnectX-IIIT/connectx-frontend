import axios from "axios";

const instance = axios.create({
  baseURL: "https://obscure-ridge-13663.herokuapp.com",
});

export default instance;
