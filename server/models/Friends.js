const mongoose = require('mongoose')
const Schema = mongoose.Schema

const statusTypes = {
    REQUESTED: 'REQUESTED',     // friend requests issued by me
    PENDING: 'PENDING',         // friend requests I have yet to accept
    FRIENDS: 'FRIENDS',
}

const FriendsSchema = new Schema({
    requester: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enums: [
            statusTypes.REQUESTED,
            statusTypes.PENDING,
            statusTypes.FRIENDS
        ]
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

module.exports = Friends = mongoose.model('Friends', FriendsSchema)