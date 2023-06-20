import { Outlet, useNavigate } from "react-router-dom";
import DefaultHeader from "./DefaultHeader";
import { useEffect } from "react";
import { isSignedIn } from "../../../services/tokenService";

const DefaultLayout = () => {
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
