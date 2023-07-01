export interface ICategoryEdit {
  id: number;
  name: string;
  image: File | null | string;
  description: string;
}

export interface ICategoryEditErrror {
  name: string;
  description: string;
  image: string;
}
