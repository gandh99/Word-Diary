const bcrypt = require("bcrypt")
const User = require('../../models/User')

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
                reject('Username already exists')
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

}