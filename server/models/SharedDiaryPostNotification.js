const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SharedDiaryPostNotificationSchema = new Schema({
    sharedDiaryPost: {
        type: Schema.Types.ObjectId,
        ref: 'SharedDiaryPost'
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

module.exports = SharedDiaryPostNotification = mongoose.model('SharedDiaryPostNotification', SharedDiaryPostNotificationSchema)