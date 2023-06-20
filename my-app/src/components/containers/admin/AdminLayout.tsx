import { Outlet, useNavigate } from "react-router-dom";
import DefaultHeader from "./AdminHeader";
import { useEffect } from "react";
import { isSignedIn } from "../../../services/tokenService";

const AdminLayout = () => {
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
export default AdminLayout;
