const FriendsNotification = require('../../models/FriendsNotification')
const SharedDiaryPostNotification = require('../../models/SharedDiaryPostNotification')

module.exports.createFriendRequestNotification = async (friendRequestId, recipientId) => {
    FriendsNotification.create({ friends: friendRequestId, recipient: recipientId })
}

module.exports.getReceivedFriendRequests = (req, res, done) => {
    const { _id } = req.tokenData.userData

    FriendsNotification
        .find({ recipient: _id }, (err, result) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    data: 'Unable to get the notifications for the received friend requests.'
                })
            }

            return res.status(200).json({
                success: true,
                data: result
            })
        })
}

module.exports.deleteReceivedFriendRequests = (req, res, done) => {
    const { _id } = req.tokenData.userData

    FriendsNotification
        .deleteMany({ recipient: _id }, (err, result) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    data: 'Unable to delete the notifications for the received friend requests.'
                })
            }

            return res.status(200).json({
                success: true,
                data: result
            })
        })
}

module.exports.createSharedDiaryPostNotification = (sharedDiaryPost, creator, recipient) => {
    SharedDiaryPostNotification.create({ sharedDiaryPost, creator, recipient })
}

module.exports.getSharedDiaryPostNotification = (req, res, done) => {
    const { _id } = req.tokenData.userData

    SharedDiaryPostNotification
        .find({ recipient: _id }, (err, result) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    data: 'Unable to get the notifications for the received shared diary posts.'
                })
            }

            return res.status(200).json({
                success: true,
                data: result
            })
        })
}