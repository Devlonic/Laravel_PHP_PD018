import { ICroppedModal } from "./types";
import "./style.css";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import classNames from "classnames";
import { LegacyRef, useEffect, useRef, useState } from "react";

const defaultThumb = "/imageThumb256.png";

const CropperDialog: React.FC<ICroppedModal> = ({
  imageUri = defaultThumb,
  error = null,
  onSave = null,
}) => {
  const [shown, setShown] = useState<boolean>(false);
  const [wasClicked, setWasClicked] = useState<boolean>(false);
  const [croppedImage, setCroppedImage] = useState<string>(imageUri);
  const [cropper, setCropper] = useState<Cropper | null>(null);

  const imagePreviewRef = useRef<HTMLImageElement>();
  const imageCropperEditAreaRef = useRef<HTMLImageElement>();
  const fileSelectInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (cropper == null && imageCropperEditAreaRef.current) {
      const cropperObj = new Cropper(
        imageCropperEditAreaRef.current as HTMLImageElement,
        {
          viewMode: 1,
          aspectRatio: 1 / 1,
        }
      );
      setCropper(cropperObj);
    }
  });

  // show/hide modal window
  const toggleModal = async () => {
    await setShown((prev) => !prev);
  };

  // save cropped image from Cropper to croppedImage
  const onSaveCroppedHandler = async (e: any) => {
    const base64croppedImageResult = cropper
      ?.getCroppedCanvas()
      .toDataURL() as string;
    await setCroppedImage(base64croppedImageResult);

    try {
      const resp = await fetch(base64croppedImageResult);
      const blob = await resp.blob();
      const filename = `${"image"}.${blob.type}`;
      const file = new File([blob], filename, { type: blob.type });

      if (onSave) onSave(file);
    } catch (er) {
      error = er as string;
    }
    await toggleModal();
  };

  // select image from file OR edit received from above
  const onCroppedImageResultClick = async (e: any) => {
    if (!wasClicked && imageUri != defaultThumb) {
      console.log("imageUri != defaultThumb");
      cropper?.replace(imageUri);
      await toggleModal();
      await setWasClicked(true);
    } else {
      console.log("need to select");
      await fileSelectInputRef.current?.click();
    }
  };

  // the user has selected an image. opens modal to edit
  const onImageChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || !files.length) {
      error = "Select images!";
      return;
    }

    const file = files[0];
    if (!/^image\/\w+/.test(file.type)) {
      error = "Select correct image!";
      return;
    }
    const url = URL.createObjectURL(file);

    cropper?.replace(url);
    await toggleModal();
  };

  return (
    <div
      className={classNames("form-control my-cropper bg-light", {
        "is-invalid": error,
      })}
    >
      {/* title */}
      <h1 className="text-dark">My Cropper v.1</h1>

      {/* hidden file input */}
      <input
        type="file"
        accept="image/*"
        className={classNames("form-control d-none", {
          "is-invalid": error,
        })}
        id="image"
        name="image"
        ref={fileSelectInputRef as LegacyRef<HTMLInputElement>}
        onChange={onImageChangeHandler}
      />

      {/* cropped result and button to select and crop image again */}
      <img
        className="cur-pointer"
        src={croppedImage}
        ref={imagePreviewRef as LegacyRef<HTMLImageElement>}
        alt="Result"
        onClick={onCroppedImageResultClick}
      />
      {error && <div className="invalid-feedback">{error}</div>}

      {/* modal body */}
      <div
        className={classNames("modal", { "custom-modal": shown })}
        tabIndex={-1}
      >
        <div className="modal-dialog fix-max-width">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit image
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={toggleModal}
              ></button>
            </div>
            <div className="modal-body">
              <img
                ref={imageCropperEditAreaRef as LegacyRef<HTMLImageElement>}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button
                onClick={onSaveCroppedHandler}
                type="button"
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropperDialog;
