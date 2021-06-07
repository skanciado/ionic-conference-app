export interface IUser {
  UserName: string;
  Email: string;
  DefaultLanguatge: string;
  Roles: string[];
  Token: string;
  RefreshToken: string;
}
export interface ILogin {
  User: string;
  Password: string;
}
export interface IResponse {
  Status: string;
  Message: string;
}
export interface IResponseWithReturn<T> {
  Status: string;
  Message: string;
  Return: T;
}
