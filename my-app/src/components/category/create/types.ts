import { SyntheticEvent } from "react";

export interface ICategoryCreate {
  name: string;
  image: File | null;
  description: string;
}

export interface ICategoryCreateErrror {
  name: string;
  description: string;
  image: string;
}
