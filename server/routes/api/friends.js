const expresss = require('express')
const router = expresss.Router()
const friendsController = require('../controllers/friendsController')
const auth = require('../../middleware/auth')

// @route   GET /friends/user-search
// @desc    For searching a user
// @access  Private
router.get('/user-search/:username', auth, friendsController.userSearch)

// @route   POST /friends/issue-friend-request
// @desc    For making a friend request
// @access  Private
router.post('/issue-friend-request', auth, friendsController.issueFriendRequest)

// @route   GET /friends/get-pending-requests
// @desc    For retrieving pending friend requests
// @access  Private
router.get('/get-pending-requests', auth, friendsController.getPendingRequests)

module.exports = router