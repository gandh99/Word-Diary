const jwt = require('jsonwebtoken');

module.exports = (req, res, done) => {
    const token = req.headers['authorization']
    
    if (!token) {
        return res.status(401).json({
            success: false,
            data: 'No token provided. Authorisation denied.'
        })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({
                success: false,
                data: 'Invalid token provided.'
            })
        }
        done()
    })
}