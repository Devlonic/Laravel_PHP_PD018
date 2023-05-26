import classNames from "classnames";
import { ChangeEvent, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { APP_ENV } from "../../../env";
import { http, isSignedIn, storeToken } from "../../../services/tokenService";
import {
  IRegistrationRequest,
  IRegistrationRequestError,
  IRegistrationResponce,
} from "./types";
import CropperDialog from "../../common/CropperDialog";

const RegistrationPage = () => {
  const navigator = useNavigate();

  useEffect(() => {
    if (isSignedIn() == true) {
      navigator("/");
    }
  });

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errors, setErrors] = useState<IRegistrationRequestError>({
    email: "",
    tel: "",
    photo: "",
    password: "",
    password_confirmation: "",
    name: "",
    surname: "",
    error: "",
  });
  const [dto, setDto] = useState<IRegistrationRequest>({
    email: "",
    tel: "",
    photo: null,
    password: "",
    password_confirmation: "",
    name: "",
    surname: "",
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDto({ ...dto, [e.target.name]: e.target.value });
  };

  const onRegistrationHandler = async (e: any) => {
    try {
      await setIsProcessing(true);
      var resp = await http.post(`${APP_ENV.BASE_URL}api/auth/register`, dto, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      var respData = resp.data as IRegistrationResponce;
      console.log("resp = ", respData);
      navigator("../login");
      await setIsProcessing(false);
    } catch (e: any) {
      const errors = e.response.data as IRegistrationRequestError;
      setErrors(errors);
      console.log("Server error", errors);
      await setIsProcessing(false);
    }
  };

  const onImageChangeHandler = (f: File) => {
    console.log("image input handle change", f);
    if (f != null) {
      onImageSaveHandler(f);
    }
  };
  const onImageSaveHandler = (file: File) => {
    console.log("image save handle", file);
    setDto({ ...dto, photo: file });
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="w-50">
        <h1 className="text-center">Registration</h1>
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
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className={classNames("form-control", {
                  "is-invalid": errors.name,
                })}
                id="name"
                name="name"
                value={dto.name}
                onChange={onChangeHandler}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="surname" className="form-label">
                Surname
              </label>
              <input
                type="text"
                className={classNames("form-control", {
                  "is-invalid": errors.surname,
                })}
                id="surname"
                name="surname"
                value={dto.surname}
                onChange={onChangeHandler}
              />
              {errors.surname && (
                <div className="invalid-feedback">{errors.surname}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="tel" className="form-label">
                Telephone
              </label>
              <input
                type="tel"
                className={classNames("form-control", {
                  "is-invalid": errors.tel,
                })}
                id="tel"
                name="tel"
                value={dto.tel}
                onChange={onChangeHandler}
              />
              {errors.tel && (
                <div className="invalid-feedback">{errors.tel}</div>
              )}
            </div>
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
            <div className="mb-3">
              <label htmlFor="password_confirmation" className="form-label">
                Repeat password
              </label>
              <input
                type="password"
                id="password_confirmation"
                className={classNames("form-control", {
                  "is-invalid": errors.password_confirmation,
                })}
                name="password_confirmation"
                value={dto.password_confirmation}
                onChange={onChangeHandler}
              />
              {errors.password_confirmation && (
                <div className="invalid-feedback">
                  {errors.password_confirmation}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Photo</label>
              <CropperDialog
                onSave={onImageChangeHandler}
                error={errors.photo}
              ></CropperDialog>
            </div>
            <div className="mb-3">
              <button
                onClick={onRegistrationHandler}
                type="button"
                className="btn btn-primary w-100"
              >
                Sign up!
              </button>
            </div>

            {errors.error && <div className="text-danger">{errors.error}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
