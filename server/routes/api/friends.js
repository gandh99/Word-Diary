const expresss = require('express')
const router = expresss.Router()
const friendsController = require('../controllers/friendsController')
const auth = require('../../middleware/auth')

// @route   GET /friends/user-search
// @desc    For translating text
// @access  Private
router.get('/user-search/:username', auth, friendsController.userSearch)

module.exports = router