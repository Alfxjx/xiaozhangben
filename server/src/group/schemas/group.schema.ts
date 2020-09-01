import * as mongoose from "mongoose";

export const GroupSchema = new mongoose.Schema({
    groupname: String,
    list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema' }]
});