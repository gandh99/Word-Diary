const expresss = require('express')
const router = expresss.Router()
const notificationsController = require('../controllers/notificationsController')
const auth = require('../../middleware/auth')

// @route   GET /notifications/get-received-friend-requests-notifications
// @desc    For retrieving the number of friend requests received
// @access  Private
router.get('/get-received-friend-requests-notifications', auth, notificationsController.getReceivedFriendRequestsNotifications)

// @route   PUT /notifications/delete-received-friend-requests-notifications
// @desc    For retrieving the friend requests received
// @access  Private
router.put('/delete-received-friend-requests-notifications', auth, notificationsController.deleteReceivedFriendRequestsNotifications)

// @route   GET /notifications/get-shared-diary-posts-notifications
// @desc    For retrieving the diary posts shared with me
// @access  Private
router.get('/get-shared-diary-posts-notifications', auth, notificationsController.getSharedDiaryPostNotifications)

// @route   PUT /notifications/delete-shared-diary-post-notifications
// @desc    For retrieving the friend requests received
// @access  Private
router.put('/delete-shared-diary-post-notifications', auth, notificationsController.deleteSharedDiaryPostNotifications)

module.exports = router