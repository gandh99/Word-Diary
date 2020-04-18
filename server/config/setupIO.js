let io
let userToIOMap = {}

// Setup IO connection
module.exports.init = (ioObject) => {
    // Save the IO object
    io = ioObject

    io.on('connection', client => {
        client.on('subscribeToUpdates', (userDataString) => {
            // Update the map of users who have connected
            let userData = JSON.parse(userDataString)
            userToIOMap[userData._id] = client.id

            // Subscription successful
            console.log(`${userData.username} [userId: ${userData._id}; clientId: ${client.id}] is subscribing to updates.`)
            client.emit('subscribed', 'Successfully subscribed to updates from the server.')
        })
    })
}

// Signal to client to refresh for a received shared diary post
module.exports.receivedSharedDiaryPostSignal = (userId) => {
    const receiverId = userToIOMap[userId]
    io.to(receiverId).emit('sharedDiaryPost')
}

// Signal to client to refresh for a received friend request
module.exports.receivedFriendRequestSignal = (userId) => {
    const receiverId = userToIOMap[userId]
    console.log(userId, receiverId)
    io.to(receiverId).emit('receivedFriendRequest')
}