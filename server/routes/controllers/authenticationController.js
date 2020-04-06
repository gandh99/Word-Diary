const bcrypt = require("bcrypt")
const User = require('../../models/User')
const passport = require('passport')
const jwt = require('jsonwebtoken')

module.exports.register = (req, res, done) => {
    const { username, password } = req.body

    // Check if user already exists
    new Promise((resolve, reject) => {
        User.findOne({ username }, (err, existingUser) => {
            if (err) throw err
            if (existingUser) {
                res.status(400).json({
                    success: false,
                    data: 'Username already exists.'
                })
                reject('Username already exists.')
            }
            resolve()
        })
    }).then(() => {
        // Salt and hash password
        let hashedPassword
        bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) throw err

                // Set password to hash
                hashedPassword = hash

                // Create new user
                const user = await User.create({ username, password: hashedPassword })
                return res.status(201).json({
                    success: true,
                    data: user
                })
            }))
    }).catch(error => console.log(error))
}

module.exports.login = (req, res, done) => {
    passport.authenticate('local', (err, user, message) => {
        if (err) throw err

        if (!user) {
            res.status(400).json({
                success: false,
                data: message
            })
        } else {
            let tokenData = {
                id: user.id,
                username: user.username
            }

            // Create the access token and refresh token
            const accessToken = jwt.sign({ tokenData }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
            const refreshToken = jwt.sign({ tokenData }, process.env.REFRESH_TOKEN_SECRET)

            // Store the refresh token in Redis cache
            // redisClient.set(username, refreshToken)

            // Send the tokens back
            res.status(200).json({
                success: true,
                data: {
                    accessToken, refreshToken, tokenData
                }
            })
        }
    })(req, res, done)
}