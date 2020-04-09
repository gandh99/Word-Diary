const User = require('../../models/User')

module.exports.userSearch = (req, res, done) => {
    const username = req.params.username

    // Find all users with the supplied username
    User.find(
        { 'username': { '$regex': username, '$options': 'i' } },
        (err, users) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    data: 'Error searching for the user.'
                })
            }

            // Package the user data that we want to send back
            const usersData = []
            users.map(user => (usersData.push({ username: user.username })))

            return res.status(200).json({
                success: true,
                data: usersData
            })
        }
    )
}