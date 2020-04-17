const FriendsNotification = require('../../models/FriendsNotification')
const SharedDiaryPostNotification = require('../../models/SharedDiaryPostNotification')

module.exports.createFriendRequestNotification = async (friendRequestId, recipientId) => {
    FriendsNotification.create({ friends: friendRequestId, recipient: recipientId })
}

module.exports.getReceivedFriendRequestsNotifications = (req, res, done) => {
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

module.exports.deleteReceivedFriendRequestsNotifications = (req, res, done) => {
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

module.exports.getSharedDiaryPostNotifications = (req, res, done) => {
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

module.exports.deleteSharedDiaryPostNotifications = (req, res, done) => {
    const { userData } = req.tokenData
    const userId = userData._id

    SharedDiaryPostNotification
        .deleteMany({ recipient: userId }, (err, result) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    data: 'Unable to delete the notifications for the shared diary posts.'
                })
            }

            return res.status(200).json({
                success: true,
                data: result
            })
        })
}