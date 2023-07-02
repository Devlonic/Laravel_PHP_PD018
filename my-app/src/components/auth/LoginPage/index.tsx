import classNames from "classnames";
import { ChangeEvent, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useLocation, useNavigate } from "react-router-dom";
import { ILoginRequest, ILoginRequestError, ILoginResponce } from "./types";
import { APP_ENV } from "../../../env";
import {
  decodeToken,
  http_common,
  isSignedIn,
  storeToken,
} from "../../../services/tokenService";
import * as yup from "yup";
import { useFormik } from "formik";
import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AuthUserActionType, IAuthUser } from "../types";
import queryString from "query-string";

const LoginPage = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((store: any) => store.auth as IAuthUser);

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const forwardTo = queryParams.forwardTo;

  useEffect(() => {
    if (isAuth == true) {
      navigator("/");
    }
    console.log("params forwardto:", forwardTo);
  });
  const initValues: ILoginRequest = {
    email: "",
    password: "",
  };
  const loginSchema = yup.object({
    email: yup.string().required("Enter email").email("Пошта вказана не вірно"),
    password: yup.string().required("Enter password"),
  });

  const [responceError, setResponceError] = useState<string>();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const onSubmitFormikData = async (values: ILoginRequest) => {
    try {
      await setIsProcessing(true);
      var resp = await http_common.post(`api/auth/login`, values);
      var respData = resp.data as ILoginResponce;
      console.log("resp = ", respData);
      storeToken(respData.access_token);
      const user = decodeToken(respData.access_token) as IAuthUser;
      dispatch({
        type: AuthUserActionType.LOGIN_USER,
        payload: user,
      });
      await setIsProcessing(false);

      if (forwardTo !== undefined && forwardTo !== null) {
        if (typeof forwardTo === "string") {
          navigator(forwardTo);
        } else {
          navigator("/");
        }
      } else {
        navigator("/");
      }
    } catch (e: any) {
      setResponceError("Wrong login or password");
      await setIsProcessing(false);
    }
  };

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: loginSchema,
    onSubmit: onSubmitFormikData,
  });

  const { values, errors, touched, handleSubmit, handleChange } = formik;

  return (
    <div className="d-flex justify-content-center">
      <div className="w-25">
        <h1 className="text-center">Login</h1>
        {responceError && (
          <div className="alert alert-danger" role="alert">
            {responceError}
          </div>
        )}
        {isProcessing && (
          <div className="wrapper">
            <div className="row">
              <div className="col"></div>
              <div className="col">
                <div className="d-flex justify-content-center">
                  <ReactLoading
                    type="bars"
                    color="gray"
                    height={"50%"}
                    width={"50%"}
                  ></ReactLoading>
                </div>
              </div>
              <div className="col"></div>
            </div>
          </div>
        )}
        {!isProcessing && (
          <form onSubmit={handleSubmit}>
            <div className="wrapper">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className={classNames("form-control", {
                    "is-invalid": errors.email && touched.email,
                  })}
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className={classNames("form-control", {
                    "is-invalid": errors.password,
                  })}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && touched.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Sign in
              </button>
              {/* {errors.error && <div className="text-danger">{errors.error}</div>} */}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
