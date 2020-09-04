import * as mongoose from 'mongoose';
// import { UserSchema } from '../../user/schemas/user.schema'

export const LedgeSchema = new mongoose.Schema({
    // 金额
    price: Number,
    // 收入/支出，
    porn: {
        type: String,
        enum: ['income', 'expense']
    },
    // 记录人
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema' },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'GroupSchema' },
    // 描述
    description: String,
    // 标签
    tag: [String],
    // 分类
    category: String,
    // 来源
    source: {
        type: String,
        enum: ['zfb', 'wx', 'bank', 'cash', 'credit', 'stock', 'fund']
    },
    // 收藏
    star: Boolean,
    // 创建时间
    date: String


});
