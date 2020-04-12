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

// @route   PUT /friends/respond-to-pending-friend-request
// @desc    For retrieving pending friend requests
// @access  Private
router.put('/respond-to-pending-friend-request', auth, friendsController.respondToPendingFriendRequest)

// @route   GET /friends/get-friends
// @desc    For retrieving all accepted friend requests
// @access  Private
router.get('/get-friends', auth, friendsController.getFriends)

// @route   PUT /friends/unfriend
// @desc    For removing a friend
// @access  Private
router.put('/unfriend', auth, friendsController.unfriend)

module.exports = router