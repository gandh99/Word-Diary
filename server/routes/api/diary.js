const expresss = require('express')
const router = expresss.Router()
const diaryController = require('../controllers/diaryController')
const auth = require('../../middleware/auth')

// @route   POST /diary/translate
// @desc    For translating text
// @access  Private
router.post('/translate', auth, diaryController.translate)

// @route   POST /diary/add-post
// @desc    For adding a new diary post
// @access  Private
router.post('/add-post', auth, diaryController.addPost)

// @route   GET /diary/get-post
// @desc    For retrieving all diary posts belonging to the user
// @access  Private
router.get('/get-post', auth, diaryController.getPost)

// @route   UPDATE /diary/get-post
// @desc    For updating a particular post
// @access  Private
router.put('/update-post', auth, diaryController.updatePost)

module.exports = router