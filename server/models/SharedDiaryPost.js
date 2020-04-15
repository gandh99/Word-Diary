const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SharedDiaryPostSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'DiaryPost'
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

module.exports = SharedDiaryPost = mongoose.model('SharedDiaryPost', SharedDiaryPostSchema)