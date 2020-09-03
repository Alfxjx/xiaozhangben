import * as mongoose from "mongoose";

export const UserStatSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema' },
    money: Number,
    message: String,
    date: String
});

export const GroupStatSchema = new mongoose.Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'GroupSchema' },
    money: Number,
    message: String,
    date: String
})