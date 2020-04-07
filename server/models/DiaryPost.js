const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DiaryPostSchema = new Schema({
    username: {
        type: String,
        required: true
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
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

module.exports = DiaryPost = mongoose.model('DiaryPost', DiaryPostSchema)