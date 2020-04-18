import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:5000')

export function subscribeToUpdates(callback) {
    const userData = localStorage.getItem('userData')
    socket.emit('subscribeToUpdates', userData)
    socket.on('timer', timestamp => callback(timestamp))
}