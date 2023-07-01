import classNames from "classnames";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ICategoryEdit, ICategoryEditErrror } from "./types";
import { IProductItem } from "../list/types";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import ReactLoading from "react-loading";
import { APP_ENV } from "../../../../env";
import { http_common } from "../../../../services/tokenService";
import CropperDialog from "../../../common/CropperDialog";

const ProductEditPage = () => {
  const navigator = useNavigate();

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [editCategory, setEditCategory] = useState<ICategoryEdit>({
    id: -1,
    name: "",
    description: "",
    image: null,
  });

  const [toSendCategory, setToSendCategory] = useState<any>({});

  const [errors, setErrors] = useState<ICategoryEditErrror>({
    name: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    setIsLoading(true);
    http_common
      .get<IProductItem>(`${APP_ENV.BASE_URL}api/category/${id}`)
      .then((resp: any) => {
        let initCategory = resp.data;
        console.log("Сервак дав 1 category", initCategory);
        setIsLoading(false);
        setEditCategory({
          id: initCategory.id,
          name: initCategory.name,
          description: initCategory.description,
          image: "/storage/" + initCategory.image,
        });
      })
      .catch((e: any) => {
        setIsLoading(false);
        console.log("get category by id error: ", e);
      });

    console.log("use Effect working");
  }, []);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEditCategory({ ...editCategory, [e.target.name]: e.target.value });
    setToSendCategory({ ...toSendCategory, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    console.log("CategoryEditPAge onSUbmitHAndler");
    e.preventDefault();
    setIsLoading(true);
    setErrors({ name: "", description: "", image: "" });
    http_common
      .post(`${APP_ENV.BASE_URL}api/category/${id}`, toSendCategory, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setIsLoading(false);
        navigator("../../..");
      })
      .catch((er: any) => {
        const errors = er.response.data as ICategoryEditErrror;
        setErrors(errors);
        console.log("Server update error ", errors);
        setIsLoading(false);
      });
    //console.log("Submit data", dto);
  };

  const onImageChangeHandler = (f: File) => {
    console.log("image input handle change", f);
    if (f != null) {
      onImageSaveHandler(f);
    }
  };
  const onImageSaveHandler = (file: File) => {
    console.log("image save handle", file);
    setEditCategory({ ...editCategory, image: file });
    setToSendCategory({ ...toSendCategory, image: file });
  };
  return (
    <>
      <h1 className="text-center">Редагування товару {id}</h1>
      {isLoading && (
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
      {!isLoading && (
        <form
          className={classNames("col-md-6 offset-md-3")}
          onSubmit={onSubmitHandler}
        >
          <div className="mb-3">
            <label className="form-label">ID</label>
            <input
              disabled={true}
              type="text"
              className={classNames("form-control", {
                "is-invalid": errors.name,
              })}
              value={editCategory.id}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Наза
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": errors.name,
              })}
              id="name"
              name="name"
              value={editCategory.name}
              onChange={onChangeHandler}
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
              value={editCategory.description}
              onChange={onChangeHandler}
            />
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <CropperDialog
              imageUri={editCategory.image as string}
              onSave={onImageChangeHandler}
              error={errors.image}
            ></CropperDialog>
          </div>
          <button type="submit" className="btn btn-danger">
            Save edit
          </button>
        </form>
      )}
    </>
  );
};
export default ProductEditPage;
