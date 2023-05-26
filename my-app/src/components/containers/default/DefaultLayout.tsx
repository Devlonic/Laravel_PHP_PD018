import { Outlet, useNavigate } from "react-router-dom";
import DefaultHeader from "./DefaultHeader";
import { useEffect } from "react";
import { isSignedIn } from "../../../services/tokenService";

const DefaultLayout = () => {
  const navigator = useNavigate();

  useEffect(() => {
    console.log("DefaultLayout useEffect");
    if (isSignedIn() == false) {
      navigator("/auth/login");
    }
  }, []);

  return (
    <>
      <DefaultHeader />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};
export default DefaultLayout;
