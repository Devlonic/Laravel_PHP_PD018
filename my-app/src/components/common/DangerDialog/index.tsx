import "./style.css";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import classNames from "classnames";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { IDangerModal } from "./types";

const DangerDialog: React.FC<IDangerModal> = ({
  text = "Are you sure you want to do this?!",
  onConfirm = null,
  onCancel = null,
  isShown = false,
}) => {
  const [shown, setShown] = useState<boolean>(isShown);

  useEffect(() => {});

  // show/hide modal window
  const toggleModal = async () => {
    await setShown((prev) => !prev);
  };

  const onClickConfirm = async () => {
    if (onConfirm) await onConfirm();
    await toggleModal();
  };

  const onClickCancel = async () => {
    if (onCancel) await onCancel();
    await toggleModal();
  };

  return (
    <>
      {/* modal body */}
      <div
        className={classNames("modal", { "custom-modal": shown })}
        tabIndex={-1}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Confirm action
              </h5>
            </div>
            <div className="modal-body">
              <h2>{text}</h2>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onClickCancel}
              >
                Cancel
              </button>
              <button
                onClick={onClickConfirm}
                type="button"
                className="btn btn-danger"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DangerDialog;
