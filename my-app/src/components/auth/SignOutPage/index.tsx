import { useNavigate } from "react-router-dom";
import { isSignedIn, removeToken } from "../../../services/tokenService";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthUserActionType, IAuthUser } from "../types";

const SignOutPage = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((store: any) => store.auth as IAuthUser);

  useEffect(() => {
    if (isAuth == true) {
      removeToken();
      dispatch({ type: AuthUserActionType.LOGOUT_USER });
    }
    navigator("/");
  }, []);

  return (
    <>
      <h1>Signing out...</h1>
    </>
  );
};

export default SignOutPage;
