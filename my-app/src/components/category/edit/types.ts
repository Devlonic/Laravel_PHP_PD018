export interface ICategoryEdit {
  name: string;
  image: File | null;
  description: string;
}

export interface ICategoryEditErrror {
  name: string;
  description: string;
  image: string;
}
