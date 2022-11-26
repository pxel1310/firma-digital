export interface ISignature {
  _id?: string;

  user: string;
  email: string;

  title: string;
  lastModified: number;
  size: number;
  type: string;
  base64File: string;

  privateKey?: string;
  publicKey?: string;
  signature?: string;

  createdAt?: string;
  updatedAt?: string;
}
