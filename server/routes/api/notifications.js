const expresss = require('express')
const router = expresss.Router()
const notificationsController = require('../controllers/notificationsController')
const auth = require('../../middleware/auth')

// @route   GET /notifications/get-received-friend-requests
// @desc    For retrieving the number of friend requests received
// @access  Private
router.get('/get-received-friend-requests', auth, notificationsController.getReceivedFriendRequests)

// @route   PUT /notifications/delete-received-friend-requests
// @desc    For retrieving the number of friend requests received
// @access  Private
router.put('/delete-received-friend-requests', auth, notificationsController.deleteReceivedFriendRequests)

module.exports = router