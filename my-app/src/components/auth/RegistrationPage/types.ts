export interface IRegistrationRequest {
  email: string;
  tel: string;
  photo: File | null;
  password: string;
  password_confirmation: string;
  name: string;
  surname: string;
}

export interface IRegistrationRequestError {
  email: string;
  tel: string;
  photo: string;
  password: string;
  password_confirmation: string;
  name: string;
  surname: string;
  error: string;
}

export interface IRegistrationResponce {}
