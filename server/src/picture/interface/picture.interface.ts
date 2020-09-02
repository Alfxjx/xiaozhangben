import { Document } from "mongoose";

export interface Picture extends Document {
    filename: string;
    url: string;
    size: string;
}