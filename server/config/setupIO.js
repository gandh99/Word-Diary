let io
let userToIOMap = {}

// Setup IO connection
module.exports.init = (ioObject) => {
    // Save the IO object
    io = ioObject

    // Update the map of users who have connected
    io.on('connection', client => {
        client.on('subscribeToUpdates', (userDataString) => {
            let userData = JSON.parse(userDataString)
            userToIOMap[userData._id] = client.id

            console.log(`${userData.username} with id ${client.id} is subscribing to updates`)
            client.emit('timer', new Date())
        })
    })
}

// Signal to client to refresh
module.exports.sendRefreshSignal = (userId) => {
    const receiverId = userToIOMap.userId
    console.log(receiverId)
    io.on('connection', client => {
        client.on('refresh', () => {
            setInterval(() => {
                client.broadcast.to(receiverId).emit('refresh', 'Time to refresh!')
            }, 5000)
        })
    })
}