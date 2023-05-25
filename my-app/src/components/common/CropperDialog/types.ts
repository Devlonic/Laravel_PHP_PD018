import { EventHandler, SyntheticEvent } from "react";

export interface ICroppedModal {
  imageUri?: string;
  error: string;
  onSave?: (file: File) => void;
}
