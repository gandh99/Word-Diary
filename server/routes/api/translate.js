const expresss = require('express')
const router = expresss.Router()
const translationController = require('../controllers/translationController')
const auth = require('../../middleware/auth')

// @route   POST /translate
// @desc    For translation
// @access  Public
router.post('/', auth, translationController.translate)

module.exports = router