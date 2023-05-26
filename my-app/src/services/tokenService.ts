import axios from "axios";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";

export const storeToken = (token: string) => {
  localStorage.setItem("token", token);
  http = axios.create({
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  return localStorage.removeItem("token");
};

export const decodeToken = (token: string) => {
  return jwtDecode(token);
  // return jwt.decode(token);
};

export const isSignedIn = (): boolean => {
  let t = getToken();
  // todo add overdue check
  return t != null && t != "" && t != undefined;
};

export var http = axios.create({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});
