import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <>
      <div className="sidebar col-sm-4 col-md-3 col-lg-2 p-0">
        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link
                to={"/"}
                className="nav-link d-flex align-items-center gap-2 active"
                aria-current="page"
              >
                <i className={"bi bi-house-fill"}></i>
                Main
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"./category"}
                className="nav-link d-flex align-items-center gap-2"
              >
                <i className={"bi bi-file-earmark"}></i>
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"./product"}
                className="nav-link d-flex align-items-center gap-2"
              >
                <i className={"bi bi-cart"}></i>
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/"}
                className="nav-link d-flex align-items-center gap-2 disabled"
              >
                <i className={"bi bi-people"}></i>
                Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/"}
                className="nav-link d-flex align-items-center gap-2 disabled"
              >
                <i className={"bi bi-graph-up"}></i>
                Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/"}
                className="nav-link d-flex align-items-center gap-2 disabled"
              >
                <i className={"bi bi-puzzle"}></i>
                Integrations
              </Link>
            </li>
          </ul>

          <hr className="my-3" />

          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <Link
                to={"/"}
                className="nav-link d-flex align-items-center gap-2 disabled"
              >
                <i className={"bi bi-gear-wide-connected"}></i>
                Settings
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/auth/signout"}
                className="nav-link d-flex align-items-center gap-2"
              >
                <i className={"bi bi-door-closed"}></i>
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
