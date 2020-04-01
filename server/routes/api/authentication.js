const expresss = require('express')
const router = expresss.Router()
const authenticationController = require('../controllers/authenticationController')
const User = require('../../models/User')

// @route POST /authentication/register
// @desc For registration
// @access Public
router.post('/register', authenticationController.register)

// @route POST /authentication/login
// @desc For logging in
// @access Public
router.post('/login', authenticationController.login)

module.exports = router