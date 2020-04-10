const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    personalMessage: {
        type: String,
        required: true,
        default: "Hi there! I'm using Word Diary!"
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Friends'
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('User', UserSchema)