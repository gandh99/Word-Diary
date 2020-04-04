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

// @route   GET /authentication/user
// @desc    Get user data
// @access  Private
router.get('/user', /*auth,*/ authenticationController.loadUser)

module.exports = router