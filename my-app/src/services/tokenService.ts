import axios from "axios";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import { APP_ENV } from "../env";
import { useDispatch } from "react-redux";
import { AuthUserActionType } from "../components/auth/types";

export const storeToken = (token: string) => {
  console.log("store token");
  localStorage.setItem("token", `Bearer ${token}`);
  http_common.defaults.headers["Authorization"] = getToken();
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  delete http_common.defaults.headers["Authorization"];
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

export var http_common = axios.create({
  baseURL: APP_ENV.BASE_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});
