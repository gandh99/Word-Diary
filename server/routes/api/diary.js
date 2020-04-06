const expresss = require('express')
const router = expresss.Router()
const diaryController = require('../controllers/diaryController')
const auth = require('../../middleware/auth')

// @route   POST /diary/translate
// @desc    For translating text
// @access  Private
router.post('/translate', auth, diaryController.translate)

// @route   POST /diary/add-post
// @desc    For add a new diary post
// @access  Private
router.post('/add-post', auth, diaryController.addPost)

module.exports = router