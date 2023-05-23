import axios from "axios";
import classNames from "classnames";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { APP_ENV } from "../../../env";
import { ICategoryEdit, ICategoryEditErrror } from "./types";
import { ICategoryItem } from "../list/types";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import ReactLoading from "react-loading";
import ImageCropper from "../../service/images/ImageCropper";
import ImageCropperElement from "../../service/images/ImageCropperElement";

const CategoryEditPage = () => {
  const navigator = useNavigate();

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [editCategory, setEditCategory] = useState<ICategoryEdit>({
    name: "",
    description: "",
    image: null,
    imageUrl: null,
  });

  const [errors, setErrors] = useState<ICategoryEditErrror>({
    name: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    setIsLoading(true);
    axios
      .get<ICategoryItem>(`${APP_ENV.BASE_URL}api/category/${id}`)
      .then((resp) => {
        console.log("Сервак дав 1 category", resp);
        let initCategory = resp.data;
        setIsLoading(false);
        setEditCategory({
          name: initCategory.name,
          description: initCategory.description,
          imageUrl: "/storage/" + initCategory.image,
          image: null,
        });
      })
      .catch((e) => {
        setIsLoading(false);
        console.log("get category by id error: ", e);
      });

    console.log("use Effect working");
  }, []);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEditCategory({ ...editCategory, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ name: "", description: "", image: "" });
    axios
      .post(`${APP_ENV.BASE_URL}api/category/${id}`, editCategory, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setIsLoading(false);
        navigator("/");
      })
      .catch((er) => {
        const errors = er.response.data as ICategoryEditErrror;
        setErrors(errors);
        console.log("Server update error ", errors);
        setIsLoading(false);
      });
    //console.log("Submit data", dto);
  };

  const onImageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("image input handle change", e);
    if (e.target.files != null) {
      const image = e.target.files[0];
      onImageSaveHandler(image);
    }
  };
  const onImageSaveHandler = (file: File) => {
    console.log("image save handle", file);
    setEditCategory({ ...editCategory, image: file });
  };
  return (
    <>
      <h1 className="text-center">Edit категорію {id}</h1>
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
            <input
              type="file"
              accept="image/*"
              className={classNames("form-control", {
                "is-invalid": errors.image,
              })}
              id="image"
              name="image"
              onChange={onImageChangeHandler}
            />
            <ImageCropperElement
              imageUrl={editCategory.imageUrl}
              imageFile={editCategory.image}
              onImageSave={onImageSaveHandler}
            ></ImageCropperElement>
            {errors.image && (
              <div className="invalid-feedback">{errors.image}</div>
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
export default CategoryEditPage;
