const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DiaryPostSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    phrase: {
        type: String,
        required: true
    },
    translatedPhrase: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    starred: {
        type: Boolean,
        default: false
    },
    sharedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

module.exports = DiaryPost = mongoose.model('DiaryPost', DiaryPostSchema)