import React, { useEffect, useRef, useState } from "react";
import Cropper from "cropperjs";
// import "cropperjs/dist/cropper.min.css";

type ImageCropperProps = {
  imageFile: File | null;
  onReady: any;
};

const ImageCropper = ({ imageFile, onReady }: ImageCropperProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const previewRef = useRef<HTMLImageElement>(null);
  const cropperRef = useRef<Cropper | null>(null);

  let needToPreview = false;
  useEffect(() => {
    console.log("Imagecropper useEffect");

    // create Cropper instance
    if (cropperRef.current == null) {
      cropperRef.current = new Cropper(imageRef.current as HTMLImageElement, {
        crop(event: any) {
          needToPreview = true;
        },
      });
    }

    // set interval to throttle preview update
    setInterval(() => {
      const croppedCanvas = cropperRef.current?.getCroppedCanvas();
      if (previewRef.current != null && needToPreview) {
        previewRef.current.src = croppedCanvas?.toDataURL() as string;
        needToPreview = false;
        console.log("was previewed");
      }
    }, 500);

    // when we need to replace image
    const reader = new FileReader();
    reader.onload = () => {
      cropperRef.current?.replace(reader.result as string);
    };

    if (imageFile != null) reader.readAsDataURL(imageFile);
  }, [imageFile]);

  const handleSave = () => {
    console.log("saved");
    const croppedCanvas = cropperRef.current?.getCroppedCanvas();
    onReady(croppedCanvas);
  };

  return (
    <div className="bg-light p-2 cropper-wrapper">
      <div className="row">
        <div className="col">
          <div className="wrapper">
            <img ref={imageRef} alt="Edit area" className="cropper-image" />
          </div>
        </div>
        <div className="col">
          <div className="wrapper">
            <img
              className="bg-danger cropper-image"
              ref={previewRef}
              alt="preview"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ImageCropper;
