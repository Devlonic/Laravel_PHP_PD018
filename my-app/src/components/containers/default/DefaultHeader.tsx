import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { http_common, removeToken } from "../../../services/tokenService";
import { AuthUserActionType, IAuthUser } from "../../auth/types";
import { useSelector } from "react-redux";

const DefaultHeader = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const { isAuth, user } = useSelector((store: any) => store.auth as IAuthUser);

  const onClickLogout = (e: any) => {
    e.preventDefault();
    removeToken();
    dispatch({ type: AuthUserActionType.LOGOUT_USER });
    navigator("/auth/login");
  };

  const onClickLogin = (e: any) => {
    e.preventDefault();
    navigator("/auth/login");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Товари
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Пошук
              </button>
            </form>
            {isAuth && (
              <>
                <Link
                  to={"/admin"}
                  className="btn btn-outline-danger"
                  aria-current="page"
                >
                  Admin
                </Link>
                <button
                  className="btn btn-outline-secondary"
                  aria-current="page"
                  onClick={onClickLogout}
                >
                  Sign out from {user?.email}
                </button>
              </>
            )}
            {!isAuth && (
              <button
                className="btn btn-outline-secondary"
                aria-current="page"
                onClick={onClickLogin}
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DefaultHeader;
