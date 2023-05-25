import axios from "axios";
import classNames from "classnames";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ENV } from "../../../env";
import { ICategoryCreate, ICategoryCreateErrror } from "./types";
import CropperDialog from "../../common/CropperDialog";
const CategoryCreatePage = () => {
  const navigator = useNavigate();

  const [dto, setDto] = useState<ICategoryCreate>({
    name: "",
    description: "",
    image: null,
  });

  const [errors, setErrors] = useState<ICategoryCreateErrror>({
    name: "",
    description: "",
    image: "",
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDto({ ...dto, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ name: "", description: "", image: "" });
    axios
      .post(`${APP_ENV.BASE_URL}api/category`, dto, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        navigator("/");
      })
      .catch((er) => {
        const errors = er.response.data as ICategoryCreateErrror;
        setErrors(errors);
        console.log("Server error ", errors);
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
    setDto({ ...dto, image: file });
  };

  return (
    <>
      <h1 className="text-center">Створити категорію</h1>
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
            value={dto.name}
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
            value={dto.description}
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
            onSave={onImageChangeHandler}
            error={errors.image}
          ></CropperDialog>
        </div>
        <button type="submit" className="btn btn-primary">
          Додати
        </button>
      </form>
    </>
  );
};
export default CategoryCreatePage;
