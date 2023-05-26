import { useNavigate } from "react-router-dom";
import { isSignedIn, removeToken } from "../../../services/tokenService";
import { useEffect } from "react";

const SignOutPage = () => {
  const navigator = useNavigate();

  useEffect(() => {
    if (isSignedIn() == true) removeToken();

    navigator("/");
  }, []);

  return (
    <>
      <h1>You cannot see this!</h1>
    </>
  );
};

export default SignOutPage;
