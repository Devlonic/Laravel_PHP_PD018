import { IAuthUser } from "./types";

const initState: IAuthUser = {
  isAuth: false,
  user: undefined,
};

export const AuthReducer = (state = initState, action: any): IAuthUser => {
  return state;
};
