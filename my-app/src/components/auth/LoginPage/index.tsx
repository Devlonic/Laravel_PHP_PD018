import classNames from "classnames";
import { ChangeEvent, useState } from "react";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { ILoginRequest, ILoginRequestError, ILoginResponce } from "./types";
import { APP_ENV } from "../../../env";
import { http, storeToken } from "../../../services/tokenService";

const LoginPage = () => {
  const navigator = useNavigate();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errors, setErrors] = useState<ILoginRequestError>({
    email: "",
    password: "",
    error: "",
  });
  const [dto, setDto] = useState<ILoginRequest>({
    email: "",
    password: "",
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDto({ ...dto, [e.target.name]: e.target.value });
  };

  const onLoginHandler = async (e: any) => {
    try {
      await setIsProcessing(true);
      var resp = await http.post(`${APP_ENV.BASE_URL}api/auth/login`, dto);
      var respData = resp.data as ILoginResponce;
      console.log("resp = ", respData);
      storeToken(respData.access_token);

      await setIsProcessing(false);
    } catch (e) {
      const er = e as any;
      const errors = er.response.data as ILoginRequestError;
      setErrors(errors);
      console.log("Server error", errors);
      await setIsProcessing(false);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="w-25">
        <h1 className="text-center">Login</h1>
        {isProcessing && (
          <div className="">
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
          <div className="wrapper">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={classNames("form-control", {
                  "is-invalid": errors.email,
                })}
                id="email"
                name="email"
                value={dto.email}
                onChange={onChangeHandler}
              />
              {errors.email && (
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
                value={dto.password}
                onChange={onChangeHandler}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <button
              onClick={onLoginHandler}
              type="button"
              className="btn btn-primary"
            >
              Sign in
            </button>
            {errors.error && <div className="text-danger">{errors.error}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
