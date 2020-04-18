import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:5000')

export function subscribeToTimer(interval, callback) {
    const userData = localStorage.getItem('userData')
    socket.on('timer', timestamp => callback(timestamp))
    socket.emit('subscribeToTimer', userData, interval)
}