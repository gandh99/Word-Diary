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
            console.log(`${userData.username} with client id ${client.id} is subscribing to updates.`)
            client.emit('subscribed', 'Successfully subscribed to updates from the server.')
        })
    })
}

// Signal to client to refresh
module.exports.sendRefreshSignal = (userId) => {
    const receiverId = userToIOMap[userId]
    io.to(receiverId).emit('refresh', 'Time to refresh!')
}