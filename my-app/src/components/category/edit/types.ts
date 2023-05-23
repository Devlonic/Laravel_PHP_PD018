export interface ICategoryEdit {
  name: string;
  image: File | null;
  description: string;
  imageUrl: string | null;
}

export interface ICategoryEditErrror {
  name: string;
  description: string;
  image: string;
}
