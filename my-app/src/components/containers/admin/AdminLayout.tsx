import "./admin.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DefaultHeader from "./AdminHeader";
import { useEffect } from "react";
import { isSignedIn } from "../../../services/tokenService";
import { useSelector } from "react-redux";
import { IAuthUser } from "../../auth/types";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const navigator = useNavigate();

  const { isAuth, user } = useSelector((store: any) => store.auth as IAuthUser);
  const location = useLocation();
  const currentRoute = location.pathname;

  useEffect(() => {
    console.log("DefaultLayout useEffect");
    console.log("current route:", currentRoute);
    if (isAuth == false) {
      navigator(`/auth/login?forwardTo=${currentRoute}`);
    }
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="admin container">
        <div className="row">
          <AdminSidebar></AdminSidebar>
          <main className="col-sm-8 col-md-9 col-lg-10 px-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
export default AdminLayout;
