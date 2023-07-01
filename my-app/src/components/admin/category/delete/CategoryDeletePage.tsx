import classNames from "classnames";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ICategoryItem } from "../list/types";
import { ICategoryDeleteErrror } from "./types";
import ReactLoading from "react-loading";
import { APP_ENV } from "../../../../env";
import { http_common } from "../../../../services/tokenService";
import DangerDialog from "../../../common/DangerDialog";

const CategoryDeletePage = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const [errors, setErrors] = useState<ICategoryDeleteErrror>({
    id: "",
  });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const onCancelHandler = () => {
    navigator("../..");
  };
  const onSubmitHandler = () => {
    setIsProcessing(true);
    http_common
      .delete(`${APP_ENV.BASE_URL}api/category/${id}`)
      .then((resp) => {
        console.log(resp);
        setIsProcessing(false);
        navigator("../..");
      })
      .catch((er) => {
        setIsProcessing(false);
        const errors = er.response.data as ICategoryDeleteErrror;
        setErrors(errors);
        console.log("Server delete error ", errors);
      });
  };
  return (
    <>
      <h1 className="text-center">Deleting</h1>
      {isProcessing && (
        <div className="">
          <div className="row">
            <div className="col"></div>
            <div className="col">
              <div className="d-flex justify-content-center">
                <ReactLoading
                  type="bars"
                  color="red"
                  height={"50%"}
                  width={"50%"}
                ></ReactLoading>
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>
      )}
      <DangerDialog
        onCancel={onCancelHandler}
        onConfirm={onSubmitHandler}
        isShown={true}
      ></DangerDialog>
    </>
  );
};
export default CategoryDeletePage;
