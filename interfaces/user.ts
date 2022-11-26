export interface IUser {
  _id: string;

  name: string;
  email: string;
  password?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface UserAll {
  name: string;
  email: string;
  numOfSignatures: number;
}
