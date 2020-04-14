const expresss = require('express')
const router = expresss.Router()
const notificationsController = require('../controllers/notificationsController')
const auth = require('../../middleware/auth')

// @route   GET /notifications/received-friend-requests
// @desc    For retrieving the number of friend requests received
// @access  Private
router.get('/get-received-friend-requests', auth, notificationsController.getReceivedFriendRequests)

module.exports = router