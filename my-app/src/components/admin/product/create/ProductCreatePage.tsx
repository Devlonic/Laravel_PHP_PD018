import classNames from "classnames";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IProductCreate, IProductCreateError } from "./types";
import ReactLoading from "react-loading";
import { APP_ENV } from "../../../../env";
import { http_common } from "../../../../services/tokenService";
import * as yup from "yup";
import { useFormik } from "formik";
import { AxiosError } from "axios";
const ProductCreatePage = () => {
  const navigator = useNavigate();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [initValues, setInitValues] = useState<IProductCreate>({
    name: "",
    description: "",
    category_id: 0,
    price: 0,
  });

  const productCreateSchema = yup.object({
    name: yup.string().required("Enter name"),
    description: yup.string().required("Enter description"), // todo add regex validation
    category_id: yup.number().required("Enter category"),
    price: yup.number().required("Enter price"),
  });

  const [responceError, setResponceError] = useState<IProductCreateError>();

  const onSubmitFormikData = async (values: IProductCreate) => {
    try {
      await setIsProcessing(true);
      var resp = await http_common.post(`api/product`, values);
      var respData = resp.data;
      console.log("resp = ", respData);
      navigator("..");
      await setIsProcessing(false);
    } catch (e: any) {
      const axiosError = e as AxiosError;
      const error = axiosError.response?.data as IProductCreateError;
      console.log("product create server error", error);
      setResponceError(error);
      errors.category_id = error.category_id?.join(", ");
      errors.description = error.description?.join(", ");
      errors.name = error.name?.join(", ");
      errors.price = error.price?.join(", ");
      await setIsProcessing(false);
    }
  };

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: productCreateSchema,
    onSubmit: onSubmitFormikData,
  });

  const { values, errors, touched, handleSubmit, handleChange } = formik;

  // const onImageChangeHandler = (f: File) => {
  //   console.log("image input handle change", f);
  //   if (f != null) {
  //     onImageSaveHandler(f);
  //   }
  // };
  // const onImageSaveHandler = (file: File) => {
  //   console.log("image save handle", file);
  //   setDto({ ...dto, image: file });
  // };

  return (
    <>
      <h1 className="text-center">Створити товар</h1>
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
        <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Назва
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": errors.name,
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
            <label htmlFor="description" className="form-label">
              Опис
            </label>
            <input
              type="text"
              id="description"
              className={classNames("form-control", {
                "is-invalid": errors.description,
              })}
              name="description"
              value={values.description}
              onChange={handleChange}
            />
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Ціна
            </label>
            <input
              type="number"
              className={classNames("form-control", {
                "is-invalid": errors.price,
              })}
              id="price"
              name="price"
              value={values.price}
              onChange={handleChange}
            />
            {errors.price && (
              <div className="invalid-feedback">{errors.price}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Категорія
            </label>
            <input
              type="number"
              className={classNames("form-control", {
                "is-invalid": errors.category_id,
              })}
              id="category_id"
              name="category_id"
              value={values.category_id}
              onChange={handleChange}
            />
            {errors.category_id && (
              <div className="invalid-feedback">{errors.category_id}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Додати
          </button>
        </form>
      )}
    </>
  );
};
export default ProductCreatePage;
