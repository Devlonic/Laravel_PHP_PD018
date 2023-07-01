import { SyntheticEvent } from "react";

export interface IProductCreate {
  category_id: number | undefined;
  name: string;
  price: number;
  description: string;
}

export interface IProductCreateError {
  category_id: string[];
  name: string[];
  price: string[];
  description: string[];
}
