import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:5000')

export function subscribeToUpdates(callback) {
    const userData = localStorage.getItem('userData')
    socket.emit('subscribeToUpdates', userData)
    socket.emit('refresh', 'hello')
    socket.on('timer', timestamp => callback(timestamp))
    socket.on('refresh', msg => console.log(msg))
}