const io = require('socket.io')()

// Setup IO connection
module.exports.init = () => {
    // Needs to be same port as the server in server.js
    const port = process.env.SERVER_PORT || 5000

    io.on('connection', client => {
        client.on('subscribeToTimer', (userDataString, interval) => {
            let userData = JSON.parse(userDataString)

            console.log(`${userData.username} with id ${client.id} is subscribing to timer with interval ${interval}`)
            setInterval(() => {
                client.emit('timer', new Date());
            }, interval)
        })
    })

    io.listen(port)
}