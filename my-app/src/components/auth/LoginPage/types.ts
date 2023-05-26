export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginRequestError {
  email: string;
  password: string;
  error: string;
}

export interface ILoginResponce {
  access_token: string;
  expires_in: number;
}
