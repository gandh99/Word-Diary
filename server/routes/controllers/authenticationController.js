const User = require('../../models/User')

module.exports.register = async (req, res, done) => {
    try {
        const { username, password } = req.body
        const user = await User.create(req.body)
        return res.status(201).json({
            success: true,
            data: user
        })
    } catch (error) { 
        console.log(error)
    }
}

module.exports.login = (req, res, done) => {

}