import axios from "axios";
import classNames from "classnames";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { APP_ENV } from "../../../env";
import { ICategoryItem } from "../list/types";
import { ICategoryDeleteErrror } from "./types";

const CategoryEditPage = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const [errors, setErrors] = useState<ICategoryDeleteErrror>({
    id: "",
  });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.classList.add("show");
  });

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    axios
      .delete(`${APP_ENV.BASE_URL}api/category/${id}`)
      .then((resp) => {
        console.log(resp);
        navigator("/");
      })
      .catch((er) => {
        const errors = er.response.data as ICategoryDeleteErrror;
        setErrors(errors);
        console.log("Server delete error ", errors);
      });
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        ref={modalRef}
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete confirmation
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="fs-3">
                Are you sure you want to delete category with id:{" "}
                <b className="text-danger">{id}</b> ?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                onClick={onSubmitHandler}
                type="button"
                className="btn btn-danger"
              >
                Confirm delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CategoryEditPage;
