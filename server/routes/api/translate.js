const expresss = require('express')
const router = expresss.Router()
const translationController = require('../controllers/translationController')

// @route   POST /translate
// @desc    For translation
// @access  Public
router.post('/', translationController.translate)

module.exports = router