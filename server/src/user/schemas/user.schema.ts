import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  mail: String,
  date: String
});
