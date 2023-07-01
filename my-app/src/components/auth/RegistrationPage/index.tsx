import classNames from "classnames";
import { ChangeEvent, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { APP_ENV } from "../../../env";
import {
  http_common,
  isSignedIn,
  storeToken,
} from "../../../services/tokenService";
import {
  IRegistrationRequest,
  IRegistrationRequestError,
  IRegistrationResponce,
} from "./types";
import CropperDialog from "../../common/CropperDialog";
import * as yup from "yup";
import { useFormik } from "formik";

const RegistrationPage = () => {
  const navigator = useNavigate();

  useEffect(() => {
    if (isSignedIn() == true) {
      navigator("/");
    }
  });

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const initValues: IRegistrationRequest = {
    email: "",
    tel: "",
    photo: null,
    password: "",
    password_confirmation: "",
    name: "",
    surname: "",
  };

  const [responceError, setResponceError] = useState<string>();

  const registrationSchema = yup.object({
    email: yup.string().required("Enter email").email("Пошта вказана не вірно"),
    tel: yup.string().required("Enter phone number"), // todo add regex validation
    password: yup.string().required("Enter password"),
    password_confirmation: yup
      .string()
      .required("Repeat password")
      .test("is-same-passwords", "Passwords does not match", (value) => {
        return true;
      }),
    name: yup.string().required("Enter name"),
    surname: yup.string().required("Enter surname"),
  });

  const onSubmitFormikData = async (values: IRegistrationRequest) => {
    try {
      await setIsProcessing(true);
      var resp = await http_common.post(`api/auth/register`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      var respData = resp.data as IRegistrationResponce;
      console.log("resp = ", respData);
      navigator("../login");
      await setIsProcessing(false);
    } catch (e: any) {
      setResponceError(e);
      await setIsProcessing(false);
    }
  };
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: registrationSchema,
    onSubmit: onSubmitFormikData,
  });

  const { values, errors, touched, handleSubmit, handleChange } = formik;

  const onImageChange = (file: File) => {
    values.photo = file;
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
          <form onSubmit={handleSubmit}>
            <div className="wrapper">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className={classNames("form-control", {
                    "is-invalid": errors.name && touched.name,
                  })}
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
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
                    "is-invalid": errors.surname && touched.surname,
                  })}
                  id="surname"
                  name="surname"
                  value={values.surname}
                  onChange={handleChange}
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
                    "is-invalid": errors.tel && touched.tel,
                  })}
                  id="tel"
                  name="tel"
                  value={values.tel}
                  onChange={handleChange}
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
                    "is-invalid": errors.email && touched.email,
                  })}
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
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
                    "is-invalid": errors.password && touched.password,
                  })}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
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
                    "is-invalid":
                      errors.password_confirmation &&
                      touched.password_confirmation,
                  })}
                  name="password_confirmation"
                  value={values.password_confirmation}
                  onChange={handleChange}
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
                  onSave={onImageChange}
                  error={
                    errors.photo === undefined
                      ? ""
                      : touched.photo == true
                      ? errors.photo
                      : ""
                  }
                ></CropperDialog>
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Sign up!
                </button>
              </div>

              {responceError && (
                <div className="text-danger">{responceError}</div>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
