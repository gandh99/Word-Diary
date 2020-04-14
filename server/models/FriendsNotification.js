const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FriendsNotificationSchema = new Schema({
    friends: {
        type: Schema.Types.ObjectId,
        ref: 'Friends'
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

module.exports = FriendsNotification = mongoose.model('FriendsNotification', FriendsNotificationSchema)