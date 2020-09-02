import * as mongoose from 'mongoose';

export const PictureSchema = new mongoose.Schema({
    filename: String,
    url: String,
    size: String
})