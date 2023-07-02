import { ICategoryItem } from "../../category/list/types";

export interface IProductImageItem {
  name: string;
  priority: number;
}

export interface IProductItem {
  id: number;
  category: ICategoryItem;
  images: IProductImageItem[];
  name: string;
  price: number;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ILinkUrl {
  url: string;
  label: string;
  active: boolean;
}

export interface IProductGetResult {
  current_page: number;
  data: IProductItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: ILinkUrl[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}
