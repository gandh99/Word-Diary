const User = require('../../models/User')
const Friends = require('../../models/Friends')

module.exports.userSearch = async (req, res, done) => {
    const { userData } = req.tokenData
    const ownId = userData.id
    const searchString = req.params.username

    // Find all users where the substring appears at the start of their username (except the originator of this query)
    const matchingUsers = await User.find(
        { username: { '$regex': "^" + searchString, "$ne": userData.username } },
        (err, users) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    data: 'Error searching for the user.'
                })
            }
        }
    )

    // Find all friend requests issued by the originator of this query whose status is "PENDING"
    const requestedFriends = await Friends.find(
        { requester: ownId, status: 'PENDING' },
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
            _id: matchingUser._id,
            username: matchingUser.username,
            personalMessage: matchingUser.personalMessage,
            status: 'Add'
        }

        // Check if this user, who matches the search string, has been sent a friend request by the query originator
        if (idOfRequestedFriends.includes(matchingUser._id.toString())) {
            userData.status = 'Pending'
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
    const ownId = userData.id
    const { recipientId } = req.body   

    // Create the friend request
    const friendRequest = await Friends.findOneAndUpdate(
        { requester: ownId, recipient: recipientId },
        { status: 'PENDING' },
        { upsert: true, new: true, useFindAndModify: false }
    )

    // Add the friend request to each user's schema if it does not already exist
    await User.findOneAndUpdate(
        { _id: ownId, friends: { $ne: friendRequest._id } },
        { $push: { friends: friendRequest._id } },
        { useFindAndModify: false }
    )
    await User.findOneAndUpdate(
        { _id: recipientId, friends: { $ne: friendRequest._id } },
        { $push: { friends: friendRequest._id } },
        { useFindAndModify: false }
    )

    return res.status(200).send({
        success: true,
        data: 'Friend request sent.'
    })
}

module.exports.getFriendRequestsIssuedByMe = async (req, res, done) => {
    const { userData } = req.tokenData
    const userId = userData.id

    // Get all the pending friend requests issued by me
    await Friends
        .find(
            { requester: userId, status: 'PENDING' },
            'recipient',    // returns the id of the user to whom I issued the friend request
            (err, requests) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        data: 'Error retrieving friend requests issued by me.'
                    })
                }
            }
        )
        .populate('recipient', '_id username personalMessage')      // essentially a JOIN + SELECT statement
        .exec((err, usersWhoReceivedMyRequest) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    data: 'Error retrieving friend requests issued by me.'
                })
            }

            const usersArray = usersWhoReceivedMyRequest.map(user => user.recipient)
            return res.status(200).json({
                success: true,
                data: usersArray
            })
        })
}

module.exports.getFriendRequestsIssuedToMe = async (req, res, done) => {
    const { userData } = req.tokenData
    const userId = userData.id

    // Get all the pending friend requests issued to me
    await Friends
        .find(
            { recipient: userId, status: 'PENDING' },
            'requester',    // returns the id of the user who issued the friend request to me
            (err, requests) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        data: 'Error retrieving friend requests issued to me.'
                    })
                }
            }
        )
        .populate('requester', '_id username personalMessage')      // essentially a JOIN + SELECT statement
        .exec((err, usersWhoIssuedRequestToMe) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    data: 'Error retrieving friend requests issued to me.'
                })
            }

            const usersArray = usersWhoIssuedRequestToMe.map(user => user.requester)
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