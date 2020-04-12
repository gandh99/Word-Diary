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

// @route   GET /friends/get-friend-requests-issued-by-me
// @desc    For retrieving friend requests issued by me
// @access  Private
router.get('/get-friend-requests-issued-by-me', auth, friendsController.getFriendRequestsIssuedByMe)

// @route   GET /friends/get-friend-requests-issued-to-me
// @desc    For retrieving friend requests issued to me
// @access  Private
router.get('/get-friend-requests-issued-to-me', auth, friendsController.getFriendRequestsIssuedToMe)

// @route   UPDATE /friends/respond-to-pending-request
// @desc    For retrieving pending friend requests
// @access  Private
router.put('/respond-to-pending-request', auth, friendsController.respondToPendingRequest)

module.exports = router