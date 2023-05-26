import jwt from "jsonwebtoken";

export const storeToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  return localStorage.removeItem("token");
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};
