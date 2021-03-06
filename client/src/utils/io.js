import openSocket from 'socket.io-client'
import { getFriendRequestsIssuedToMeAction } from '../redux/actions/friendsActions'
import { getReceivedFriendRequestsNotificationsAction, getSharedDiaryPostsNotificationsAction } from '../redux/actions/notificationsActions'
import { getDiaryPostsSharedWithMeAction } from '../redux/actions/diaryActions'
const socket = openSocket('http://localhost:5000')
let dispatch

export function initIO(dispatchObject) {
    dispatch = dispatchObject

    // Initiate IO connection to the server to subscribe to updates from it
    const userData = localStorage.getItem('userData')
    socket.emit('subscribeToUpdates', userData)
    socket.on('subscribed', msg => console.log(msg))

    // Listen for the signal to refresh when the user receives a shared diary post
    socket.on('sharedDiaryPost', () => fetchSharedDiaryPostFromServer())

    // Listen for the signal to refresh when the user receives a friend request
    socket.on('receivedFriendRequest', () => fetchReceivedFriendRequestFromServer())
}

const fetchSharedDiaryPostFromServer = () => {
    dispatch(getDiaryPostsSharedWithMeAction())
    dispatch(getSharedDiaryPostsNotificationsAction())
}

const fetchReceivedFriendRequestFromServer = () => {
    dispatch(getFriendRequestsIssuedToMeAction())
    dispatch(getReceivedFriendRequestsNotificationsAction())
}