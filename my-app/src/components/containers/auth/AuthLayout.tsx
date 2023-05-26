import { Outlet } from "react-router-dom";
import AuthHeader from "./AuthHeader";

const AuthLayout = () => {
  return (
    <>
      <AuthHeader />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};
export default AuthLayout;
