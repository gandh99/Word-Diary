const expresss = require('express')
const router = expresss.Router()
const notificationsController = require('../controllers/notificationsController')
const auth = require('../../middleware/auth')

// @route   GET /notifications/get-received-friend-requests
// @desc    For retrieving the number of friend requests received
// @access  Private
router.get('/get-received-friend-requests', auth, notificationsController.getReceivedFriendRequests)

// @route   PUT /notifications/delete-received-friend-requests
// @desc    For retrieving the friend requests received
// @access  Private
router.put('/delete-received-friend-requests', auth, notificationsController.deleteReceivedFriendRequests)

// @route   GET /notifications/get-shared-diary-posts
// @desc    For retrieving the diary posts shared with me
// @access  Private
router.get('/get-shared-diary-posts', auth, notificationsController.getSharedDiaryPostNotification)

module.exports = router