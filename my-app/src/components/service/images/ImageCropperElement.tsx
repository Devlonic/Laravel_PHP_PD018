import React, { useEffect, useState } from "react";
import ImageCropper from "./ImageCropper";

type ImageSaveCallback = (f: File) => void;

type ImageCropperElementProps = {
  imageUrl: string | null;
  imageFile: File | null;
  onImageSave: ImageSaveCallback;
};

const ImageCropperElement = ({
  imageUrl,
  imageFile,
  onImageSave,
}: ImageCropperElementProps) => {
  const [imageUrlInternal, setImageUrlInternal] = useState<string | null>(null);

  useEffect(() => {
    console.log("Imagecropperelement useEffect. imageFile = ", imageFile);

    if (imageFile != null) {
      // when we need to replace image
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrlInternal(reader.result as string);
        console.log("reader.onload finish");
      };

      if (imageFile != null) reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  const onInternalImageSave = (canvas: HTMLCanvasElement) => {
    console.log("onImageSave. canvas: ", canvas);
    canvas.toBlob((blob) => {
      if (blob == null || imageFile == null) {
        console.log("blob or image file is null. Halt.", blob, imageFile);
        return;
      }
      const file = new File([blob], imageFile.name, { type: imageFile.type });
      console.log(file);
      onImageSave(file);
    }, imageFile?.type);
  };

  return (
    <div className="bg-light p-2 cropper-wrapper">
      <ImageCropper
        imageUrl={imageUrlInternal}
        onReady={onInternalImageSave}
      ></ImageCropper>
    </div>
  );
};

export default ImageCropperElement;
