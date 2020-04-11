const User = require('../../models/User')
const Friends = require('../../models/Friends')

module.exports.userSearch = async (req, res, done) => {
    const { userData } = req.tokenData
    const originalUserId = userData.id
    const searchString = req.params.username

    // Find all users where the substring appears at the start of their username (except the originator of this query)
    const matchingUsers = await User.find(
        { 'username': { '$regex': "^" + searchString, "$ne": userData.username } },
        (err, users) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    data: 'Error searching for the user.'
                })
            }
        }
    )

    // Find all friend requests issued by the originator of this query whose status is "REQUESTED"
    const requestedFriends = await Friends.find(
        { 'requester': originalUserId },
        'recipient',    // returns only the _id of the recipient
        (err, users) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    data: 'Error searching for the requested friends.'
                })
            }
        }
    )

    // Package the data to send back
    const idOfRequestedFriends = requestedFriends.map(user => user.recipient.toString())    // necessary to convert to string
    let usersData = []
    for (let matchingUser of matchingUsers) {
        let userData = {
            username: matchingUser.username,
            personalMessage: matchingUser.personalMessage,
            status: 'Add'
        }

        // Check if this user, who matches the search string, has been sent a friend request by the query originator
        if (idOfRequestedFriends.includes(matchingUser._id.toString())) {
            userData.status = 'Requested'
        }

        usersData.push(userData)
    }

    return res.status(200).json({
        success: true,
        data: usersData
    })
}

module.exports.issueFriendRequest = async (req, res, done) => {
    const { userData } = req.tokenData

    // We assume userA issued the friend request to userB
    const UserA = await User.findOne({ 'username': userData.username }, (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                data: 'Error searching for requester.'
            })
        }
    })
    const UserB = await User.findOne({ 'username': req.body.recipient }, (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                data: 'Error searching for recipient.'
            })
        }
    })

    // Create a friend request for both parties
    const FriendsA = await Friends.findOneAndUpdate(
        { 'requester': UserA._id, 'recipient': UserB._id },
        { 'status': 'REQUESTED' },
        { upsert: true, new: true, useFindAndModify: false }
    )
    const FriendsB = await Friends.findOneAndUpdate(
        { 'requester': UserB._id, 'recipient': UserA._id },
        { 'status': 'PENDING' },
        { upsert: true, new: true, useFindAndModify: false }
    )

    // Add the friend request to each user's schema if it does not already exist
    const updateUserA = await User.findOneAndUpdate(
        { _id: UserA._id, 'friends': { $ne: FriendsA._id } },
        { $push: { 'friends': FriendsA._id } },
        { useFindAndModify: false }
    )
    const updateUserB = await User.findOneAndUpdate(
        { _id: UserB._id, 'friends': { $ne: FriendsB._id } },
        { $push: { 'friends': FriendsB._id } },
        { useFindAndModify: false }
    )

    return res.status(200).send({
        success: true,
        data: 'Friend request sent.'
    })
}

module.exports.getPendingRequests = async (req, res, done) => {
    const { userData } = req.tokenData
    const userId = userData.id

    // Get all the pending friend requests (requests yet to be accepted by me)
    await Friends
        .find(
            { 'requester': userId, 'status': 'PENDING' },
            'recipient',    // returns the id of the user who issued the friend request
            (err, requests) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        data: 'Error retrieving pending friend requests.'
                    })
                }
            }
        )
        .populate('recipient', 'username personalMessage')      // essentially a JOIN + SELECT statement
        .exec((err, usersWhoIssuedRequestToMe) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    data: 'Error retrieving pending friend requests.'
                })
            }

            const usersArray = usersWhoIssuedRequestToMe.map(user => user.recipient)
            return res.status(200).json({
                success: true,
                data: usersArray
            })
        })
}

module.exports.respondToPendingRequest = async (req, res, done) => {
    const { userData } = req.tokenData
    const ownId = userData.id
    const { friendId, friendUsername, isAccepted } = req.body

    if (isAccepted) {
        // Modify friendship to reflect accepted status
        await Friends
            .findOneAndUpdate(
                { 'requester': friendId, 'recipient': ownId },
                { $set: { status: 'ACCEPTED' } },
                { useFindAndModify: false }
            )
        await Friends
            .findOneAndUpdate(
                { 'requester': ownId, 'recipient': friendId },
                { $set: { status: 'ACCEPTED' } },
                { useFindAndModify: false }
            )

        return res.status(200).json({
            success: true,
            data: { friendId, friendUsername, isAccepted }
        })
    } else {
        // Modify friendship to reflect rejected status
        const docA = await Friends.findOneAndRemove(
            { 'requester': ownId, 'recipient': friendId }
        )
        const docB = await Friends.findOneAndRemove(
            { 'requester': friendId, 'recipient': ownId }
        )
        const updateSelf = await User.findOneAndUpdate(
            { '_id': ownId },
            { $pull: { 'friends': docA._id } },
            { useFindAndModify: false }
        )
        const updateFriend = await User.findOneAndUpdate(
            { '_id': friendId },
            { $pull: { 'friends': docB._id } },
            { useFindAndModify: false }
        )

        return res.status(200).json({
            success: true,
            data: { friendId, friendUsername, isAccepted }
        })
    }
}