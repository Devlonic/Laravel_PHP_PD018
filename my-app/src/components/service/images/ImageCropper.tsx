import React, { useEffect, useRef, useState } from "react";
import Cropper from "cropperjs";
// import "cropperjs/dist/cropper.min.css";

type ImageCropperProps = {
  imageUrl: string | null;
  onReady: any;
};

const ImageCropper = ({ onReady, imageUrl }: ImageCropperProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const previewRef = useRef<HTMLImageElement>(null);
  const cropperRef = useRef<Cropper | null>(null);

  const [needToPreview, setNeedToPreview] = useState<boolean>(false);

  useEffect(() => {
    if (imageUrl != null) cropperRef.current?.replace(imageUrl);
    else
      console.log("cannot set image on cropper because imageUrl is ", imageUrl);
    console.log("Imagecropper useEffect, imageUrl = ", imageUrl);

    // create Cropper instance
    if (cropperRef.current == null) {
      console.log("need to create cropper");
      cropperRef.current = new Cropper(imageRef.current as HTMLImageElement, {
        crop(event: any) {
          console.log("need to set preview");
          setNeedToPreview(true);
        },
      });
    }
    // set interval to throttle preview update
    var interval = setInterval(() => {
      const croppedCanvas = cropperRef.current?.getCroppedCanvas();
      if (previewRef.current != null && needToPreview) {
        previewRef.current.src = croppedCanvas?.toDataURL() as string;
        setNeedToPreview(false);
        console.log("was previewed");
      } else {
        console.log("no need to preview", previewRef.current, needToPreview);
      }
      console.log("setInterval");
    }, 500);
    return () => {
      console.log("ImageCropper cleanup");
      clearInterval(interval);
    };
  }, [imageUrl]);

  const handleSave = () => {
    console.log("saved");
    const croppedCanvas = cropperRef.current?.getCroppedCanvas();
    onReady(croppedCanvas);
  };

  return (
    <>
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
    </>
  );
};

export default ImageCropper;
