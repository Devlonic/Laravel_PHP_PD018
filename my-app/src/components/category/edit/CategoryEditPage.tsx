import axios from "axios";
import classNames from "classnames";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { APP_ENV } from "../../../env";
import { ICategoryEdit, ICategoryEditErrror } from "./types";
import { ICategoryItem } from "../list/types";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";

const CategoryEditPage = () => {
  const imageRef = useRef(null);
  const cropperRef = useRef(null);

  const navigator = useNavigate();

  const { id } = useParams();

  const [editCategory, setEditCategory] = useState<ICategoryEdit>({
    name: "",
    description: "",
    image: null,
  });

  const [category, setCategory] = useState<ICategoryItem>({
    id: -1,
    name: "",
    description: "",
    image: "",
  });

  const [errors, setErrors] = useState<ICategoryEditErrror>({
    name: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get<ICategoryItem>(`${APP_ENV.BASE_URL}api/category/${id}`)
      .then((resp) => {
        console.log("Сервак дав 1 category", resp);
        setCategory(resp.data);
        // setEditCategory();
      });

    console.log("use Effect working");
  }, []);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEditCategory({ ...editCategory, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ name: "", description: "", image: "" });
    axios
      .post(`${APP_ENV.BASE_URL}api/category/${id}`, editCategory, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        navigator("/");
      })
      .catch((er) => {
        const errors = er.response.data as ICategoryEditErrror;
        setErrors(errors);
        console.log("Server update error ", errors);
      });
    //console.log("Submit data", dto);
  };
  const onImageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setEditCategory({ ...editCategory, image: e.target.files[0] });
    }
  };

  return (
    <>
      <h1 className="text-center">Edit категорію {id}</h1>
      <form className="col-md-6 offset-md-3" onSubmit={onSubmitHandler}>
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
            // value={dto.name}
            onChange={onChangeHandler}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
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
            // value={dto.description}
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
            className={classNames("form-control", {
              "is-invalid": errors.image,
            })}
            id="image"
            name="image"
            onChange={onImageChangeHandler}
          />
          {errors.image && (
            <div className="invalid-feedback">{errors.image}</div>
          )}

          <img
            src={
              "https://static.wikia.nocookie.net/all-worlds-alliance/images/2/24/9abc7cf4bd20d565c5f7da6df73a9bdf.png/revision/latest?cb=20190106111029"
            }
            ref={imageRef}
            alt="Image to crop"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Додати
        </button>
      </form>
    </>
  );
};
export default CategoryEditPage;
