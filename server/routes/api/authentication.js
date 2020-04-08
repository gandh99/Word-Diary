const expresss = require('express')
const router = expresss.Router()
const authenticationController = require('../controllers/authenticationController')
const auth = require('../../middleware/auth')

// @route   POST /authentication/register
// @desc    For registration
// @access  Public
router.post('/register', authenticationController.register)

// @route   POST /authentication/login
// @desc    For logging in
// @access  Public
router.post('/login', authenticationController.login)

// @route   POST /authentication/refresh
// @desc    For generating a new access token by supplying a refresh token
// @access  Public
router.post('/refresh', authenticationController.refresh)

module.exports = router