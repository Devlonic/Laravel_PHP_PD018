export interface ICategoryItem {
  id: number;
  name: string;
  image: string;
  description: string;
}

export interface ILinkUrl {
  url: string;
  label: string;
  active: boolean;
}

export interface ICategoryGetResult {
  current_page: number;
  data: ICategoryItem[];
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
