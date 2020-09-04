import { Document } from 'mongoose';

export interface User extends Document {
  readonly username: string;
  readonly password: string;
  readonly mail: string;
  _id?: string;
}

export interface UserRO extends Document {
  readonly username: string;
  readonly mail: string;
  readonly token: any;
}